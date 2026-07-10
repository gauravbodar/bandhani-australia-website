#!/usr/bin/env python3
"""
Bandhani Australia — twirl video generator
==========================================

Trigger : a product directory under images/ that has >=1 catalog image
          but no *.mp4 yet.
Reads   : the 4 catalog stills + prompt-variables.md
Writes  : {product_id}-twirl.mp4  back into the same product directory

The 4 catalog images are produced OUTSIDE this pipeline (as agreed).
This script only does the video step.

Layout it expects:
  images/
    _brand/alpa-avatar-master.png
    po002-dana-bandhani-standard/
      IMAGE ....jpg   x4          (catalog stills)
      garment-ref.jpg
      prompt-variables.md
      -> po002-...-twirl.mp4       (this script creates it)

Usage
-----
  pip install fal-client requests pillow python-dotenv

  # Store your key in a git-ignored .env file at the repo root:
  #   FAL_KEY=your_fal_key
  # (this script auto-loads it). Or export FAL_KEY in your shell.

  # process every product that has images but no video:
  python generate_twirl.py --images-root ./images

  # force a single product (re-generate even if a video exists):
  python generate_twirl.py --images-root ./images \
                           --product po002-dana-bandhani-standard --force

  # dry run — show what WOULD be processed, generate nothing:
  python generate_twirl.py --images-root ./images --dry-run
"""

import argparse
import os
import re
import sys
from pathlib import Path

import requests

try:
    import fal_client
    from PIL import Image
except ImportError:
    sys.exit("Run: pip install fal-client requests pillow python-dotenv")

# Load FAL_KEY from a .env file at the repo root if present.
# .env must be git-ignored — never commit it.
try:
    from dotenv import load_dotenv, find_dotenv
    load_dotenv(find_dotenv())          # searches upward from cwd for a .env
except ImportError:
    pass  # dotenv optional; env var / shell export still works


# --------------------------------------------------------------------------
# CONFIG
# --------------------------------------------------------------------------
VIDEO_MODEL = "fal-ai/kling-video/v2.1/pro/image-to-video"
DURATION    = "5"        # seconds — ideal for Reels
ASPECT      = "9:16"     # vertical
IMG_EXTS    = {".jpg", ".jpeg", ".png", ".webp"}

# which of the 4 catalog stills to animate.
# "front" heuristics: pick the file whose name sorts first, or override in
# a product's prompt-variables.md with a line:  hero_image = <filename>
DEFAULT_HERO_STRATEGY = "first"   # "first" | "largest"


# --------------------------------------------------------------------------
# prompt-variables.md parser
# --------------------------------------------------------------------------
def parse_variables(md_path: Path) -> dict:
    """Pull {key} = value pairs out of the fenced block in prompt-variables.md."""
    vars = {}
    if not md_path.exists():
        return vars
    text = md_path.read_text(encoding="utf-8")
    for m in re.finditer(r"\{(\w+)\}\s*=\s*(.+)", text):
        key = m.group(1).strip()
        # value may wrap across lines in the md; take up to next {key} or blank
        val = m.group(2).strip()
        vars[key] = val
    # also allow non-brace directives like: hero_image = foo.jpg
    for m in re.finditer(r"^\s*(hero_image)\s*=\s*(.+)$", text, re.MULTILINE):
        vars[m.group(1)] = m.group(2).strip()
    return vars


# --------------------------------------------------------------------------
# fabric-aware prompt builder
# --------------------------------------------------------------------------
def build_prompt(v: dict) -> str:
    garment  = (v.get("type") or "garment").lower()
    fabric   = v.get("fabric", "flowing fabric")
    base_col = v.get("base_colour", "")
    accent   = v.get("accent_colour", "")

    colour_phrase = ""
    if base_col:
        colour_phrase = f"the {base_col} {fabric}"
        if accent:
            colour_phrase += f" with {accent} detailing"

    if "saree" in garment or "sari" in garment:
        motion = (
            f"The woman gently twirls in place. The saree pleats and pallu "
            f"flow outward with the spin, {colour_phrase} catching the studio "
            f"light, the decorative border rippling as it moves."
        )
    elif "choli" in garment or "blouse" in garment or "lehenga" in garment:
        motion = (
            f"The woman stands gracefully, then twirls a full turn. The long "
            f"flared skirt opens outward into a wide circle, {colour_phrase} "
            f"catching the light, the gold border and mirror-work fanning out "
            f"as it spins. Her head turns back toward the camera during the "
            f"spin. She settles facing forward. The whole figure and the full "
            f"flared skirt stay within the frame at all times."
        )
    else:
        motion = (
            f"The woman turns gracefully in place, {colour_phrase} flowing "
            f"naturally with the movement."
        )

    return (
        f"{motion} Soft editorial studio lighting, elegant slow motion, hair "
        f"moving naturally, full body kept in frame. Camera holds steady. "
        f"Graceful, premium fashion look, single continuous shot, no cuts."
    )


NEGATIVE = (
    "blur, distortion, warped patterns, smeared border, melting fabric, "
    "extra limbs, extra fingers, deformed hands, face distortion, "
    "flickering, low quality, watermark, text"
)


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------
def catalog_images(product_dir: Path) -> list[Path]:
    imgs = [p for p in product_dir.iterdir()
            if p.suffix.lower() in IMG_EXTS
            and p.stem != "garment-ref"]
    return sorted(imgs)


def has_video(product_dir: Path) -> bool:
    return any(p.suffix.lower() == ".mp4" for p in product_dir.iterdir())


def pick_hero(product_dir: Path, v: dict) -> Path:
    imgs = catalog_images(product_dir)
    if not imgs:
        raise FileNotFoundError(f"No catalog images in {product_dir}")
    # explicit override wins
    if v.get("hero_image"):
        cand = product_dir / v["hero_image"]
        if cand.exists():
            return cand
    if DEFAULT_HERO_STRATEGY == "largest":
        return max(imgs, key=lambda p: p.stat().st_size)
    return imgs[0]


def crop_to_vertical(src: Path, dst: Path):
    """Kling infers aspect from the start image, so make it 9:16 (1080x1920)."""
    im = Image.open(src).convert("RGB")
    tw, th = 9, 16
    w, h = im.size
    target_ratio = tw / th
    cur_ratio = w / h
    if cur_ratio > target_ratio:      # too wide -> crop sides
        new_w = int(h * target_ratio)
        x0 = (w - new_w) // 2
        im = im.crop((x0, 0, x0 + new_w, h))
    else:                              # too tall -> crop top/bottom
        new_h = int(w / target_ratio)
        y0 = (h - new_h) // 2
        im = im.crop((0, y0, w, y0 + new_h))
    im = im.resize((1080, 1920), Image.LANCZOS)
    im.save(dst, "JPEG", quality=92)


def _log(update):
    if isinstance(update, fal_client.InProgress):
        for l in update.logs:
            print("     ", l["message"])


# --------------------------------------------------------------------------
# core: generate one product's video
# --------------------------------------------------------------------------
def generate_for_product(product_dir: Path, force: bool, dry_run: bool):
    pid = product_dir.name
    if not catalog_images(product_dir):
        print(f"  [skip] {pid}: no catalog images yet")
        return
    if has_video(product_dir) and not force:
        print(f"  [skip] {pid}: video already exists (use --force to redo)")
        return

    v = parse_variables(product_dir / "prompt-variables.md")
    hero = pick_hero(product_dir, v)
    prompt = build_prompt(v)

    print(f"  [run ] {pid}")
    print(f"         hero  : {hero.name}")
    print(f"         prompt: {prompt[:90]}...")

    if dry_run:
        print("         (dry-run, nothing generated)")
        return

    # 1. make a 9:16 start frame
    hero_916 = product_dir / f"_hero_916.jpg"
    crop_to_vertical(hero, hero_916)

    # 2. upload start frame to fal storage
    start_url = fal_client.upload_file(str(hero_916))

    # 3. call Kling image-to-video
    result = fal_client.subscribe(
        VIDEO_MODEL,
        arguments={
            "prompt": prompt,
            "image_url": start_url,
            "duration": DURATION,
            "aspect_ratio": ASPECT,
            "negative_prompt": NEGATIVE,
            "cfg_scale": 0.5,
        },
        with_logs=True,
        on_queue_update=_log,
    )

    video_url = result["video"]["url"]
    out_path = product_dir / f"{pid}-twirl.mp4"
    r = requests.get(video_url, timeout=300)
    r.raise_for_status()
    out_path.write_bytes(r.content)

    # clean up temp frame
    hero_916.unlink(missing_ok=True)

    print(f"         DONE  -> {out_path}")


# --------------------------------------------------------------------------
# scan + orchestrate
# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--images-root", required=True,
                    help="path to the repo's images/ folder")
    ap.add_argument("--product", help="only this product dir (name, not path)")
    ap.add_argument("--force", action="store_true",
                    help="regenerate even if a video exists")
    ap.add_argument("--dry-run", action="store_true",
                    help="show what would run, generate nothing")
    args = ap.parse_args()

    if not os.getenv("FAL_KEY") and not args.dry_run:
        sys.exit(
            "FAL_KEY not found.\n"
            "  Create a git-ignored .env file at the repo root containing:\n"
            "    FAL_KEY=your_fal_key\n"
            "  or run:  export FAL_KEY=your_fal_key"
        )

    root = Path(args.images_root)
    if not root.is_dir():
        sys.exit(f"Not a directory: {root}")

    # product dirs = everything except _brand / _base / hidden
    product_dirs = sorted(
        d for d in root.iterdir()
        if d.is_dir() and not d.name.startswith("_") and not d.name.startswith(".")
    )
    if args.product:
        product_dirs = [d for d in product_dirs if d.name == args.product]
        if not product_dirs:
            sys.exit(f"Product not found: {args.product}")

    print(f"Scanning {len(product_dirs)} product(s) under {root}\n")
    for d in product_dirs:
        generate_for_product(d, force=args.force, dry_run=args.dry_run)

    print("\nDone.")


if __name__ == "__main__":
    main()