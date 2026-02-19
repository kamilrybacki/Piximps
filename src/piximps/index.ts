import { type GridSize, type OutputFormat } from './domain/types'
import { hashToByteSequence } from './services/hash-to-byte-sequence'
import { derivePalette } from './services/palette-deriver'
import { extractTraits } from './services/trait-extractor'
import { composeLayers } from './services/layer-compositor'
import { detectEdges } from './services/edge-detector'
import { toRgbaBuffer } from './entrypoints/renderers/to-rgba-buffer'
import { toPngBinary } from './entrypoints/renderers/to-png-binary'
import { toSvgString } from './entrypoints/renderers/to-svg-string'
import { bodyTemplates } from './common/templates/body'
import { hornTemplates } from './common/templates/horns'
import { eyeTemplates } from './common/templates/eyes'
import { mouthTemplates } from './common/templates/mouth'
import { accessoryTemplates } from './common/templates/accessories'
import { type AccessoryType } from './domain/imp-traits'

export interface ImpGeneratorOptions {
  size: number
  grid: GridSize
  format: OutputFormat
}

export class ImpGenerator {
  private readonly options: ImpGeneratorOptions

  constructor(options?: Partial<ImpGeneratorOptions>) {
    this.options = {
      size: options?.size ?? 128,
      grid: options?.grid ?? 16,
      format: options?.format ?? 'png',
    }
  }

  getOptions(): Readonly<ImpGeneratorOptions> {
    return { ...this.options }
  }

  size(value: number): ImpGenerator {
    return new ImpGenerator({ ...this.options, size: value })
  }

  grid(value: GridSize): ImpGenerator {
    return new ImpGenerator({ ...this.options, grid: value })
  }

  format(value: OutputFormat): ImpGenerator {
    return new ImpGenerator({ ...this.options, format: value })
  }

  async generate(input?: string): Promise<Uint8Array | string> {
    const bytes = input !== undefined
      ? hashToByteSequence(input)
      : crypto.getRandomValues(new Uint8Array(32))

    const palette = derivePalette(bytes)
    const traits = extractTraits(bytes, this.options.grid)

    const body = bodyTemplates[this.options.grid][traits.bodyIndex]
    if (!body) {
      throw new Error(`No body template at index ${traits.bodyIndex} for grid size ${this.options.grid}`)
    }

    const horns = hornTemplates[this.options.grid][traits.hornsIndex] ?? null
    const eyes = eyeTemplates[this.options.grid][traits.eyesIndex] ?? null
    const mouth = mouthTemplates[this.options.grid][traits.mouthIndex] ?? null

    const accessories: typeof body[] = []
    const accessoryTypes: AccessoryType[] = ['tail', 'wings', 'weapon', 'hat']
    for (const accType of accessoryTypes) {
      const idx = traits.accessoryIndices[accType]
      if (idx !== null) {
        const template = accessoryTemplates[accType]?.[this.options.grid]?.[idx]
        if (template) accessories.push(template)
      }
    }

    const composited = composeLayers({
      gridSize: this.options.grid,
      body,
      horns,
      eyes,
      mouth,
      accessories,
      palette,
      probabilisticBits: traits.probabilisticBits,
      symmetryBreakSide: traits.symmetryBreakSide,
    })

    const edgeDetected = detectEdges(composited)

    switch (this.options.format) {
      case 'buffer':
        return toRgbaBuffer(edgeDetected, this.options.size)
      case 'png':
        return toPngBinary(edgeDetected, this.options.size)
      case 'svg':
        return toSvgString(edgeDetected, this.options.size)
    }
  }
}

export { type GridSize, type OutputFormat } from './domain/types'
export { type ImpTraits } from './domain/imp-traits'
export { type ColorPalette } from './domain/color-palette'
