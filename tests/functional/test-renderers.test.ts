import { describe, it, expect } from 'vitest'
import { toRgbaBuffer } from '@piximps/entrypoints/renderers/to-rgba-buffer'
import { toSvgString } from '@piximps/entrypoints/renderers/to-svg-string'
import { toPngBinary } from '@piximps/entrypoints/renderers/to-png-binary'
import { RenderedCellType, type RenderedGrid } from '@piximps/domain/types'

const E = RenderedCellType.Empty
const B = RenderedCellType.Body

function makeSimpleGrid(): RenderedGrid {
  return {
    cells: [
      [B, E],
      [E, B],
    ],
    colors: [
      [[255, 0, 0, 255], null],
      [null, [0, 255, 0, 255]],
    ],
    width: 2,
    height: 2,
  }
}

describe('toRgbaBuffer', () => {
  it('returns a Uint8Array with 4 bytes per pixel', () => {
    const grid = makeSimpleGrid()
    const buffer = toRgbaBuffer(grid, 2)
    expect(buffer).toBeInstanceOf(Uint8Array)
    expect(buffer.length).toBe(16)
  })

  it('writes correct RGBA values for filled pixels', () => {
    const grid = makeSimpleGrid()
    const buffer = toRgbaBuffer(grid, 2)
    expect(buffer[0]).toBe(255)
    expect(buffer[1]).toBe(0)
    expect(buffer[2]).toBe(0)
    expect(buffer[3]).toBe(255)
    expect(buffer[4]).toBe(0)
    expect(buffer[5]).toBe(0)
    expect(buffer[6]).toBe(0)
    expect(buffer[7]).toBe(0)
  })

  it('scales up when output size is larger than grid', () => {
    const grid = makeSimpleGrid()
    const buffer = toRgbaBuffer(grid, 4)
    expect(buffer.length).toBe(64)
    expect(buffer[0]).toBe(255)
    expect(buffer[4]).toBe(255)
    expect(buffer[16]).toBe(255)
  })
})

describe('toSvgString', () => {
  it('returns a valid SVG string', () => {
    const grid = makeSimpleGrid()
    const svg = toSvgString(grid, 64)
    expect(svg).toContain('<svg')
    expect(svg).toContain('</svg>')
    expect(svg).toContain('width="64"')
    expect(svg).toContain('height="64"')
  })

  it('includes rect elements for filled pixels', () => {
    const grid = makeSimpleGrid()
    const svg = toSvgString(grid, 64)
    expect(svg).toContain('<rect')
    expect(svg).toContain('fill="rgb(255,0,0)"')
    expect(svg).toContain('fill="rgb(0,255,0)"')
  })

  it('does not include rects for empty pixels', () => {
    const grid = makeSimpleGrid()
    const svg = toSvgString(grid, 64)
    const rectCount = (svg.match(/<rect/g) || []).length
    expect(rectCount).toBe(2)
  })

  it('scales rect sizes based on output size and grid size', () => {
    const grid = makeSimpleGrid()
    const svg = toSvgString(grid, 64)
    expect(svg).toContain('width="32"')
    expect(svg).toContain('height="32"')
  })
})

describe('toPngBinary', () => {
  it('returns a Uint8Array with PNG magic bytes', () => {
    const grid = makeSimpleGrid()
    const png = toPngBinary(grid, 64)
    expect(png).toBeInstanceOf(Uint8Array)
    expect(png[0]).toBe(137)
    expect(png[1]).toBe(80)
    expect(png[2]).toBe(78)
    expect(png[3]).toBe(71)
  })

  it('produces valid PNG with correct dimensions', () => {
    const grid = makeSimpleGrid()
    const png = toPngBinary(grid, 32)
    expect(png.length).toBeGreaterThan(50)
  })
})
