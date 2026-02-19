import { type RgbaColor } from './types'

export interface ColorPaletteConfig {
  skin: RgbaColor
  accent: RgbaColor
  glow: RgbaColor
  secondary: RgbaColor
}

export class ColorPalette {
  readonly skin: RgbaColor
  readonly accent: RgbaColor
  readonly glow: RgbaColor
  readonly secondary: RgbaColor

  constructor(config: ColorPaletteConfig) {
    this.skin = config.skin
    this.accent = config.accent
    this.glow = config.glow
    this.secondary = config.secondary
  }

  darkenColor(color: RgbaColor, factor: number): RgbaColor {
    const multiplier = 1 - factor
    return [
      Math.round(color[0] * multiplier),
      Math.round(color[1] * multiplier),
      Math.round(color[2] * multiplier),
      color[3],
    ]
  }
}
