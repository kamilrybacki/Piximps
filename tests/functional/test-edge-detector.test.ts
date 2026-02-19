import { describe, it, expect } from 'vitest'
import { detectEdges } from '@piximps/services/edge-detector'
import { RenderedCellType, type RenderedGrid, type RgbaColor } from '@piximps/domain/types'

const E = RenderedCellType.Empty
const B = RenderedCellType.Body

function makeGrid(cells: RenderedCellType[][], baseColor: RgbaColor = [200, 100, 50, 255]): RenderedGrid {
  const colors = cells.map(row =>
    row.map(cell => (cell !== E ? baseColor : null))
  )
  return { cells, colors, width: cells[0].length, height: cells.length }
}

describe('detectEdges', () => {
  it('marks filled cells adjacent to empty cells as edges', () => {
    const grid = makeGrid([
      [E, E, E],
      [E, B, E],
      [E, E, E],
    ])

    const result = detectEdges(grid)
    expect(result.cells[1][1]).toBe(RenderedCellType.Edge)
  })

  it('preserves interior cells that are fully surrounded', () => {
    const grid = makeGrid([
      [B, B, B],
      [B, B, B],
      [B, B, B],
    ])

    const result = detectEdges(grid)
    expect(result.cells[1][1]).toBe(RenderedCellType.Body)
    expect(result.cells[0][0]).toBe(RenderedCellType.Edge)
  })

  it('darkens edge pixel colors', () => {
    const grid = makeGrid([
      [E, E, E],
      [E, B, E],
      [E, E, E],
    ])

    const result = detectEdges(grid)
    const edgeColor = result.colors[1][1]!
    expect(edgeColor[0]).toBeLessThan(200)
    expect(edgeColor[1]).toBeLessThan(100)
    expect(edgeColor[2]).toBeLessThan(50)
    expect(edgeColor[3]).toBe(255)
  })

  it('does not modify empty cells', () => {
    const grid = makeGrid([
      [E, B],
      [B, E],
    ])

    const result = detectEdges(grid)
    expect(result.cells[0][0]).toBe(E)
    expect(result.colors[0][0]).toBeNull()
  })
})
