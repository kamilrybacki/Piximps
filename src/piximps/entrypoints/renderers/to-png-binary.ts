import { PNG } from 'pngjs'
import { type RenderedGrid } from '@piximps/domain/types'
import { toRgbaBuffer } from './to-rgba-buffer'

export function toPngBinary(grid: RenderedGrid, outputSize: number): Uint8Array {
  const rgbaData = toRgbaBuffer(grid, outputSize)

  const png = new PNG({ width: outputSize, height: outputSize })
  png.data = Buffer.from(rgbaData)

  const pngBuffer = PNG.sync.write(png)
  return new Uint8Array(pngBuffer)
}
