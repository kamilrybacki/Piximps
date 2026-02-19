export enum CellType {
  AlwaysEmpty = -1,
  Probabilistic = 0,
  AlwaysFilled = 1,
  InnerBody = 2,
}

export type GridSize = 8 | 16 | 32

export type OutputFormat = 'buffer' | 'png' | 'svg'

export type RgbaColor = [r: number, g: number, b: number, a: number]

export type AnchorPoint = {
  row: number
  columnStart: number
  columnEnd: number
}

export type TemplateGrid = CellType[][]

export enum RenderedCellType {
  Empty = 0,
  Body = 1,
  InnerBody = 2,
  Edge = 3,
}

export type RenderedGrid = {
  cells: RenderedCellType[][]
  colors: (RgbaColor | null)[][]
  width: number
  height: number
}
