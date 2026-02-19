import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const F = C.AlwaysFilled
const P = C.Probabilistic

const tail8 = new Template({
  grid: [
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [F, _, _, _],
    [_, F, _, _],
  ],
  anchors: {},
  compatibleWith: [],
  symmetric: false,
})

const wings8 = new Template({
  grid: [
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [F, P, _, _],
    [F, F, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
  ],
  anchors: {},
  compatibleWith: [],
  symmetric: false,
})

const tail16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [F, _, _, _, _, _, _, _],
    [_, F, _, _, _, _, _, _],
    [_, _, F, _, _, _, _, _],
    [_, _, F, _, _, _, _, _],
    [_, F, P, _, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: [],
  symmetric: false,
})

const wings16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [F, _, _, _, _, _, _, _],
    [F, F, _, _, _, _, _, _],
    [F, F, P, _, _, _, _, _],
    [F, F, F, _, _, _, _, _],
    [_, F, F, _, _, _, _, _],
    [_, _, F, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: [],
  symmetric: false,
})

export const accessoryTemplates: Record<string, TemplateRegistry> = {
  tail: { 8: [tail8], 16: [tail16], 32: [] },
  wings: { 8: [wings8], 16: [wings16], 32: [] },
  weapon: { 8: [], 16: [], 32: [] },
  hat: { 8: [], 16: [], 32: [] },
}
