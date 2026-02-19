import { describe, it, expect } from 'vitest'
import { hashToByteSequence } from '@piximps/services/hash-to-byte-sequence'

describe('hashToByteSequence', () => {
  it('returns a Uint8Array from a string input', () => {
    const result = hashToByteSequence('hello')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThan(0)
  })

  it('is deterministic — same input produces same output', () => {
    const first = hashToByteSequence('test@example.com')
    const second = hashToByteSequence('test@example.com')
    expect(first).toEqual(second)
  })

  it('produces different outputs for different inputs', () => {
    const a = hashToByteSequence('alice')
    const b = hashToByteSequence('bob')
    expect(a).not.toEqual(b)
  })

  it('produces at least 32 bytes of output for trait extraction', () => {
    const result = hashToByteSequence('short')
    expect(result.length).toBeGreaterThanOrEqual(32)
  })

  it('handles empty string input', () => {
    const result = hashToByteSequence('')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThanOrEqual(32)
  })

  it('handles unicode input', () => {
    const result = hashToByteSequence('kamil@przyklad.pl')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThanOrEqual(32)
  })
})
