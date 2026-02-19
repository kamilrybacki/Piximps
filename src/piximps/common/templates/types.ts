import { type GridSize } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'

export type TemplateSet = {
  templates: Template[]
  gridSize: GridSize
}

export type TemplateRegistry = Record<GridSize, Template[]>
