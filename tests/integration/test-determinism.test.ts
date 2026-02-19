import { describe, it, expect } from 'vitest'
import { ImpGenerator } from '@piximps/index'

describe('determinism', () => {
  it('same input produces identical PNG output across calls', async () => {
    const gen = new ImpGenerator().grid(8).size(32)
    const first = await gen.generate('determinism-test') as Uint8Array
    const second = await gen.generate('determinism-test') as Uint8Array
    expect(first).toEqual(second)
  })

  it('same input produces identical SVG output across calls', async () => {
    const gen = new ImpGenerator().grid(8).size(32).format('svg')
    const first = await gen.generate('determinism-test')
    const second = await gen.generate('determinism-test')
    expect(first).toBe(second)
  })

  it('same input produces identical buffer output across calls', async () => {
    const gen = new ImpGenerator().grid(8).size(8).format('buffer')
    const first = await gen.generate('determinism-test') as Uint8Array
    const second = await gen.generate('determinism-test') as Uint8Array
    expect(first).toEqual(second)
  })

  it('different inputs produce different outputs', async () => {
    const gen = new ImpGenerator().grid(8).size(32).format('svg')
    const alice = await gen.generate('alice')
    const bob = await gen.generate('bob')
    expect(alice).not.toBe(bob)
  })

  it('determinism holds across different generator instances', async () => {
    const gen1 = new ImpGenerator().grid(8).size(32)
    const gen2 = new ImpGenerator().grid(8).size(32)
    const result1 = await gen1.generate('cross-instance') as Uint8Array
    const result2 = await gen2.generate('cross-instance') as Uint8Array
    expect(result1).toEqual(result2)
  })
})
