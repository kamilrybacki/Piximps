import { RenderedCellType, type RenderedGrid } from '@piximps/domain/types'

export function toSvgString(grid: RenderedGrid, outputSize: number): string {
  const pixelSize = outputSize / grid.width
  const rects: string[] = []

  for (let r = 0; r < grid.height; r++) {
    for (let c = 0; c < grid.width; c++) {
      const cell = grid.cells[r][c]
      const color = grid.colors[r][c]

      if (cell === RenderedCellType.Empty || !color) continue

      const x = c * pixelSize
      const y = r * pixelSize

      rects.push(
        `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="rgb(${color[0]},${color[1]},${color[2]})" opacity="${color[3] / 255}"/>`,
      )
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${outputSize}" height="${outputSize}" viewBox="0 0 ${outputSize} ${outputSize}">`,
    ...rects,
    '</svg>',
  ].join('\n')
}
