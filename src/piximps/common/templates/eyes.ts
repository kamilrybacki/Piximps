import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const F = C.AlwaysFilled

const singleEye8 = new Template({
  grid: [[_, _, _, F]],
  anchors: {},
  compatibleWith: ['single-eye'],
  symmetric: true,
})

const doubleEye8 = new Template({
  grid: [[_, F, _, _]],
  anchors: {},
  compatibleWith: ['double-eye'],
  symmetric: true,
})

const tripleEye8 = new Template({
  grid: [[_, F, _, F]],
  anchors: {},
  compatibleWith: ['triple-eye'],
  symmetric: true,
})

const singleEye16 = new Template({
  grid: [
    [_, _, _, F, F],
    [_, _, _, F, F],
  ],
  anchors: {},
  compatibleWith: ['single-eye'],
  symmetric: true,
})

const doubleEye16 = new Template({
  grid: [
    [_, F, F, _, _],
    [_, F, F, _, _],
  ],
  anchors: {},
  compatibleWith: ['double-eye'],
  symmetric: true,
})

const tripleEye16 = new Template({
  grid: [
    [_, F, _, F, F],
    [_, F, _, F, F],
  ],
  anchors: {},
  compatibleWith: ['triple-eye'],
  symmetric: true,
})

const singleEye32 = new Template({
  grid: [
    [_, _, _, _, _, _, F, F, F],
    [_, _, _, _, _, _, F, F, F],
    [_, _, _, _, _, _, F, F, F],
  ],
  anchors: {},
  compatibleWith: ['single-eye'],
  symmetric: true,
})

const doubleEye32 = new Template({
  grid: [
    [_, _, F, F, _, _, _, _],
    [_, _, F, F, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: ['double-eye'],
  symmetric: true,
})

const tripleEye32 = new Template({
  grid: [
    [_, _, F, F, _, _, F, F, F],
    [_, _, F, F, _, _, F, F, F],
    [_, _, _, _, _, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: ['triple-eye'],
  symmetric: true,
})

export const eyeTemplates: TemplateRegistry = {
  8: [singleEye8, doubleEye8, tripleEye8],
  16: [singleEye16, doubleEye16, tripleEye16],
  32: [singleEye32, doubleEye32, tripleEye32],
}
