import { type GridSize } from '@piximps/domain/types'
import { ImpTraits, type AccessoryType } from '@piximps/domain/imp-traits'
import { bodyTemplates } from '@piximps/common/templates/body'
import { hornTemplates } from '@piximps/common/templates/horns'
import { eyeTemplates } from '@piximps/common/templates/eyes'
import { mouthTemplates } from '@piximps/common/templates/mouth'
import { accessoryTemplates } from '@piximps/common/templates/accessories'

const ACCESSORY_PRESENCE_THRESHOLD = 128

class ByteConsumer {
  private offset: number

  constructor(
    private readonly bytes: Uint8Array,
    startOffset: number = 12,
  ) {
    this.offset = startOffset
  }

  next(): number {
    const value = this.bytes[this.offset % this.bytes.length]
    this.offset++
    return value
  }

  selectIndex(count: number): number {
    if (count <= 0) return 0
    return this.next() % count
  }

  selectBool(): boolean {
    return this.next() >= ACCESSORY_PRESENCE_THRESHOLD
  }

  nextBits(count: number): boolean[] {
    const bits: boolean[] = []
    for (let i = 0; i < count; i++) {
      bits.push((this.next() & (1 << (i % 8))) !== 0)
    }
    return bits
  }
}

export function extractTraits(bytes: Uint8Array, gridSize: GridSize): ImpTraits {
  const consumer = new ByteConsumer(bytes)

  const bodyCount = bodyTemplates[gridSize].length
  const hornCount = hornTemplates[gridSize].length
  const eyeCount = eyeTemplates[gridSize].length
  const mouthCount = mouthTemplates[gridSize].length

  const bodyIndex = consumer.selectIndex(bodyCount)
  const hornsIndex = consumer.selectIndex(hornCount)
  const eyesIndex = consumer.selectIndex(eyeCount)
  const mouthIndex = consumer.selectIndex(mouthCount)

  const accessoryTypes: AccessoryType[] = ['tail', 'wings', 'weapon', 'hat']
  const accessoryIndices: Record<AccessoryType, number | null> = {
    tail: null,
    wings: null,
    weapon: null,
    hat: null,
  }

  for (const accType of accessoryTypes) {
    const isPresent = consumer.selectBool()
    const templates = accessoryTemplates[accType]?.[gridSize] ?? []
    if (isPresent && templates.length > 0) {
      accessoryIndices[accType] = consumer.selectIndex(templates.length)
    } else {
      consumer.next()
    }
  }

  const symmetryBreakSide = consumer.next() % 2 === 0 ? 'left' as const : 'right' as const
  const probabilisticBits = consumer.nextBits(32)

  return new ImpTraits({
    bodyIndex,
    hornsIndex,
    eyesIndex,
    mouthIndex,
    accessoryIndices,
    probabilisticBits,
    symmetryBreakSide,
  })
}
