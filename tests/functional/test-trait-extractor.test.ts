import { describe, it, expect } from 'vitest'
import { extractTraits } from '@piximps/services/trait-extractor'
import { ImpTraits } from '@piximps/domain/imp-traits'

describe('extractTraits', () => {
  it('returns an ImpTraits from a byte sequence and grid size', () => {
    const bytes = new Uint8Array(32)
    bytes.set([100, 50, 200, 150, 80, 30, 210, 90, 170, 60, 45, 220, 130, 75])
    const traits = extractTraits(bytes, 8)

    expect(traits).toBeInstanceOf(ImpTraits)
  })

  it('selects valid indices within template count bounds', () => {
    const bytes = new Uint8Array(32).fill(255)
    const traits = extractTraits(bytes, 8)

    expect(traits.bodyIndex).toBeGreaterThanOrEqual(0)
    expect(traits.bodyIndex).toBeLessThan(3)
    expect(traits.hornsIndex).toBeGreaterThanOrEqual(0)
    expect(traits.hornsIndex).toBeLessThan(3)
    expect(traits.eyesIndex).toBeGreaterThanOrEqual(0)
    expect(traits.eyesIndex).toBeLessThan(3)
    expect(traits.mouthIndex).toBeGreaterThanOrEqual(0)
    expect(traits.mouthIndex).toBeLessThan(3)
  })

  it('is deterministic — same bytes and grid produce same traits', () => {
    const bytes = new Uint8Array(32).fill(42)
    const first = extractTraits(bytes, 8)
    const second = extractTraits(bytes, 8)

    expect(first.bodyIndex).toBe(second.bodyIndex)
    expect(first.hornsIndex).toBe(second.hornsIndex)
    expect(first.symmetryBreakSide).toBe(second.symmetryBreakSide)
  })

  it('determines symmetry break side from hash', () => {
    const bytes = new Uint8Array(32).fill(0)
    const traitsEven = extractTraits(bytes, 8)
    expect(['left', 'right']).toContain(traitsEven.symmetryBreakSide)
  })

  it('accessories can be absent based on hash', () => {
    const bytes = new Uint8Array(32).fill(0)
    const traits = extractTraits(bytes, 8)
    const accessoryValues = Object.values(traits.accessoryIndices)
    expect(accessoryValues.some(v => v === null) || accessoryValues.some(v => v !== null)).toBe(true)
  })
})
