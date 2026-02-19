import { RenderedCellType, type RenderedGrid, type RgbaColor } from '@piximps/domain/types'

const DARKEN_FACTOR = 0.4

function darkenColor(color: RgbaColor): RgbaColor {
  const multiplier = 1 - DARKEN_FACTOR
  return [
    Math.round(color[0] * multiplier),
    Math.round(color[1] * multiplier),
    Math.round(color[2] * multiplier),
    color[3],
  ]
}

function isFilled(cellType: RenderedCellType): boolean {
  return cellType !== RenderedCellType.Empty
}

function hasEmptyNeighbor(
  cells: RenderedCellType[][],
  row: number,
  col: number,
  height: number,
  width: number,
): boolean {
  if (row === 0 || row === height - 1 || col === 0 || col === width - 1) {
    return true
  }

  const neighbors = [
    cells[row - 1][col],
    cells[row + 1][col],
    cells[row][col - 1],
    cells[row][col + 1],
  ]

  return neighbors.some(n => !isFilled(n))
}

export function detectEdges(grid: RenderedGrid): RenderedGrid {
  const { cells, colors, width, height } = grid

  const newCells: RenderedCellType[][] = cells.map(row => [...row])
  const newColors: (RgbaColor | null)[][] = colors.map(row => [...row])

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (!isFilled(cells[r][c])) continue

      if (hasEmptyNeighbor(cells, r, c, height, width)) {
        newCells[r][c] = RenderedCellType.Edge
        if (colors[r][c]) {
          newColors[r][c] = darkenColor(colors[r][c]!)
        }
      }
    }
  }

  return { cells: newCells, colors: newColors, width, height }
}
