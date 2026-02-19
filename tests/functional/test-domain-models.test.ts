import { describe, it, expect } from 'vitest'
import {
  CellType,
  type GridSize,
  type OutputFormat,
  type RgbaColor,
  type AnchorPoint,
  type TemplateGrid,
} from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { ColorPalette } from '@piximps/domain/color-palette'
import { ImpTraits } from '@piximps/domain/imp-traits'

describe('CellType enum', () => {
  it('has correct values for mask-based cell types', () => {
    expect(CellType.AlwaysEmpty).toBe(-1)
    expect(CellType.Probabilistic).toBe(0)
    expect(CellType.AlwaysFilled).toBe(1)
    expect(CellType.InnerBody).toBe(2)
  })
})

describe('type contracts', () => {
  it('GridSize accepts valid grid sizes', () => {
    const sizes: GridSize[] = [8, 16, 32]
    expect(sizes).toHaveLength(3)
  })

  it('OutputFormat accepts valid formats', () => {
    const formats: OutputFormat[] = ['buffer', 'png', 'svg']
    expect(formats).toHaveLength(3)
  })

  it('RgbaColor is a 4-element tuple', () => {
    const color: RgbaColor = [255, 128, 0, 255]
    expect(color).toHaveLength(4)
  })

  it('AnchorPoint defines row and column range', () => {
    const anchor: AnchorPoint = { row: 1, columnStart: 3, columnEnd: 5 }
    expect(anchor.row).toBe(1)
    expect(anchor.columnStart).toBe(3)
    expect(anchor.columnEnd).toBe(5)
  })

  it('TemplateGrid is a 2D array of CellType', () => {
    const grid: TemplateGrid = [
      [CellType.AlwaysEmpty, CellType.AlwaysFilled],
      [CellType.Probabilistic, CellType.InnerBody],
    ]
    expect(grid).toHaveLength(2)
    expect(grid[0][1]).toBe(CellType.AlwaysFilled)
  })
})

describe('Template model', () => {
  it('creates a template with grid, anchors, and compatibility tags', () => {
    const template = new Template({
      grid: [
        [CellType.AlwaysEmpty, CellType.AlwaysFilled, CellType.AlwaysFilled],
        [CellType.AlwaysFilled, CellType.InnerBody, CellType.AlwaysFilled],
      ],
      anchors: {
        horns: { row: 0, columnStart: 1, columnEnd: 2 },
      },
      compatibleWith: ['stocky', 'round'],
      symmetric: true,
    })

    expect(template.grid).toHaveLength(2)
    expect(template.width).toBe(3)
    expect(template.height).toBe(2)
    expect(template.symmetric).toBe(true)
    expect(template.anchors.horns).toBeDefined()
    expect(template.compatibleWith).toContain('stocky')
  })

  it('returns the full mirrored width when symmetric', () => {
    const template = new Template({
      grid: [[CellType.AlwaysFilled, CellType.AlwaysFilled, CellType.AlwaysFilled]],
      anchors: {},
      compatibleWith: [],
      symmetric: true,
    })
    expect(template.mirroredWidth).toBe(5)
  })

  it('returns grid width as mirroredWidth when not symmetric', () => {
    const template = new Template({
      grid: [[CellType.AlwaysFilled, CellType.AlwaysFilled]],
      anchors: {},
      compatibleWith: [],
      symmetric: false,
    })
    expect(template.mirroredWidth).toBe(2)
  })
})

describe('ColorPalette model', () => {
  it('stores skin, accent, glow, and secondary colors', () => {
    const palette = new ColorPalette({
      skin: [180, 60, 60, 255],
      accent: [120, 40, 40, 255],
      glow: [255, 200, 0, 255],
      secondary: [100, 80, 120, 255],
    })

    expect(palette.skin).toEqual([180, 60, 60, 255])
    expect(palette.accent).toEqual([120, 40, 40, 255])
    expect(palette.glow).toEqual([255, 200, 0, 255])
    expect(palette.secondary).toEqual([100, 80, 120, 255])
  })

  it('darkenColor reduces brightness by a given factor', () => {
    const palette = new ColorPalette({
      skin: [200, 100, 50, 255],
      accent: [100, 50, 25, 255],
      glow: [255, 200, 0, 255],
      secondary: [100, 80, 120, 255],
    })

    const darkened = palette.darkenColor(palette.skin, 0.4)
    expect(darkened[0]).toBe(120)
    expect(darkened[1]).toBe(60)
    expect(darkened[2]).toBe(30)
    expect(darkened[3]).toBe(255)
  })
})

describe('ImpTraits model', () => {
  it('stores selected trait indices per category', () => {
    const traits = new ImpTraits({
      bodyIndex: 2,
      hornsIndex: 1,
      eyesIndex: 0,
      mouthIndex: 3,
      accessoryIndices: { tail: 1, wings: null, weapon: 0, hat: null },
      probabilisticBits: [true, false, true, true, false],
      symmetryBreakSide: 'left',
    })

    expect(traits.bodyIndex).toBe(2)
    expect(traits.hornsIndex).toBe(1)
    expect(traits.accessoryIndices.wings).toBeNull()
    expect(traits.accessoryIndices.tail).toBe(1)
    expect(traits.symmetryBreakSide).toBe('left')
    expect(traits.probabilisticBits).toHaveLength(5)
  })

  it('hasAccessory returns true only for non-null accessories', () => {
    const traits = new ImpTraits({
      bodyIndex: 0,
      hornsIndex: 0,
      eyesIndex: 0,
      mouthIndex: 0,
      accessoryIndices: { tail: 1, wings: null, weapon: null, hat: 2 },
      probabilisticBits: [],
      symmetryBreakSide: 'right',
    })

    expect(traits.hasAccessory('tail')).toBe(true)
    expect(traits.hasAccessory('wings')).toBe(false)
    expect(traits.hasAccessory('hat')).toBe(true)
  })
})
