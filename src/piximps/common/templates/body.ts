import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const P = C.Probabilistic
const F = C.AlwaysFilled
const B = C.InnerBody

const stocky8 = new Template({
  grid: [
    [_, _, F, F],
    [_, F, B, B],
    [_, F, B, B],
    [F, F, B, B],
    [F, F, B, B],
    [P, F, F, F],
    [_, F, _, F],
    [_, F, _, F],
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 2, columnStart: 1, columnEnd: 3 },
    mouth: { row: 3, columnStart: 2, columnEnd: 3 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

const lanky8 = new Template({
  grid: [
    [_, _, F, F],
    [_, _, B, B],
    [_, F, B, B],
    [_, F, B, F],
    [_, F, B, F],
    [_, F, F, P],
    [_, _, F, _],
    [_, _, F, _],
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 1, columnStart: 2, columnEnd: 3 },
    mouth: { row: 2, columnStart: 2, columnEnd: 3 },
  },
  compatibleWith: ['tall-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

const round8 = new Template({
  grid: [
    [_, _, F, F],
    [_, F, B, B],
    [F, B, B, B],
    [F, B, B, B],
    [F, B, B, B],
    [_, F, B, B],
    [_, _, F, F],
    [_, _, P, F],
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 2, columnStart: 1, columnEnd: 3 },
    mouth: { row: 4, columnStart: 1, columnEnd: 3 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'triple-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

export const bodyTemplates: TemplateRegistry = {
  8: [stocky8, lanky8, round8],
  16: [],
  32: [],
}
