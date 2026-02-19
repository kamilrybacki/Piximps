import { CellType as C } from '@piximps/domain/types'
import { Template } from '@piximps/domain/template'
import { type TemplateRegistry } from './types'

const _ = C.AlwaysEmpty
const P = C.Probabilistic
const F = C.AlwaysFilled
const B = C.InnerBody

// ============================================================
// 8x8 bodies (half-width = 4 cols, mirrored width = 7)
// These are small so anatomy is simplified but should
// read as upright humanoid imps, not blobs.
// ============================================================

// Stocky imp: wide shoulders, short legs
const stocky8 = new Template({
  grid: [
    [_, _, F, F],   // pointed head top
    [_, _, B, B],   // head
    [_, F, B, B],   // shoulders (wide)
    [_, P, F, B],   // arms out + torso
    [_, _, F, B],   // waist
    [_, _, B, B],   // hips
    [_, _, F, F],   // upper legs
    [_, _, F, _],   // feet apart
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 1, columnStart: 2, columnEnd: 3 },
    mouth: { row: 2, columnStart: 2, columnEnd: 3 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// Lanky imp: tall, thin, long legs
const lanky8 = new Template({
  grid: [
    [_, _, F, F],   // pointed head
    [_, _, B, B],   // head
    [_, _, F, B],   // narrow shoulders
    [_, P, F, B],   // arm + torso
    [_, _, F, B],   // waist
    [_, _, F, F],   // hips
    [_, _, F, _],   // legs
    [_, _, F, _],   // feet
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 1, columnStart: 2, columnEnd: 3 },
    mouth: { row: 2, columnStart: 2, columnEnd: 3 },
  },
  compatibleWith: ['tall-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

// Brawler imp: very wide shoulders, thick arms, sturdy
const brawler8 = new Template({
  grid: [
    [_, _, F, F],   // head top
    [_, F, B, B],   // head (wider)
    [F, F, B, B],   // big shoulders
    [F, P, F, B],   // arms out wide
    [_, _, F, B],   // narrow waist
    [_, _, B, B],   // hips
    [_, _, F, F],   // legs
    [_, F, _, F],   // wide stance
  ],
  anchors: {
    horns: { row: 0, columnStart: 2, columnEnd: 3 },
    eyes: { row: 1, columnStart: 1, columnEnd: 3 },
    mouth: { row: 2, columnStart: 1, columnEnd: 3 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'triple-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// ============================================================
// 16x16 bodies (half-width = 8 cols, mirrored width = 15)
// More room for distinct head, neck, torso, arms, legs.
// ============================================================

// Classic imp: balanced proportions, arms out, digitigrade legs
const classic16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],   // row 0
    [_, _, _, _, _, _, _, _],   // row 1
    [_, _, _, _, _, _, F, F],   // row 2: head top (pointed)
    [_, _, _, _, _, F, B, B],   // row 3: head
    [_, _, _, _, _, F, B, B],   // row 4: head
    [_, _, _, _, _, F, B, B],   // row 5: lower head
    [_, _, _, _, _, _, F, F],   // row 6: neck
    [_, _, _, _, F, F, B, F],   // row 7: shoulders
    [_, _, _, P, F, B, B, F],   // row 8: arms + upper torso
    [_, _, _, _, F, B, B, F],   // row 9: torso
    [_, _, _, _, _, F, B, F],   // row 10: waist (narrow)
    [_, _, _, _, _, F, B, F],   // row 11: hips
    [_, _, _, _, _, F, F, F],   // row 12: upper legs
    [_, _, _, _, _, F, _, F],   // row 13: legs apart
    [_, _, _, _, _, F, _, F],   // row 14: lower legs
    [_, _, _, _, F, F, _, _],   // row 15: feet (digitigrade)
  ],
  anchors: {
    horns: { row: 2, columnStart: 6, columnEnd: 7 },
    eyes: { row: 4, columnStart: 5, columnEnd: 7 },
    mouth: { row: 5, columnStart: 5, columnEnd: 7 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// Lanky imp: tall narrow head, long thin body, very long legs
const lanky16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],   // row 0
    [_, _, _, _, _, _, F, F],   // row 1: head top
    [_, _, _, _, _, _, B, B],   // row 2: head
    [_, _, _, _, _, F, B, B],   // row 3: head
    [_, _, _, _, _, F, B, B],   // row 4: lower head
    [_, _, _, _, _, _, F, F],   // row 5: neck
    [_, _, _, _, _, F, B, F],   // row 6: shoulders
    [_, _, _, _, P, F, B, F],   // row 7: arm + torso
    [_, _, _, _, _, F, B, F],   // row 8: torso
    [_, _, _, _, _, F, B, F],   // row 9: torso
    [_, _, _, _, _, _, F, F],   // row 10: waist
    [_, _, _, _, _, _, F, F],   // row 11: hips
    [_, _, _, _, _, _, F, _],   // row 12: legs
    [_, _, _, _, _, _, F, _],   // row 13: legs
    [_, _, _, _, _, _, F, _],   // row 14: lower legs
    [_, _, _, _, _, F, F, _],   // row 15: feet
  ],
  anchors: {
    horns: { row: 1, columnStart: 6, columnEnd: 7 },
    eyes: { row: 3, columnStart: 5, columnEnd: 7 },
    mouth: { row: 4, columnStart: 5, columnEnd: 7 },
  },
  compatibleWith: ['tall-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

// Brute imp: wide shoulders, thick arms, powerful build
const brute16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],   // row 0
    [_, _, _, _, _, _, _, _],   // row 1
    [_, _, _, _, _, _, F, F],   // row 2: head top
    [_, _, _, _, _, F, B, B],   // row 3: head
    [_, _, _, _, _, F, B, B],   // row 4: head
    [_, _, _, _, _, F, B, B],   // row 5: jaw
    [_, _, _, _, _, _, F, F],   // row 6: neck
    [_, _, _, _, F, F, B, F],   // row 7: shoulders
    [_, _, _, F, F, B, B, F],   // row 8: big arms
    [_, _, P, F, F, B, B, F],   // row 9: forearms
    [_, _, _, _, F, B, B, F],   // row 10: torso
    [_, _, _, _, _, F, B, F],   // row 11: waist
    [_, _, _, _, _, F, B, F],   // row 12: hips
    [_, _, _, _, _, F, F, F],   // row 13: upper legs
    [_, _, _, _, F, F, _, F],   // row 14: legs apart
    [_, _, _, _, F, _, _, F],   // row 15: wide stance
  ],
  anchors: {
    horns: { row: 2, columnStart: 6, columnEnd: 7 },
    eyes: { row: 4, columnStart: 5, columnEnd: 7 },
    mouth: { row: 5, columnStart: 5, columnEnd: 7 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'triple-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// Hunched imp: head jutting forward, bent posture, long arms
const hunched16 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _],   // row 0
    [_, _, _, _, _, _, _, _],   // row 1
    [_, _, _, _, _, _, _, _],   // row 2
    [_, _, _, _, _, _, F, F],   // row 3: head top
    [_, _, _, _, _, F, B, B],   // row 4: head
    [_, _, _, _, _, F, B, B],   // row 5: head
    [_, _, _, _, _, F, F, F],   // row 6: neck (forward)
    [_, _, _, _, F, F, B, F],   // row 7: hunched shoulders
    [_, _, _, P, F, B, B, F],   // row 8: long arms
    [_, _, P, F, F, B, B, F],   // row 9: arms reaching down
    [_, _, _, _, F, F, B, F],   // row 10: torso
    [_, _, _, _, _, F, B, F],   // row 11: waist
    [_, _, _, _, _, F, F, F],   // row 12: hips
    [_, _, _, _, _, F, _, F],   // row 13: legs
    [_, _, _, _, _, F, _, F],   // row 14: lower legs
    [_, _, _, _, F, F, _, _],   // row 15: feet
  ],
  anchors: {
    horns: { row: 3, columnStart: 6, columnEnd: 7 },
    eyes: { row: 4, columnStart: 5, columnEnd: 7 },
    mouth: { row: 5, columnStart: 5, columnEnd: 7 },
  },
  compatibleWith: ['wide-horns', 'tall-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

// ============================================================
// 32x32 bodies (half-width = 16 cols, mirrored width = 31)
// Full detail: distinct head shape, neck, shoulders, arms
// with claws, defined torso, narrow waist, digitigrade legs.
// ============================================================

// Classic imp 32: balanced proportions
const classic32 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 0
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 1
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 2
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 3
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],   // 4: head top
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 5: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 6: head wide
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 7: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 8: lower head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 9: jaw
    [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],   // 10: chin
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],   // 11: neck
    [_, _, _, _, _, _, _, _, _, _, F, F, F, B, F, _],   // 12: shoulders
    [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],   // 13: upper torso
    [_, _, _, _, _, _, _, _, P, F, B, B, B, B, F, _],   // 14: arms out
    [_, _, _, _, _, _, _, P, F, F, B, B, B, B, F, _],   // 15: forearms
    [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],   // 16: torso
    [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],   // 17: torso
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 18: waist
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 19: waist
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 20: hips
    [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],   // 21: upper legs
    [_, _, _, _, _, _, _, _, _, _, _, F, F, _, F, _],   // 22: legs split
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 23: legs
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 24: legs
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 25: lower legs
    [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, _],   // 26: ankles
    [_, _, _, _, _, _, _, _, _, _, F, _, _, F, F, _],   // 27: digitigrade feet
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 28
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 29
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 30
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 31
  ],
  anchors: {
    horns: { row: 4, columnStart: 13, columnEnd: 15 },
    eyes: { row: 7, columnStart: 11, columnEnd: 15 },
    mouth: { row: 9, columnStart: 11, columnEnd: 15 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// Lanky imp 32: very tall and thin, long limbs
const lanky32 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 0
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 1
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 2
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, F, F],   // 3: head top
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, B, B],   // 4: head
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 5: head
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 6: head
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 7: lower head
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],   // 8: chin
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, F, _],   // 9: thin neck
    [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, _],   // 10: shoulders
    [_, _, _, _, _, _, _, _, _, _, _, P, F, B, F, _],   // 11: arms
    [_, _, _, _, _, _, _, _, _, _, P, F, F, B, F, _],   // 12: forearms
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],   // 13: torso
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],   // 14: torso
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],   // 15: torso
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],   // 16: waist
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],   // 17: hips
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],   // 18: upper legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 19: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 20: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 21: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 22: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 23: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],   // 24: legs
    [_, _, _, _, _, _, _, _, _, _, _, _, F, F, _, _],   // 25: ankles
    [_, _, _, _, _, _, _, _, _, _, _, _, F, _, _, _],   // 26: feet
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 27
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 28
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 29
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 30
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 31
  ],
  anchors: {
    horns: { row: 3, columnStart: 14, columnEnd: 15 },
    eyes: { row: 5, columnStart: 12, columnEnd: 15 },
    mouth: { row: 7, columnStart: 12, columnEnd: 15 },
  },
  compatibleWith: ['tall-horns', 'small-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

// Brute imp 32: massive shoulders, thick arms
const brute32 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 0
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 1
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 2
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 3
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],   // 4: head top
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 5: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 6: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 7: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 8: lower head
    [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],   // 9: chin
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],   // 10: neck
    [_, _, _, _, _, _, _, _, _, F, F, F, F, B, F, _],   // 11: wide shoulders
    [_, _, _, _, _, _, _, _, F, F, B, B, B, B, F, _],   // 12: big arms
    [_, _, _, _, _, _, _, F, F, B, B, B, B, B, F, _],   // 13: arms
    [_, _, _, _, _, _, P, F, F, B, B, B, B, B, F, _],   // 14: forearms + claws
    [_, _, _, _, _, _, _, F, F, F, B, B, B, B, F, _],   // 15: forearms
    [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],   // 16: torso
    [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],   // 17: torso
    [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],   // 18: torso
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 19: waist
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 20: hips
    [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],   // 21: upper legs
    [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, F],   // 22: legs wide
    [_, _, _, _, _, _, _, _, _, _, F, _, _, _, _, F],   // 23: legs
    [_, _, _, _, _, _, _, _, _, _, F, _, _, _, _, F],   // 24: legs
    [_, _, _, _, _, _, _, _, _, F, F, _, _, _, F, F],   // 25: ankles
    [_, _, _, _, _, _, _, _, _, F, _, _, _, _, F, _],   // 26: feet
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 27
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 28
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 29
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 30
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 31
  ],
  anchors: {
    horns: { row: 4, columnStart: 13, columnEnd: 15 },
    eyes: { row: 7, columnStart: 11, columnEnd: 15 },
    mouth: { row: 8, columnStart: 11, columnEnd: 15 },
  },
  compatibleWith: ['wide-horns', 'small-horns', 'triple-eye', 'double-eye', 'fangs', 'grin'],
  symmetric: true,
})

// Hunched imp 32: stooped posture, long dangling arms
const hunched32 = new Template({
  grid: [
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 0
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 1
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 2
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 3
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 4
    [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],   // 5: head top
    [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],   // 6: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 7: head
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],   // 8: head
    [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],   // 9: chin
    [_, _, _, _, _, _, _, _, _, _, _, F, F, B, F, _],   // 10: hunched neck
    [_, _, _, _, _, _, _, _, _, _, F, F, B, B, F, _],   // 11: shoulders
    [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],   // 12: torso
    [_, _, _, _, _, _, _, _, P, F, B, B, B, B, F, _],   // 13: long arms
    [_, _, _, _, _, _, _, P, F, F, B, B, B, B, F, _],   // 14: arms reaching
    [_, _, _, _, _, _, P, F, F, _, F, B, B, B, F, _],   // 15: claws dangling
    [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],   // 16: torso
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 17: waist
    [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],   // 18: hips
    [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],   // 19: upper legs
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 20: legs
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 21: legs
    [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],   // 22: legs
    [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, _],   // 23: ankles
    [_, _, _, _, _, _, _, _, _, _, F, _, _, F, F, _],   // 24: feet
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 25
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 26
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 27
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 28
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 29
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 30
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],   // 31
  ],
  anchors: {
    horns: { row: 5, columnStart: 13, columnEnd: 15 },
    eyes: { row: 7, columnStart: 11, columnEnd: 15 },
    mouth: { row: 8, columnStart: 11, columnEnd: 15 },
  },
  compatibleWith: ['wide-horns', 'tall-horns', 'single-eye', 'double-eye', 'fangs', 'smirk'],
  symmetric: true,
})

export const bodyTemplates: TemplateRegistry = {
  8: [stocky8, lanky8, brawler8],
  16: [classic16, lanky16, brute16, hunched16],
  32: [classic32, lanky32, brute32, hunched32],
}
