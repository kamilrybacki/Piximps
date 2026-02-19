import { describe, it, expect } from 'vitest'
import { ImpGenerator } from '@piximps/index'

describe('ImpGenerator builder', () => {
  it('has sensible defaults (size=128, grid=16, format=png)', () => {
    const gen = new ImpGenerator()
    expect(gen.getOptions().size).toBe(128)
    expect(gen.getOptions().grid).toBe(16)
    expect(gen.getOptions().format).toBe('png')
  })

  it('returns a new instance on each builder call (immutable)', () => {
    const gen1 = new ImpGenerator()
    const gen2 = gen1.size(256)
    expect(gen1).not.toBe(gen2)
    expect(gen1.getOptions().size).toBe(128)
    expect(gen2.getOptions().size).toBe(256)
  })

  it('chains builder methods', () => {
    const gen = new ImpGenerator().size(64).grid(8).format('svg')
    const opts = gen.getOptions()
    expect(opts.size).toBe(64)
    expect(opts.grid).toBe(8)
    expect(opts.format).toBe('svg')
  })

  it('generates a PNG Uint8Array by default', async () => {
    const gen = new ImpGenerator().grid(8)
    const result = await gen.generate('test-input')
    expect(result).toBeInstanceOf(Uint8Array)
    expect((result as Uint8Array)[0]).toBe(137)
  })

  it('generates an SVG string when format is svg', async () => {
    const gen = new ImpGenerator().grid(8).format('svg')
    const result = await gen.generate('test-input')
    expect(typeof result).toBe('string')
    expect(result).toContain('<svg')
  })

  it('generates a buffer Uint8Array when format is buffer', async () => {
    const gen = new ImpGenerator().grid(8).size(8).format('buffer')
    const result = await gen.generate('test-input')
    expect(result).toBeInstanceOf(Uint8Array)
    expect((result as Uint8Array).length).toBe(256)
  })

  it('generates a random imp when no input is provided', async () => {
    const gen = new ImpGenerator().grid(8).format('svg')
    const result1 = await gen.generate()
    const result2 = await gen.generate()
    expect(typeof result1).toBe('string')
    expect(typeof result2).toBe('string')
  })
})
