#!/usr/bin/env bash
# Crops a 2x2 sheet (TL,TR,BL,BR) into four food images with a small inset
# to drop the white gutters. Usage: crop.sh <sheet.jpg> <slugTL> <slugTR> <slugBL> <slugBR>
set -euo pipefail
SHEET="$1"; shift
OUT_DIR="public/images/food"
mkdir -p "$OUT_DIR"
cd scripts/tmp
base=$(basename "$SHEET")
convert "$base" -crop 2x2@ +repage tile-%d.jpg
names=("$@")
for i in 0 1 2 3; do
  slug="${names[$i]}"
  [ -z "$slug" ] && continue
  # inset 8px to remove white gutters, then upscale to a consistent width
  convert "tile-$i.jpg" -crop 688x368+8+8 +repage -resize 900x -quality 86 "../../$OUT_DIR/$slug.jpg"
done
rm -f tile-0.jpg tile-1.jpg tile-2.jpg tile-3.jpg
cd ../..
echo "cropped $base -> ${names[*]}"
