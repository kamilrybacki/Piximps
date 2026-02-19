import { describe, it, expect } from 'vitest'
import { derivePalette } from '@piximps/services/palette-deriver'
import { ColorPalette } from '@piximps/domain/color-palette'

describe('derivePalette', () => {
  it('returns a ColorPalette from a byte sequence', () => {
    const bytes = new Uint8Array(32)
    bytes.set([180, 60, 60, 120, 40, 40, 255, 200, 0, 100, 80, 120])
    const palette = derivePalette(bytes)

    expect(palette).toBeInstanceOf(ColorPalette)
    expect(palette.skin[3]).toBe(255)
    expect(palette.accent[3]).toBe(255)
    expect(palette.glow[3]).toBe(255)
    expect(palette.secondary[3]).toBe(255)
  })

  it('is deterministic — same bytes produce same palette', () => {
    const bytes = new Uint8Array(32).fill(42)
    const first = derivePalette(bytes)
    const second = derivePalette(bytes)
    expect(first.skin).toEqual(second.skin)
    expect(first.accent).toEqual(second.accent)
    expect(first.glow).toEqual(second.glow)
    expect(first.secondary).toEqual(second.secondary)
  })

  it('ensures glow color has high saturation', () => {
    const bytes = new Uint8Array(32).fill(10)
    const palette = derivePalette(bytes)
    const maxChannel = Math.max(palette.glow[0], palette.glow[1], palette.glow[2])
    expect(maxChannel).toBeGreaterThan(150)
  })

  it('ensures skin and accent colors are visually distinct', () => {
    const bytes = new Uint8Array(32).fill(128)
    const palette = derivePalette(bytes)
    const colorDistance = Math.abs(palette.skin[0] - palette.accent[0])
      + Math.abs(palette.skin[1] - palette.accent[1])
      + Math.abs(palette.skin[2] - palette.accent[2])
    expect(colorDistance).toBeGreaterThan(60)
  })
})
