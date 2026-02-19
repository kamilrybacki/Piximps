import { type RgbaColor } from '@piximps/domain/types'
import { ColorPalette } from '@piximps/domain/color-palette'

function readRgb(bytes: Uint8Array, offset: number): RgbaColor {
  return [bytes[offset], bytes[offset + 1], bytes[offset + 2], 255]
}

function boostSaturationAndBrightness(color: RgbaColor): RgbaColor {
  const max = Math.max(color[0], color[1], color[2])
  const min = Math.min(color[0], color[1], color[2])

  if (max === 0) return [255, 200, 0, 255]

  const boosted: RgbaColor = [color[0], color[1], color[2], 255]

  // Push the dominant channel toward 255
  const scale = 255 / max
  boosted[0] = Math.min(255, Math.round(boosted[0] * scale))
  boosted[1] = Math.min(255, Math.round(boosted[1] * scale))
  boosted[2] = Math.min(255, Math.round(boosted[2] * scale))

  // Ensure at least one channel is above 150
  const maxBoosted = Math.max(boosted[0], boosted[1], boosted[2])
  if (maxBoosted <= 150) {
    const idx = [boosted[0], boosted[1], boosted[2]].indexOf(maxBoosted)
    boosted[idx] = 220
  }

  return boosted
}

function ensureColorDistance(
  skin: RgbaColor,
  accent: RgbaColor,
  minimumDistance: number,
): RgbaColor {
  const distance =
    Math.abs(skin[0] - accent[0]) +
    Math.abs(skin[1] - accent[1]) +
    Math.abs(skin[2] - accent[2])

  if (distance >= minimumDistance) return accent

  // Shift accent hue by rotating channels and adjusting
  const adjusted: RgbaColor = [
    (accent[0] + 80) % 256,
    (accent[1] + 40) % 256,
    (accent[2] + 120) % 256,
    255,
  ]

  return adjusted
}

/**
 * Derives a ColorPalette from the first 12 bytes of a hash byte sequence.
 * Bytes 0-2: skin RGB, bytes 3-5: accent RGB,
 * bytes 6-8: glow RGB, bytes 9-11: secondary RGB.
 */
export function derivePalette(bytes: Uint8Array): ColorPalette {
  const rawSkin = readRgb(bytes, 0)
  const rawAccent = readRgb(bytes, 3)
  const rawGlow = readRgb(bytes, 6)
  const rawSecondary = readRgb(bytes, 9)

  const glow = boostSaturationAndBrightness(rawGlow)
  const accent = ensureColorDistance(rawSkin, rawAccent, 60)

  return new ColorPalette({
    skin: rawSkin,
    accent,
    glow,
    secondary: rawSecondary,
  })
}
