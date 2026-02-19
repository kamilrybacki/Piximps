```
     ___  _       _
    / _ \(_)_  __(_)_ __ ___  _ __  ___
   / /_)/ \ \/ /| | '_ ` _ \| '_ \/ __|
  / ___/| |>  < | | | | | | | |_) \__ \
  \/    |_/_/\_\|_|_| |_| |_| .__/|___/
                             |_|
```

Deterministic demonic pixel-art avatars. Feed it a string, get a unique imp.

**[Live Demo](https://kamilrybacki.github.io/Piximps/)**

---

## Install

```bash
npm install piximps
```

## Quick Start

```typescript
import { ImpGenerator } from 'piximps'

const gen = new ImpGenerator()

// Deterministic — same input, same imp, every time
const svg = await gen.format('svg').generate('your-username')

// Random imp
const random = await gen.format('svg').generate()

// PNG output (Node.js only — requires pngjs)
const png = await gen.format('png').generate('hello')

// Raw RGBA buffer
const buf = await gen.format('buffer').size(256).generate('world')
```

## How It Works

1. **Hash** — your input string is hashed into a byte sequence
2. **Traits** — bytes are mapped to body shape, horns, eyes, mouth, and accessories (tail, wings, weapon, hat)
3. **Palette** — a unique 4-color palette (skin, accent, glow, secondary) is derived from the hash
4. **Compose** — layers are composited onto the pixel grid with symmetry and probabilistic fill
5. **Edge detect** — outlines are added for that crisp pixel-art look
6. **Render** — output as SVG string, PNG binary, or raw RGBA buffer

## API

### `new ImpGenerator(options?)`

| Option   | Type               | Default | Description              |
|----------|--------------------|---------|--------------------------|
| `size`   | `number`           | `128`   | Output size in pixels    |
| `grid`   | `8 \| 16 \| 32`   | `16`    | Pixel grid resolution    |
| `format` | `'svg' \| 'png' \| 'buffer'` | `'png'` | Output format  |

The constructor returns an immutable generator. Use the fluent API to derive new instances:

```typescript
const gen = new ImpGenerator()
const big = gen.size(512)           // new generator, 512px output
const svg = big.format('svg')      // new generator, SVG format
const hd  = svg.grid(32)           // new generator, 32x32 grid
```

### `.generate(input?: string): Promise<Uint8Array | string>`

- With a string: deterministic output (same string = same imp)
- Without arguments: random imp every time
- Returns `string` for SVG, `Uint8Array` for PNG and buffer

### `.getOptions(): Readonly<ImpGeneratorOptions>`

Returns the current configuration.

## Output Formats

| Format   | Return type   | Environment     |
|----------|---------------|-----------------|
| `'svg'`  | `string`      | Node.js + Browser |
| `'png'`  | `Uint8Array`  | Node.js only    |
| `'buffer'`| `Uint8Array` | Node.js + Browser |

> **Browser usage:** only `svg` and `buffer` formats work client-side. The `png` format depends on `pngjs` which requires Node.js `Buffer`.

## Grid Sizes

- **8x8** — chunky, iconic
- **16x16** — balanced detail (default)
- **32x32** — high detail imps

## Traits

Each imp is assembled from interchangeable parts:

- **Body** — the base silhouette
- **Horns** — various horn styles
- **Eyes** — expression and character
- **Mouth** — grins, fangs, smirks
- **Accessories** — tail, wings, weapon, hat (each independently present or absent)

All traits are deterministically selected from the input hash. Two imps with the same seed are guaranteed identical.

## License

ISC
