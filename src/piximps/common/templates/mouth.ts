import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const F = C.AlwaysFilled

const fangs8 = new Template({
  grid: [[_, F, _, F]],
  anchors: {},
  compatibleWith: ['fangs'],
  symmetric: true,
})

const grin8 = new Template({
  grid: [[_, F, F, F]],
  anchors: {},
  compatibleWith: ['grin'],
  symmetric: true,
})

const smirk8 = new Template({
  grid: [[_, _, F, F]],
  anchors: {},
  compatibleWith: ['smirk'],
  symmetric: false,
})

export const mouthTemplates: TemplateRegistry = {
  8: [fangs8, grin8, smirk8],
  16: [],
  32: [],
}
