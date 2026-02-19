import { describe, it, expect } from 'vitest'
import { ImpGenerator } from '@piximps/index'

describe('output formats', () => {
  const gen = new ImpGenerator().grid(8)

  it('buffer format: returns RGBA Uint8Array of correct size', async () => {
    const result = await gen.size(16).format('buffer').generate('format-test') as Uint8Array
    expect(result.length).toBe(1024)
  })

  it('png format: returns valid PNG', async () => {
    const result = await gen.size(64).format('png').generate('format-test') as Uint8Array
    expect(result[0]).toBe(137)
    expect(result[1]).toBe(80)
    expect(result[2]).toBe(78)
    expect(result[3]).toBe(71)
  })

  it('svg format: returns valid SVG string', async () => {
    const result = await gen.size(64).format('svg').generate('format-test')
    expect(typeof result).toBe('string')
    expect(result).toContain('<svg')
    expect(result).toContain('width="64"')
    expect(result).toContain('</svg>')
    expect(result).toContain('<rect')
  })

  it('different sizes produce different buffer lengths', async () => {
    const small = await gen.size(8).format('buffer').generate('size-test') as Uint8Array
    const large = await gen.size(32).format('buffer').generate('size-test') as Uint8Array
    expect(small.length).toBe(8 * 8 * 4)
    expect(large.length).toBe(32 * 32 * 4)
  })
})
