import { describe, it, expect } from 'vitest'
import { composeLayers } from '@piximps/services/layer-compositor'
import { CellType, RenderedCellType, type RgbaColor } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { ColorPalette } from '@piximps/domain/color-palette'

const _ = CellType.AlwaysEmpty
const F = CellType.AlwaysFilled
const B = CellType.InnerBody
const P = CellType.Probabilistic

const testPalette = new ColorPalette({
  skin: [200, 100, 50, 255],
  accent: [100, 50, 25, 255],
  glow: [255, 200, 0, 255],
  secondary: [80, 60, 100, 255],
})

describe('composeLayers', () => {
  it('renders a symmetric body template onto a grid', () => {
    const body = new Template({
      grid: [
        [_, F],
        [F, B],
      ],
      anchors: {},
      compatibleWith: [],
      symmetric: true,
    })

    const result = composeLayers({
      gridSize: 8,
      body,
      horns: null,
      eyes: null,
      mouth: null,
      accessories: [],
      palette: testPalette,
      probabilisticBits: [true, true, true, true],
      symmetryBreakSide: 'left',
    })

    expect(result.cells).toHaveLength(8)
    expect(result.cells[0]).toHaveLength(8)
  })

  it('mirrors symmetric templates from left to right', () => {
    const body = new Template({
      grid: [[F, F]],
      anchors: {},
      compatibleWith: [],
      symmetric: true,
    })

    const result = composeLayers({
      gridSize: 4,
      body,
      horns: null,
      eyes: null,
      mouth: null,
      accessories: [],
      palette: testPalette,
      probabilisticBits: [],
      symmetryBreakSide: 'left',
    })

    const filledCount = result.cells.flat().filter(c => c !== RenderedCellType.Empty).length
    expect(filledCount).toBeGreaterThanOrEqual(2)
  })

  it('resolves probabilistic cells using provided bits', () => {
    const body = new Template({
      grid: [[P, P]],
      anchors: {},
      compatibleWith: [],
      symmetric: false,
    })

    const resultAllTrue = composeLayers({
      gridSize: 4,
      body,
      horns: null,
      eyes: null,
      mouth: null,
      accessories: [],
      palette: testPalette,
      probabilisticBits: [true, true],
      symmetryBreakSide: 'left',
    })

    const resultAllFalse = composeLayers({
      gridSize: 4,
      body,
      horns: null,
      eyes: null,
      mouth: null,
      accessories: [],
      palette: testPalette,
      probabilisticBits: [false, false],
      symmetryBreakSide: 'left',
    })

    const filledTrue = resultAllTrue.cells.flat().filter(c => c !== RenderedCellType.Empty).length
    const filledFalse = resultAllFalse.cells.flat().filter(c => c !== RenderedCellType.Empty).length
    expect(filledTrue).toBeGreaterThan(filledFalse)
  })
})
