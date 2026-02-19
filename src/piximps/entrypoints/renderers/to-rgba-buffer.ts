import { RenderedCellType, type RenderedGrid } from '@piximps/domain/types'

export function toRgbaBuffer(grid: RenderedGrid, outputSize: number): Uint8Array {
  const buffer = new Uint8Array(outputSize * outputSize * 4)
  const scale = outputSize / grid.width

  for (let y = 0; y < outputSize; y++) {
    for (let x = 0; x < outputSize; x++) {
      const gridRow = Math.floor(y / scale)
      const gridCol = Math.floor(x / scale)
      const pixelOffset = (y * outputSize + x) * 4

      const cell = grid.cells[gridRow]?.[gridCol]
      const color = grid.colors[gridRow]?.[gridCol]

      if (cell !== undefined && cell !== RenderedCellType.Empty && color) {
        buffer[pixelOffset] = color[0]
        buffer[pixelOffset + 1] = color[1]
        buffer[pixelOffset + 2] = color[2]
        buffer[pixelOffset + 3] = color[3]
      }
    }
  }

  return buffer
}
