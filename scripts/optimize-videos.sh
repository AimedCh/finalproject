#!/bin/bash

# Video Optimization Script
# Run this script after installing FFmpeg

INPUT_VIDEO="./public/img/imgAlquieres/mosta4k.mp4"
OUTPUT_DIR="./public/img/imgAlquieres-optimized"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🎥 Starting video optimization..."

# Mobile version (480p)
echo "📱 Creating mobile version..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -crf 28 \
  -c:a aac \
  -b:a 128k \
  -vf "scale=854:480" \
  -movflags +faststart \
  "$OUTPUT_DIR/mosta4k_mobile.mp4"

# Tablet version (720p)
echo "📱 Creating tablet version..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -crf 28 \
  -c:a aac \
  -b:a 128k \
  -vf "scale=1280:720" \
  -movflags +faststart \
  "$OUTPUT_DIR/mosta4k_tablet.mp4"

# Desktop version (1080p)
echo "🖥️ Creating desktop version..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -crf 28 \
  -c:a aac \
  -b:a 128k \
  -vf "scale=1920:1080" \
  -movflags +faststart \
  "$OUTPUT_DIR/mosta4k_desktop.mp4"

echo "✅ Video optimization complete!"
echo "📁 Optimized videos saved to: $OUTPUT_DIR"