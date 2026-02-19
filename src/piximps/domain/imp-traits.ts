export type AccessoryType = 'tail' | 'wings' | 'weapon' | 'hat'

export type AccessoryIndices = Record<AccessoryType, number | null>

export type SymmetryBreakSide = 'left' | 'right'

export interface ImpTraitsConfig {
  bodyIndex: number
  hornsIndex: number
  eyesIndex: number
  mouthIndex: number
  accessoryIndices: AccessoryIndices
  probabilisticBits: boolean[]
  symmetryBreakSide: SymmetryBreakSide
}

export class ImpTraits {
  readonly bodyIndex: number
  readonly hornsIndex: number
  readonly eyesIndex: number
  readonly mouthIndex: number
  readonly accessoryIndices: AccessoryIndices
  readonly probabilisticBits: boolean[]
  readonly symmetryBreakSide: SymmetryBreakSide

  constructor(config: ImpTraitsConfig) {
    this.bodyIndex = config.bodyIndex
    this.hornsIndex = config.hornsIndex
    this.eyesIndex = config.eyesIndex
    this.mouthIndex = config.mouthIndex
    this.accessoryIndices = config.accessoryIndices
    this.probabilisticBits = config.probabilisticBits
    this.symmetryBreakSide = config.symmetryBreakSide
  }
}
