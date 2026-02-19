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

const fangs16 = new Template({
  grid: [
    [_, F, _, F],
    [F, _, F, _],
  ],
  anchors: {},
  compatibleWith: ['fangs'],
  symmetric: true,
})

const grin16 = new Template({
  grid: [
    [_, F, F, F],
    [_, _, F, F],
  ],
  anchors: {},
  compatibleWith: ['grin'],
  symmetric: true,
})

const smirk16 = new Template({
  grid: [
    [_, _, F, F],
    [_, F, F, _],
  ],
  anchors: {},
  compatibleWith: ['smirk'],
  symmetric: false,
})

const multiFangs32 = new Template({
  grid: [
    [_, _, F, _, F, _, F, _],
    [_, F, _, F, _, F, _, _],
    [F, _, _, _, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: ['fangs'],
  symmetric: true,
})

const wideGrin32 = new Template({
  grid: [
    [_, _, F, F, F, F, F, F],
    [_, _, _, F, F, F, F, F],
    [_, _, _, _, F, F, F, F],
  ],
  anchors: {},
  compatibleWith: ['grin'],
  symmetric: true,
})

const asymSmirk32 = new Template({
  grid: [
    [_, _, _, _, F, F, F, F],
    [_, _, _, F, F, F, _, _],
    [_, _, F, F, _, _, _, _],
  ],
  anchors: {},
  compatibleWith: ['smirk'],
  symmetric: false,
})

export const mouthTemplates: TemplateRegistry = {
  8: [fangs8, grin8, smirk8],
  16: [fangs16, grin16, smirk16],
  32: [multiFangs32, wideGrin32, asymSmirk32],
}
