import {
  CellType,
  RenderedCellType,
  type GridSize,
  type RgbaColor,
  type RenderedGrid,
} from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { ColorPalette } from '@piximps/domain/color-palette'
import { type SymmetryBreakSide } from '@piximps/domain/imp-traits'

export interface ComposeLayersInput {
  gridSize: GridSize
  body: Template
  horns: Template | null
  eyes: Template | null
  mouth: Template | null
  accessories: Template[]
  palette: ColorPalette
  probabilisticBits: boolean[]
  symmetryBreakSide: SymmetryBreakSide
}

type LayerType = 'body' | 'horns' | 'eyes' | 'mouth' | 'accessory'

function createEmptyGrid(size: number): RenderedGrid {
  const cells: RenderedCellType[][] = []
  const colors: (RgbaColor | null)[][] = []
  for (let r = 0; r < size; r++) {
    cells.push(new Array(size).fill(RenderedCellType.Empty))
    colors.push(new Array(size).fill(null))
  }
  return { cells, colors, width: size, height: size }
}

function colorForLayer(palette: ColorPalette, layerType: LayerType, cellType: CellType): RgbaColor {
  switch (layerType) {
    case 'body':
      return cellType === CellType.InnerBody ? palette.accent : palette.skin
    case 'eyes':
      return palette.glow
    case 'horns':
      return palette.secondary
    case 'mouth':
      return palette.skin
    case 'accessory':
      return palette.secondary
  }
}

function stampTemplate(
  grid: RenderedGrid,
  template: Template,
  anchorRow: number,
  anchorCol: number,
  layerType: LayerType,
  palette: ColorPalette,
  probabilisticBits: boolean[],
  bitOffset: { value: number },
): void {
  for (let r = 0; r < template.height; r++) {
    for (let c = 0; c < template.width; c++) {
      const cell = template.grid[r][c]
      const targetRow = anchorRow + r
      const targetCol = anchorCol + c

      if (targetRow < 0 || targetRow >= grid.height) continue
      if (targetCol < 0 || targetCol >= grid.width) continue

      let shouldFill = false
      let renderedType = RenderedCellType.Empty

      switch (cell) {
        case CellType.AlwaysEmpty:
          continue
        case CellType.AlwaysFilled:
          shouldFill = true
          renderedType = RenderedCellType.Body
          break
        case CellType.InnerBody:
          shouldFill = true
          renderedType = RenderedCellType.InnerBody
          break
        case CellType.Probabilistic: {
          const bit = probabilisticBits[bitOffset.value % probabilisticBits.length] ?? false
          bitOffset.value++
          shouldFill = bit
          renderedType = RenderedCellType.Body
          break
        }
      }

      if (shouldFill) {
        grid.cells[targetRow][targetCol] = renderedType
        grid.colors[targetRow][targetCol] = colorForLayer(palette, layerType, cell)
      }
    }
  }

  // Mirror if symmetric
  if (template.symmetric) {
    const centerCol = anchorCol + template.width - 1
    for (let r = 0; r < template.height; r++) {
      for (let c = 0; c < template.width - 1; c++) {
        const sourceCol = anchorCol + c
        const mirrorCol = centerCol + (template.width - 1 - c)
        const targetRow = anchorRow + r

        if (targetRow < 0 || targetRow >= grid.height) continue
        if (mirrorCol < 0 || mirrorCol >= grid.width) continue

        if (grid.cells[targetRow][sourceCol] !== RenderedCellType.Empty) {
          grid.cells[targetRow][mirrorCol] = grid.cells[targetRow][sourceCol]
          grid.colors[targetRow][mirrorCol] = grid.colors[targetRow][sourceCol]
        }
      }
    }
  }
}

export function composeLayers(input: ComposeLayersInput): RenderedGrid {
  const grid = createEmptyGrid(input.gridSize)
  const bitOffset = { value: 0 }

  const bodyOffsetCol = Math.floor((input.gridSize - input.body.mirroredWidth) / 2)
  const bodyOffsetRow = Math.floor((input.gridSize - input.body.height) / 2)

  stampTemplate(grid, input.body, bodyOffsetRow, bodyOffsetCol, 'body', input.palette, input.probabilisticBits, bitOffset)

  if (input.horns && input.body.anchors['horns']) {
    const anchor = input.body.anchors['horns']
    const hornRow = bodyOffsetRow + anchor.row - input.horns.height
    const hornCol = bodyOffsetCol + anchor.columnStart
    stampTemplate(grid, input.horns, hornRow, hornCol, 'horns', input.palette, input.probabilisticBits, bitOffset)
  }

  if (input.eyes && input.body.anchors['eyes']) {
    const anchor = input.body.anchors['eyes']
    const eyeRow = bodyOffsetRow + anchor.row
    const eyeCol = bodyOffsetCol + anchor.columnStart
    stampTemplate(grid, input.eyes, eyeRow, eyeCol, 'eyes', input.palette, input.probabilisticBits, bitOffset)
  }

  if (input.mouth && input.body.anchors['mouth']) {
    const anchor = input.body.anchors['mouth']
    const mouthRow = bodyOffsetRow + anchor.row
    const mouthCol = bodyOffsetCol + anchor.columnStart
    stampTemplate(grid, input.mouth, mouthRow, mouthCol, 'mouth', input.palette, input.probabilisticBits, bitOffset)
  }

  for (const accessory of input.accessories) {
    const accCol = input.symmetryBreakSide === 'left' ? 0 : input.gridSize - accessory.width
    stampTemplate(grid, accessory, 0, accCol, 'accessory', input.palette, input.probabilisticBits, bitOffset)
  }

  return grid
}
