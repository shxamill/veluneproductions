#!/usr/bin/env bash
# Builds web-ready media from brand_assets/ without touching the originals.
#   videos  -> public/media/   (served as-is; Astro does not process video)
#   stills  -> src/assets/     (Astro <Picture> makes the responsive sizes/formats)
# Re-run safely: existing outputs are skipped unless FORCE=1.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/brand_assets"
PUB="$ROOT/public/media"
AST="$ROOT/src/assets"
FORCE="${FORCE:-0}"

need() { [[ "$FORCE" == 1 || ! -s "$1" ]]; }
mkdir -p "$PUB/hero" "$AST/hero" "$AST/brand"

# --- Hero showreel --------------------------------------------------------
# The first 0.8 s of both reels is a flat grey frame; it is trimmed so the
# loop does not flash grey. The soundtrack is kept: the reel starts muted
# and visitors can turn sound on with the hero's sound button.
HERO="$SRC/Hero media"
# The source is already ~1 Mbps, so H.264 is capped near that rate (an
# uncapped CRF encode came out larger than the original). AV1 is offered
# first where supported: ~25% smaller with no visible difference in tests.
for v in 16x9 9x16; do
  out="$PUB/hero/showreel-$v.mp4"
  if need "$out"; then
    ffmpeg -v error -y -ss 0.8 -i "$HERO/Velune-showreel-$v.MP4" \
      -c:a aac -b:a 128k \
      -c:v libx264 -preset slow -crf 26 -maxrate 1100k -bufsize 2200k \
      -pix_fmt yuv420p -profile:v high -movflags +faststart "$out"
  fi
  out="$PUB/hero/showreel-$v.webm"
  if need "$out"; then
    ffmpeg -v error -y -ss 0.8 -i "$HERO/Velune-showreel-$v.MP4" \
      -c:a libopus -b:a 112k \
      -c:v libsvtav1 -preset 5 -crf 38 -pix_fmt yuv420p -svtav1-params enable-overlays=1 "$out" 2>/dev/null
  fi
done
# Posters: text-free frames from the reel itself (times are in the source file).
need "$AST/hero/poster-16x9.jpg" && ffmpeg -v error -y -ss 37 -i "$HERO/Velune-showreel-16x9.MP4" -frames:v 1 -q:v 2 "$AST/hero/poster-16x9.jpg"
need "$AST/hero/poster-9x16.jpg" && ffmpeg -v error -y -ss 36 -i "$HERO/Velune-showreel-9x16.MP4" -frames:v 1 -q:v 2 "$AST/hero/poster-9x16.jpg"

# --- Client work ----------------------------------------------------------
# folder name in brand_assets -> URL slug
declare -A SLUG=(
  ["kinjal-mehtha"]="kinjal-mehtha"
  ["lakshi-lingaraju"]="lakshi-lingaraju"
  ["yash-jain"]="yash-jain"
  ["stilat"]="stilat"
  ["pl-edit"]="pl-edits"
  ["Nomi Kids Culture"]="nomi-kids-culture"
)

for dir in "${!SLUG[@]}"; do
  slug="${SLUG[$dir]}"
  mkdir -p "$PUB/work/$slug" "$AST/work/$slug"
  for f in "$SRC/featured clients/$dir"/*; do
    base="$(basename "$f")"; name="${base%%.*}"; name="${name,,}"
    case "${base,,}" in
      *.mp4|*.mov)
        out="$PUB/work/$slug/$name.mp4"
        # HEVC .MOV files do not play in Chrome/Firefox on most desktops -> H.264.
        if need "$out"; then
          ffmpeg -v error -y -i "$f" \
            -vf "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'" \
            -c:v libx264 -preset slow -crf 28 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p \
            -c:a aac -b:a 96k -movflags +faststart "$out"
        fi
        need "$AST/work/$slug/$name-poster.jpg" && \
          ffmpeg -v error -y -ss 1 -i "$out" -frames:v 1 -q:v 2 "$AST/work/$slug/$name-poster.jpg"
        ;;
      *.jpg|*.jpeg|*.png)
        out="$AST/work/$slug/$name.jpg"
        # Several ".PNG" files are really JPEG data; normalise everything to JPEG.
        need "$out" && magick "$f[0]" -auto-orient -strip -resize 'x2400>' -quality 90 "$out"
        ;;
    esac
  done
done

# --- Logo -----------------------------------------------------------------
# The master is white type on black (640x640 JPEG). Derive transparent
# versions by using luminance as alpha, then trim to the wordmark.
# The master is only 640 px, so it is upscaled 4x and its edges re-sharpened
# (blur + tight level) to stay crisp at large sizes. Proportions are untouched.
# Replace with an official vector logo when one is available.
LOGO="$SRC/logo.jpeg"
for tone in light:'#FBFAF7' dark:'#141414'; do
  name="${tone%%:*}"; fill="${tone#*:}"
  out="$AST/brand/logo-$name.png"
  if need "$out"; then
    magick "$LOGO" -colorspace gray -fuzz 12% -trim +repage -bordercolor black -border 8 \
      -resize 400% -blur 0x2.5 -level 42%,58% \
      \( +clone \) -compose copy_opacity -composite -fill "$fill" -colorize 100 "$out"
  fi
done
# Square icon source for favicons: the original lock-up as supplied.
need "$AST/brand/logo-square.jpg" && cp "$LOGO" "$AST/brand/logo-square.jpg"

echo "media ready"

# --- Icons and social image (public/, referenced from <head>) -------------
# Built from the supplied square logo; replace with a dedicated icon if
# Velune has one (the full wordmark is small at favicon sizes).
need "$ROOT/public/favicon-32.png" && magick "$LOGO" -resize 32x32 "$ROOT/public/favicon-32.png"
need "$ROOT/public/apple-touch-icon.png" && magick "$LOGO" -resize 180x180 "$ROOT/public/apple-touch-icon.png"
need "$ROOT/public/og.jpg" && magick "$AST/hero/poster-16x9.jpg" -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 "$ROOT/public/og.jpg"
echo "icons ready"
