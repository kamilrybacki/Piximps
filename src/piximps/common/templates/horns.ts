import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const F = C.AlwaysFilled

const wideHorns8 = new Template({
  grid: [
    [F, _, _, _],
    [_, F, _, _],
  ],
  anchors: {},
  compatibleWith: ['wide-horns'],
  symmetric: true,
})

const smallHorns8 = new Template({
  grid: [
    [_, _, F, _],
  ],
  anchors: {},
  compatibleWith: ['small-horns'],
  symmetric: true,
})

const tallHorns8 = new Template({
  grid: [
    [_, F, _, _],
    [_, F, _, _],
    [_, _, _, _],
  ],
  anchors: {},
  compatibleWith: ['tall-horns'],
  symmetric: true,
})

const curvedHorns16 = new Template({
  grid: [
    [F, _, _, _],
    [_, F, _, _],
    [_, _, F, _],
  ],
  anchors: {},
  compatibleWith: ['wide-horns'],
  symmetric: true,
})

const straightHorns16 = new Template({
  grid: [
    [_, F, _],
    [_, F, _],
    [_, F, _],
  ],
  anchors: {},
  compatibleWith: ['tall-horns'],
  symmetric: true,
})

const branchingHorns16 = new Template({
  grid: [
    [F, _, _, _, _],
    [_, F, _, _, _],
    [_, F, F, _, _],
    [_, _, _, F, _],
  ],
  anchors: {},
  compatibleWith: ['wide-horns'],
  symmetric: true,
})

const stubbyHorns16 = new Template({
  grid: [
    [F, _, _],
    [_, F, _],
  ],
  anchors: {},
  compatibleWith: ['small-horns'],
  symmetric: true,
})

export const hornTemplates: TemplateRegistry = {
  8: [wideHorns8, smallHorns8, tallHorns8],
  16: [curvedHorns16, straightHorns16, branchingHorns16, stubbyHorns16],
  32: [],
}
