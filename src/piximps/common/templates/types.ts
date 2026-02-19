import { type GridSize } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'

export type TemplateRegistry = Record<GridSize, Template[]>
