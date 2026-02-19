import { type TemplateGrid, type AnchorPoint } from './types'

export interface TemplateConfig {
  grid: TemplateGrid
  anchors: Record<string, AnchorPoint>
  compatibleWith: string[]
  symmetric: boolean
}

export class Template {
  readonly grid: TemplateGrid
  readonly anchors: Record<string, AnchorPoint>
  readonly compatibleWith: string[]
  readonly symmetric: boolean

  constructor(config: TemplateConfig) {
    this.grid = config.grid
    this.anchors = config.anchors
    this.compatibleWith = config.compatibleWith
    this.symmetric = config.symmetric
  }

  get width(): number {
    return this.grid[0]?.length ?? 0
  }

  get height(): number {
    return this.grid.length
  }

  get mirroredWidth(): number {
    if (!this.symmetric) return this.width
    return this.width * 2 - 1
  }
}
