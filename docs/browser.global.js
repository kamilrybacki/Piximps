"use strict";
var Piximps = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/piximps/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    ImpGenerator: () => ImpGenerator
  });

  // src/piximps/services/hash-to-byte-sequence.ts
  function murmurhash3_32(key, seed) {
    let h1 = seed >>> 0;
    const remainder = key.length & 3;
    const bytes = key.length - remainder;
    const c1 = 3432918353;
    const c2 = 461845907;
    let i = 0;
    while (i < bytes) {
      let k12 = key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24;
      i += 4;
      k12 = Math.imul(k12, c1);
      k12 = k12 << 15 | k12 >>> 17;
      k12 = Math.imul(k12, c2);
      h1 ^= k12;
      h1 = h1 << 13 | h1 >>> 19;
      h1 = Math.imul(h1, 5) + 3864292196;
    }
    let k1 = 0;
    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
      // falls through
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
      // falls through
      case 1:
        k1 ^= key.charCodeAt(i) & 255;
        k1 = Math.imul(k1, c1);
        k1 = k1 << 15 | k1 >>> 17;
        k1 = Math.imul(k1, c2);
        h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 16;
    h1 = Math.imul(h1, 2246822507);
    h1 ^= h1 >>> 13;
    h1 = Math.imul(h1, 3266489909);
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
  }
  function hashToByteSequence(input) {
    const seedCount = 8;
    const bytes = new Uint8Array(seedCount * 4);
    for (let seed = 0; seed < seedCount; seed++) {
      const hash = murmurhash3_32(input, seed);
      const offset = seed * 4;
      bytes[offset] = hash & 255;
      bytes[offset + 1] = hash >> 8 & 255;
      bytes[offset + 2] = hash >> 16 & 255;
      bytes[offset + 3] = hash >> 24 & 255;
    }
    return bytes;
  }

  // src/piximps/domain/color-palette.ts
  var ColorPalette = class {
    constructor(config) {
      this.skin = config.skin;
      this.accent = config.accent;
      this.glow = config.glow;
      this.secondary = config.secondary;
    }
  };

  // src/piximps/services/palette-deriver.ts
  function readRgb(bytes, offset) {
    return [bytes[offset], bytes[offset + 1], bytes[offset + 2], 255];
  }
  function boostSaturationAndBrightness(color) {
    const max = Math.max(color[0], color[1], color[2]);
    const min = Math.min(color[0], color[1], color[2]);
    if (max === 0) return [255, 200, 0, 255];
    const boosted = [color[0], color[1], color[2], 255];
    const scale = 255 / max;
    boosted[0] = Math.min(255, Math.round(boosted[0] * scale));
    boosted[1] = Math.min(255, Math.round(boosted[1] * scale));
    boosted[2] = Math.min(255, Math.round(boosted[2] * scale));
    const maxBoosted = Math.max(boosted[0], boosted[1], boosted[2]);
    if (maxBoosted <= 150) {
      const idx = [boosted[0], boosted[1], boosted[2]].indexOf(maxBoosted);
      boosted[idx] = 220;
    }
    return boosted;
  }
  function ensureColorDistance(skin, accent, minimumDistance) {
    const distance = Math.abs(skin[0] - accent[0]) + Math.abs(skin[1] - accent[1]) + Math.abs(skin[2] - accent[2]);
    if (distance >= minimumDistance) return accent;
    const adjusted = [
      (accent[0] + 80) % 256,
      (accent[1] + 40) % 256,
      (accent[2] + 120) % 256,
      255
    ];
    return adjusted;
  }
  function derivePalette(bytes) {
    const rawSkin = readRgb(bytes, 0);
    const rawAccent = readRgb(bytes, 3);
    const rawGlow = readRgb(bytes, 6);
    const rawSecondary = readRgb(bytes, 9);
    const glow = boostSaturationAndBrightness(rawGlow);
    const accent = ensureColorDistance(rawSkin, rawAccent, 60);
    return new ColorPalette({
      skin: rawSkin,
      accent,
      glow,
      secondary: rawSecondary
    });
  }

  // src/piximps/domain/imp-traits.ts
  var ImpTraits = class {
    constructor(config) {
      this.bodyIndex = config.bodyIndex;
      this.hornsIndex = config.hornsIndex;
      this.eyesIndex = config.eyesIndex;
      this.mouthIndex = config.mouthIndex;
      this.accessoryIndices = config.accessoryIndices;
      this.probabilisticBits = config.probabilisticBits;
      this.symmetryBreakSide = config.symmetryBreakSide;
    }
  };

  // src/piximps/domain/template.ts
  var Template = class {
    constructor(config) {
      this.grid = config.grid;
      this.anchors = config.anchors;
      this.compatibleWith = config.compatibleWith;
      this.symmetric = config.symmetric;
    }
    get width() {
      return this.grid[0]?.length ?? 0;
    }
    get height() {
      return this.grid.length;
    }
    get mirroredWidth() {
      if (!this.symmetric) return this.width;
      return this.width * 2 - 1;
    }
  };

  // src/piximps/common/templates/body.ts
  var _ = -1 /* AlwaysEmpty */;
  var P = 0 /* Probabilistic */;
  var F = 1 /* AlwaysFilled */;
  var B = 2 /* InnerBody */;
  var stocky8 = new Template({
    grid: [
      [_, _, F, F],
      // pointed head top
      [_, _, B, B],
      // head
      [_, F, B, B],
      // shoulders (wide)
      [_, P, F, B],
      // arms out + torso
      [_, _, F, B],
      // waist
      [_, _, B, B],
      // hips
      [_, _, F, F],
      // upper legs
      [_, _, F, _]
      // feet apart
    ],
    anchors: {
      horns: { row: 0, columnStart: 2, columnEnd: 3 },
      eyes: { row: 1, columnStart: 2, columnEnd: 3 },
      mouth: { row: 2, columnStart: 2, columnEnd: 3 }
    },
    compatibleWith: ["wide-horns", "small-horns", "single-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var lanky8 = new Template({
    grid: [
      [_, _, F, F],
      // pointed head
      [_, _, B, B],
      // head
      [_, _, F, B],
      // narrow shoulders
      [_, P, F, B],
      // arm + torso
      [_, _, F, B],
      // waist
      [_, _, F, F],
      // hips
      [_, _, F, _],
      // legs
      [_, _, F, _]
      // feet
    ],
    anchors: {
      horns: { row: 0, columnStart: 2, columnEnd: 3 },
      eyes: { row: 1, columnStart: 2, columnEnd: 3 },
      mouth: { row: 2, columnStart: 2, columnEnd: 3 }
    },
    compatibleWith: ["tall-horns", "small-horns", "single-eye", "double-eye", "fangs", "smirk"],
    symmetric: true
  });
  var brawler8 = new Template({
    grid: [
      [_, _, F, F],
      // head top
      [_, F, B, B],
      // head (wider)
      [F, F, B, B],
      // big shoulders
      [F, P, F, B],
      // arms out wide
      [_, _, F, B],
      // narrow waist
      [_, _, B, B],
      // hips
      [_, _, F, F],
      // legs
      [_, F, _, F]
      // wide stance
    ],
    anchors: {
      horns: { row: 0, columnStart: 2, columnEnd: 3 },
      eyes: { row: 1, columnStart: 1, columnEnd: 3 },
      mouth: { row: 2, columnStart: 1, columnEnd: 3 }
    },
    compatibleWith: ["wide-horns", "small-horns", "triple-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var classic16 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _],
      // row 0
      [_, _, _, _, _, _, _, _],
      // row 1
      [_, _, _, _, _, _, F, F],
      // row 2: head top (pointed)
      [_, _, _, _, _, F, B, B],
      // row 3: head
      [_, _, _, _, _, F, B, B],
      // row 4: head
      [_, _, _, _, _, F, B, B],
      // row 5: lower head
      [_, _, _, _, _, _, F, F],
      // row 6: neck
      [_, _, _, _, F, F, B, F],
      // row 7: shoulders
      [_, _, _, P, F, B, B, F],
      // row 8: arms + upper torso
      [_, _, _, _, F, B, B, F],
      // row 9: torso
      [_, _, _, _, _, F, B, F],
      // row 10: waist (narrow)
      [_, _, _, _, _, F, B, F],
      // row 11: hips
      [_, _, _, _, _, F, F, F],
      // row 12: upper legs
      [_, _, _, _, _, F, _, F],
      // row 13: legs apart
      [_, _, _, _, _, F, _, F],
      // row 14: lower legs
      [_, _, _, _, F, F, _, _]
      // row 15: feet (digitigrade)
    ],
    anchors: {
      horns: { row: 2, columnStart: 6, columnEnd: 7 },
      eyes: { row: 4, columnStart: 5, columnEnd: 7 },
      mouth: { row: 5, columnStart: 5, columnEnd: 7 }
    },
    compatibleWith: ["wide-horns", "small-horns", "single-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var lanky16 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _],
      // row 0
      [_, _, _, _, _, _, F, F],
      // row 1: head top
      [_, _, _, _, _, _, B, B],
      // row 2: head
      [_, _, _, _, _, F, B, B],
      // row 3: head
      [_, _, _, _, _, F, B, B],
      // row 4: lower head
      [_, _, _, _, _, _, F, F],
      // row 5: neck
      [_, _, _, _, _, F, B, F],
      // row 6: shoulders
      [_, _, _, _, P, F, B, F],
      // row 7: arm + torso
      [_, _, _, _, _, F, B, F],
      // row 8: torso
      [_, _, _, _, _, F, B, F],
      // row 9: torso
      [_, _, _, _, _, _, F, F],
      // row 10: waist
      [_, _, _, _, _, _, F, F],
      // row 11: hips
      [_, _, _, _, _, _, F, _],
      // row 12: legs
      [_, _, _, _, _, _, F, _],
      // row 13: legs
      [_, _, _, _, _, _, F, _],
      // row 14: lower legs
      [_, _, _, _, _, F, F, _]
      // row 15: feet
    ],
    anchors: {
      horns: { row: 1, columnStart: 6, columnEnd: 7 },
      eyes: { row: 3, columnStart: 5, columnEnd: 7 },
      mouth: { row: 4, columnStart: 5, columnEnd: 7 }
    },
    compatibleWith: ["tall-horns", "small-horns", "single-eye", "double-eye", "fangs", "smirk"],
    symmetric: true
  });
  var brute16 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _],
      // row 0
      [_, _, _, _, _, _, _, _],
      // row 1
      [_, _, _, _, _, _, F, F],
      // row 2: head top
      [_, _, _, _, _, F, B, B],
      // row 3: head
      [_, _, _, _, _, F, B, B],
      // row 4: head
      [_, _, _, _, _, F, B, B],
      // row 5: jaw
      [_, _, _, _, _, _, F, F],
      // row 6: neck
      [_, _, _, _, F, F, B, F],
      // row 7: shoulders
      [_, _, _, F, F, B, B, F],
      // row 8: big arms
      [_, _, P, F, F, B, B, F],
      // row 9: forearms
      [_, _, _, _, F, B, B, F],
      // row 10: torso
      [_, _, _, _, _, F, B, F],
      // row 11: waist
      [_, _, _, _, _, F, B, F],
      // row 12: hips
      [_, _, _, _, _, F, F, F],
      // row 13: upper legs
      [_, _, _, _, F, F, _, F],
      // row 14: legs apart
      [_, _, _, _, F, _, _, F]
      // row 15: wide stance
    ],
    anchors: {
      horns: { row: 2, columnStart: 6, columnEnd: 7 },
      eyes: { row: 4, columnStart: 5, columnEnd: 7 },
      mouth: { row: 5, columnStart: 5, columnEnd: 7 }
    },
    compatibleWith: ["wide-horns", "small-horns", "triple-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var hunched16 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _],
      // row 0
      [_, _, _, _, _, _, _, _],
      // row 1
      [_, _, _, _, _, _, _, _],
      // row 2
      [_, _, _, _, _, _, F, F],
      // row 3: head top
      [_, _, _, _, _, F, B, B],
      // row 4: head
      [_, _, _, _, _, F, B, B],
      // row 5: head
      [_, _, _, _, _, F, F, F],
      // row 6: neck (forward)
      [_, _, _, _, F, F, B, F],
      // row 7: hunched shoulders
      [_, _, _, P, F, B, B, F],
      // row 8: long arms
      [_, _, P, F, F, B, B, F],
      // row 9: arms reaching down
      [_, _, _, _, F, F, B, F],
      // row 10: torso
      [_, _, _, _, _, F, B, F],
      // row 11: waist
      [_, _, _, _, _, F, F, F],
      // row 12: hips
      [_, _, _, _, _, F, _, F],
      // row 13: legs
      [_, _, _, _, _, F, _, F],
      // row 14: lower legs
      [_, _, _, _, F, F, _, _]
      // row 15: feet
    ],
    anchors: {
      horns: { row: 3, columnStart: 6, columnEnd: 7 },
      eyes: { row: 4, columnStart: 5, columnEnd: 7 },
      mouth: { row: 5, columnStart: 5, columnEnd: 7 }
    },
    compatibleWith: ["wide-horns", "tall-horns", "single-eye", "double-eye", "fangs", "smirk"],
    symmetric: true
  });
  var classic32 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 0
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 1
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 2
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 3
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],
      // 4: head top
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 5: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 6: head wide
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 7: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 8: lower head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 9: jaw
      [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],
      // 10: chin
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],
      // 11: neck
      [_, _, _, _, _, _, _, _, _, _, F, F, F, B, F, _],
      // 12: shoulders
      [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],
      // 13: upper torso
      [_, _, _, _, _, _, _, _, P, F, B, B, B, B, F, _],
      // 14: arms out
      [_, _, _, _, _, _, _, P, F, F, B, B, B, B, F, _],
      // 15: forearms
      [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],
      // 16: torso
      [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],
      // 17: torso
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 18: waist
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 19: waist
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 20: hips
      [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],
      // 21: upper legs
      [_, _, _, _, _, _, _, _, _, _, _, F, F, _, F, _],
      // 22: legs split
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 23: legs
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 24: legs
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 25: lower legs
      [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, _],
      // 26: ankles
      [_, _, _, _, _, _, _, _, _, _, F, _, _, F, F, _],
      // 27: digitigrade feet
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 28
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 29
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 30
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
      // 31
    ],
    anchors: {
      horns: { row: 4, columnStart: 13, columnEnd: 15 },
      eyes: { row: 7, columnStart: 11, columnEnd: 15 },
      mouth: { row: 9, columnStart: 11, columnEnd: 15 }
    },
    compatibleWith: ["wide-horns", "small-horns", "single-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var lanky32 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 0
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 1
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 2
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, F, F],
      // 3: head top
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, B, B],
      // 4: head
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 5: head
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 6: head
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 7: lower head
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],
      // 8: chin
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, F, _],
      // 9: thin neck
      [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, _],
      // 10: shoulders
      [_, _, _, _, _, _, _, _, _, _, _, P, F, B, F, _],
      // 11: arms
      [_, _, _, _, _, _, _, _, _, _, P, F, F, B, F, _],
      // 12: forearms
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],
      // 13: torso
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],
      // 14: torso
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, F, _],
      // 15: torso
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],
      // 16: waist
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],
      // 17: hips
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],
      // 18: upper legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 19: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 20: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 21: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 22: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 23: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, _, _],
      // 24: legs
      [_, _, _, _, _, _, _, _, _, _, _, _, F, F, _, _],
      // 25: ankles
      [_, _, _, _, _, _, _, _, _, _, _, _, F, _, _, _],
      // 26: feet
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 27
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 28
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 29
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 30
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
      // 31
    ],
    anchors: {
      horns: { row: 3, columnStart: 14, columnEnd: 15 },
      eyes: { row: 5, columnStart: 12, columnEnd: 15 },
      mouth: { row: 7, columnStart: 12, columnEnd: 15 }
    },
    compatibleWith: ["tall-horns", "small-horns", "single-eye", "double-eye", "fangs", "smirk"],
    symmetric: true
  });
  var brute32 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 0
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 1
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 2
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 3
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],
      // 4: head top
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 5: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 6: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 7: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 8: lower head
      [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],
      // 9: chin
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, _],
      // 10: neck
      [_, _, _, _, _, _, _, _, _, F, F, F, F, B, F, _],
      // 11: wide shoulders
      [_, _, _, _, _, _, _, _, F, F, B, B, B, B, F, _],
      // 12: big arms
      [_, _, _, _, _, _, _, F, F, B, B, B, B, B, F, _],
      // 13: arms
      [_, _, _, _, _, _, P, F, F, B, B, B, B, B, F, _],
      // 14: forearms + claws
      [_, _, _, _, _, _, _, F, F, F, B, B, B, B, F, _],
      // 15: forearms
      [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],
      // 16: torso
      [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],
      // 17: torso
      [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],
      // 18: torso
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 19: waist
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 20: hips
      [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],
      // 21: upper legs
      [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, F],
      // 22: legs wide
      [_, _, _, _, _, _, _, _, _, _, F, _, _, _, _, F],
      // 23: legs
      [_, _, _, _, _, _, _, _, _, _, F, _, _, _, _, F],
      // 24: legs
      [_, _, _, _, _, _, _, _, _, F, F, _, _, _, F, F],
      // 25: ankles
      [_, _, _, _, _, _, _, _, _, F, _, _, _, _, F, _],
      // 26: feet
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 27
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 28
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 29
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 30
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
      // 31
    ],
    anchors: {
      horns: { row: 4, columnStart: 13, columnEnd: 15 },
      eyes: { row: 7, columnStart: 11, columnEnd: 15 },
      mouth: { row: 8, columnStart: 11, columnEnd: 15 }
    },
    compatibleWith: ["wide-horns", "small-horns", "triple-eye", "double-eye", "fangs", "grin"],
    symmetric: true
  });
  var hunched32 = new Template({
    grid: [
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 0
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 1
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 2
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 3
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 4
      [_, _, _, _, _, _, _, _, _, _, _, _, _, F, F, F],
      // 5: head top
      [_, _, _, _, _, _, _, _, _, _, _, _, F, B, B, B],
      // 6: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 7: head
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, B, B],
      // 8: head
      [_, _, _, _, _, _, _, _, _, _, _, _, F, F, F, F],
      // 9: chin
      [_, _, _, _, _, _, _, _, _, _, _, F, F, B, F, _],
      // 10: hunched neck
      [_, _, _, _, _, _, _, _, _, _, F, F, B, B, F, _],
      // 11: shoulders
      [_, _, _, _, _, _, _, _, _, F, F, B, B, B, F, _],
      // 12: torso
      [_, _, _, _, _, _, _, _, P, F, B, B, B, B, F, _],
      // 13: long arms
      [_, _, _, _, _, _, _, P, F, F, B, B, B, B, F, _],
      // 14: arms reaching
      [_, _, _, _, _, _, P, F, F, _, F, B, B, B, F, _],
      // 15: claws dangling
      [_, _, _, _, _, _, _, _, _, _, F, B, B, B, F, _],
      // 16: torso
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 17: waist
      [_, _, _, _, _, _, _, _, _, _, _, F, B, B, F, _],
      // 18: hips
      [_, _, _, _, _, _, _, _, _, _, _, F, F, F, F, _],
      // 19: upper legs
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 20: legs
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 21: legs
      [_, _, _, _, _, _, _, _, _, _, _, F, _, _, F, _],
      // 22: legs
      [_, _, _, _, _, _, _, _, _, _, F, F, _, _, F, _],
      // 23: ankles
      [_, _, _, _, _, _, _, _, _, _, F, _, _, F, F, _],
      // 24: feet
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 25
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 26
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 27
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 28
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 29
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
      // 30
      [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]
      // 31
    ],
    anchors: {
      horns: { row: 5, columnStart: 13, columnEnd: 15 },
      eyes: { row: 7, columnStart: 11, columnEnd: 15 },
      mouth: { row: 8, columnStart: 11, columnEnd: 15 }
    },
    compatibleWith: ["wide-horns", "tall-horns", "single-eye", "double-eye", "fangs", "smirk"],
    symmetric: true
  });
  var bodyTemplates = {
    8: [stocky8, lanky8, brawler8],
    16: [classic16, lanky16, brute16, hunched16],
    32: [classic32, lanky32, brute32, hunched32]
  };

  // src/piximps/common/templates/horns.ts
  var _2 = -1 /* AlwaysEmpty */;
  var F2 = 1 /* AlwaysFilled */;
  var wideHorns8 = new Template({
    grid: [
      [F2, _2, _2, _2],
      [_2, F2, _2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var smallHorns8 = new Template({
    grid: [
      [_2, _2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["small-horns"],
    symmetric: true
  });
  var tallHorns8 = new Template({
    grid: [
      [_2, F2, _2, _2],
      [_2, F2, _2, _2],
      [_2, _2, _2, _2]
    ],
    anchors: {},
    compatibleWith: ["tall-horns"],
    symmetric: true
  });
  var curvedHorns16 = new Template({
    grid: [
      [F2, _2, _2, _2],
      [_2, F2, _2, _2],
      [_2, _2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var straightHorns16 = new Template({
    grid: [
      [_2, F2, _2],
      [_2, F2, _2],
      [_2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["tall-horns"],
    symmetric: true
  });
  var branchingHorns16 = new Template({
    grid: [
      [F2, _2, _2, _2, _2],
      [_2, F2, _2, _2, _2],
      [_2, F2, F2, _2, _2],
      [_2, _2, _2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var stubbyHorns16 = new Template({
    grid: [
      [F2, _2, _2],
      [_2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["small-horns"],
    symmetric: true
  });
  var longCurved32 = new Template({
    grid: [
      [F2, _2, _2, _2, _2, _2, _2, _2],
      [_2, F2, _2, _2, _2, _2, _2, _2],
      [_2, _2, F2, _2, _2, _2, _2, _2],
      [_2, _2, _2, F2, F2, _2, _2, _2],
      [_2, _2, _2, _2, _2, F2, _2, _2],
      [_2, _2, _2, _2, _2, _2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var shortStubby32 = new Template({
    grid: [
      [_2, _2, F2, _2, _2],
      [_2, _2, _2, F2, _2],
      [_2, _2, _2, _2, F2]
    ],
    anchors: {},
    compatibleWith: ["small-horns"],
    symmetric: true
  });
  var branching32 = new Template({
    grid: [
      [F2, _2, _2, _2, _2, _2, _2, _2],
      [_2, F2, _2, _2, _2, _2, _2, _2],
      [_2, _2, F2, F2, _2, _2, _2, _2],
      [_2, _2, F2, _2, F2, _2, _2, _2],
      [_2, _2, _2, _2, _2, F2, _2, _2],
      [_2, _2, _2, _2, _2, _2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var ramStyle32 = new Template({
    grid: [
      [_2, F2, F2, _2, _2, _2],
      [F2, _2, _2, F2, _2, _2],
      [F2, _2, _2, _2, F2, _2],
      [_2, F2, _2, _2, F2, _2],
      [_2, _2, F2, F2, _2, _2]
    ],
    anchors: {},
    compatibleWith: ["wide-horns"],
    symmetric: true
  });
  var singleSpike32 = new Template({
    grid: [
      [_2, F2, _2],
      [_2, F2, _2],
      [_2, F2, _2],
      [_2, F2, _2],
      [_2, F2, _2],
      [_2, F2, _2]
    ],
    anchors: {},
    compatibleWith: ["tall-horns"],
    symmetric: true
  });
  var hornTemplates = {
    8: [wideHorns8, smallHorns8, tallHorns8],
    16: [curvedHorns16, straightHorns16, branchingHorns16, stubbyHorns16],
    32: [longCurved32, shortStubby32, branching32, ramStyle32, singleSpike32]
  };

  // src/piximps/common/templates/eyes.ts
  var _3 = -1 /* AlwaysEmpty */;
  var F3 = 1 /* AlwaysFilled */;
  var singleEye8 = new Template({
    grid: [[_3, _3, _3, F3]],
    anchors: {},
    compatibleWith: ["single-eye"],
    symmetric: true
  });
  var doubleEye8 = new Template({
    grid: [[_3, F3, _3, _3]],
    anchors: {},
    compatibleWith: ["double-eye"],
    symmetric: true
  });
  var tripleEye8 = new Template({
    grid: [[_3, F3, _3, F3]],
    anchors: {},
    compatibleWith: ["triple-eye"],
    symmetric: true
  });
  var singleEye16 = new Template({
    grid: [
      [_3, _3, _3, F3, F3],
      [_3, _3, _3, F3, F3]
    ],
    anchors: {},
    compatibleWith: ["single-eye"],
    symmetric: true
  });
  var doubleEye16 = new Template({
    grid: [
      [_3, F3, F3, _3, _3],
      [_3, F3, F3, _3, _3]
    ],
    anchors: {},
    compatibleWith: ["double-eye"],
    symmetric: true
  });
  var tripleEye16 = new Template({
    grid: [
      [_3, F3, _3, F3, F3],
      [_3, F3, _3, F3, F3]
    ],
    anchors: {},
    compatibleWith: ["triple-eye"],
    symmetric: true
  });
  var singleEye32 = new Template({
    grid: [
      [_3, _3, _3, _3, _3, _3, F3, F3, F3],
      [_3, _3, _3, _3, _3, _3, F3, F3, F3],
      [_3, _3, _3, _3, _3, _3, F3, F3, F3]
    ],
    anchors: {},
    compatibleWith: ["single-eye"],
    symmetric: true
  });
  var doubleEye32 = new Template({
    grid: [
      [_3, _3, F3, F3, _3, _3, _3, _3],
      [_3, _3, F3, F3, _3, _3, _3, _3]
    ],
    anchors: {},
    compatibleWith: ["double-eye"],
    symmetric: true
  });
  var tripleEye32 = new Template({
    grid: [
      [_3, _3, F3, F3, _3, _3, F3, F3, F3],
      [_3, _3, F3, F3, _3, _3, F3, F3, F3],
      [_3, _3, _3, _3, _3, _3, _3, _3, _3]
    ],
    anchors: {},
    compatibleWith: ["triple-eye"],
    symmetric: true
  });
  var eyeTemplates = {
    8: [singleEye8, doubleEye8, tripleEye8],
    16: [singleEye16, doubleEye16, tripleEye16],
    32: [singleEye32, doubleEye32, tripleEye32]
  };

  // src/piximps/common/templates/mouth.ts
  var _4 = -1 /* AlwaysEmpty */;
  var F4 = 1 /* AlwaysFilled */;
  var fangs8 = new Template({
    grid: [[_4, F4, _4, F4]],
    anchors: {},
    compatibleWith: ["fangs"],
    symmetric: true
  });
  var grin8 = new Template({
    grid: [[_4, F4, F4, F4]],
    anchors: {},
    compatibleWith: ["grin"],
    symmetric: true
  });
  var smirk8 = new Template({
    grid: [[_4, _4, F4, F4]],
    anchors: {},
    compatibleWith: ["smirk"],
    symmetric: false
  });
  var fangs16 = new Template({
    grid: [
      [_4, F4, _4, F4],
      [F4, _4, F4, _4]
    ],
    anchors: {},
    compatibleWith: ["fangs"],
    symmetric: true
  });
  var grin16 = new Template({
    grid: [
      [_4, F4, F4, F4],
      [_4, _4, F4, F4]
    ],
    anchors: {},
    compatibleWith: ["grin"],
    symmetric: true
  });
  var smirk16 = new Template({
    grid: [
      [_4, _4, F4, F4],
      [_4, F4, F4, _4]
    ],
    anchors: {},
    compatibleWith: ["smirk"],
    symmetric: false
  });
  var multiFangs32 = new Template({
    grid: [
      [_4, _4, F4, _4, F4, _4, F4, _4],
      [_4, F4, _4, F4, _4, F4, _4, _4],
      [F4, _4, _4, _4, _4, _4, _4, _4]
    ],
    anchors: {},
    compatibleWith: ["fangs"],
    symmetric: true
  });
  var wideGrin32 = new Template({
    grid: [
      [_4, _4, F4, F4, F4, F4, F4, F4],
      [_4, _4, _4, F4, F4, F4, F4, F4],
      [_4, _4, _4, _4, F4, F4, F4, F4]
    ],
    anchors: {},
    compatibleWith: ["grin"],
    symmetric: true
  });
  var asymSmirk32 = new Template({
    grid: [
      [_4, _4, _4, _4, F4, F4, F4, F4],
      [_4, _4, _4, F4, F4, F4, _4, _4],
      [_4, _4, F4, F4, _4, _4, _4, _4]
    ],
    anchors: {},
    compatibleWith: ["smirk"],
    symmetric: false
  });
  var mouthTemplates = {
    8: [fangs8, grin8, smirk8],
    16: [fangs16, grin16, smirk16],
    32: [multiFangs32, wideGrin32, asymSmirk32]
  };

  // src/piximps/common/templates/accessories.ts
  var _5 = -1 /* AlwaysEmpty */;
  var F5 = 1 /* AlwaysFilled */;
  var P2 = 0 /* Probabilistic */;
  var tail8 = new Template({
    grid: [
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [F5, _5, _5, _5],
      [_5, F5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var wings8 = new Template({
    grid: [
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [F5, P2, _5, _5],
      [F5, F5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5],
      [_5, _5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var tail16 = new Template({
    grid: [
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [F5, _5, _5, _5, _5, _5, _5, _5],
      [_5, F5, _5, _5, _5, _5, _5, _5],
      [_5, _5, F5, _5, _5, _5, _5, _5],
      [_5, _5, F5, _5, _5, _5, _5, _5],
      [_5, F5, P2, _5, _5, _5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var wings16 = new Template({
    grid: [
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [F5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, _5, _5, _5, _5, _5, _5],
      [F5, F5, P2, _5, _5, _5, _5, _5],
      [F5, F5, F5, _5, _5, _5, _5, _5],
      [_5, F5, F5, _5, _5, _5, _5, _5],
      [_5, _5, F5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var tail32 = new Template({
    grid: [
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, F5, P2, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [P2, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var wings32 = new Template({
    grid: [
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, P2, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, F5, P2, P2, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [F5, P2, F5, P2, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, F5, F5, F5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, F5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, F5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, F5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5],
      [_5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5, _5]
    ],
    anchors: {},
    compatibleWith: [],
    symmetric: false
  });
  var accessoryTemplates = {
    tail: { 8: [tail8], 16: [tail16], 32: [tail32] },
    wings: { 8: [wings8], 16: [wings16], 32: [wings32] },
    weapon: { 8: [], 16: [], 32: [] },
    hat: { 8: [], 16: [], 32: [] }
  };

  // src/piximps/services/trait-extractor.ts
  var ACCESSORY_PRESENCE_THRESHOLD = 128;
  var ByteConsumer = class {
    constructor(bytes, startOffset = 12) {
      this.bytes = bytes;
      this.offset = startOffset;
    }
    next() {
      const value = this.bytes[this.offset % this.bytes.length];
      this.offset++;
      return value;
    }
    selectIndex(count) {
      if (count <= 0) return 0;
      return this.next() % count;
    }
    selectBool() {
      return this.next() >= ACCESSORY_PRESENCE_THRESHOLD;
    }
    nextBits(count) {
      const bits = [];
      for (let i = 0; i < count; i++) {
        bits.push((this.next() & 1 << i % 8) !== 0);
      }
      return bits;
    }
  };
  function extractTraits(bytes, gridSize) {
    const consumer = new ByteConsumer(bytes);
    const bodyCount = bodyTemplates[gridSize].length;
    const hornCount = hornTemplates[gridSize].length;
    const eyeCount = eyeTemplates[gridSize].length;
    const mouthCount = mouthTemplates[gridSize].length;
    const bodyIndex = consumer.selectIndex(bodyCount);
    const hornsIndex = consumer.selectIndex(hornCount);
    const eyesIndex = consumer.selectIndex(eyeCount);
    const mouthIndex = consumer.selectIndex(mouthCount);
    const accessoryTypes = ["tail", "wings", "weapon", "hat"];
    const accessoryIndices = {
      tail: null,
      wings: null,
      weapon: null,
      hat: null
    };
    for (const accType of accessoryTypes) {
      const isPresent = consumer.selectBool();
      const templates = accessoryTemplates[accType]?.[gridSize] ?? [];
      if (isPresent && templates.length > 0) {
        accessoryIndices[accType] = consumer.selectIndex(templates.length);
      } else {
        consumer.next();
      }
    }
    const symmetryBreakSide = consumer.next() % 2 === 0 ? "left" : "right";
    const probabilisticBits = consumer.nextBits(32);
    return new ImpTraits({
      bodyIndex,
      hornsIndex,
      eyesIndex,
      mouthIndex,
      accessoryIndices,
      probabilisticBits,
      symmetryBreakSide
    });
  }

  // src/piximps/services/layer-compositor.ts
  function createEmptyGrid(size) {
    const cells = [];
    const colors = [];
    for (let r = 0; r < size; r++) {
      cells.push(new Array(size).fill(0 /* Empty */));
      colors.push(new Array(size).fill(null));
    }
    return { cells, colors, width: size, height: size };
  }
  function colorForLayer(palette, layerType, cellType) {
    switch (layerType) {
      case "body":
        return cellType === 2 /* InnerBody */ ? palette.accent : palette.skin;
      case "eyes":
        return palette.glow;
      case "horns":
        return palette.secondary;
      case "mouth":
        return palette.skin;
      case "accessory":
        return palette.secondary;
    }
  }
  function stampTemplate(grid, template, anchorRow, anchorCol, layerType, palette, probabilisticBits, bitOffset) {
    for (let r = 0; r < template.height; r++) {
      for (let c = 0; c < template.width; c++) {
        const cell = template.grid[r][c];
        const targetRow = anchorRow + r;
        const targetCol = anchorCol + c;
        if (targetRow < 0 || targetRow >= grid.height) continue;
        if (targetCol < 0 || targetCol >= grid.width) continue;
        let shouldFill = false;
        let renderedType = 0 /* Empty */;
        switch (cell) {
          case -1 /* AlwaysEmpty */:
            continue;
          case 1 /* AlwaysFilled */:
            shouldFill = true;
            renderedType = 1 /* Body */;
            break;
          case 2 /* InnerBody */:
            shouldFill = true;
            renderedType = 2 /* InnerBody */;
            break;
          case 0 /* Probabilistic */: {
            const bit = probabilisticBits[bitOffset.value % probabilisticBits.length] ?? false;
            bitOffset.value++;
            shouldFill = bit;
            renderedType = 1 /* Body */;
            break;
          }
        }
        if (shouldFill) {
          grid.cells[targetRow][targetCol] = renderedType;
          grid.colors[targetRow][targetCol] = colorForLayer(palette, layerType, cell);
        }
      }
    }
    if (template.symmetric) {
      const centerCol = anchorCol + template.width - 1;
      for (let r = 0; r < template.height; r++) {
        for (let c = 0; c < template.width - 1; c++) {
          const sourceCol = anchorCol + c;
          const mirrorCol = centerCol + (template.width - 1 - c);
          const targetRow = anchorRow + r;
          if (targetRow < 0 || targetRow >= grid.height) continue;
          if (mirrorCol < 0 || mirrorCol >= grid.width) continue;
          if (grid.cells[targetRow][sourceCol] !== 0 /* Empty */) {
            grid.cells[targetRow][mirrorCol] = grid.cells[targetRow][sourceCol];
            grid.colors[targetRow][mirrorCol] = grid.colors[targetRow][sourceCol];
          }
        }
      }
    }
  }
  function composeLayers(input) {
    const grid = createEmptyGrid(input.gridSize);
    const bitOffset = { value: 0 };
    const bodyOffsetCol = Math.floor((input.gridSize - input.body.mirroredWidth) / 2);
    const bodyOffsetRow = Math.floor((input.gridSize - input.body.height) / 2);
    stampTemplate(grid, input.body, bodyOffsetRow, bodyOffsetCol, "body", input.palette, input.probabilisticBits, bitOffset);
    if (input.horns && input.body.anchors["horns"]) {
      const anchor = input.body.anchors["horns"];
      const hornRow = bodyOffsetRow + anchor.row - input.horns.height;
      const hornCol = bodyOffsetCol + anchor.columnStart;
      stampTemplate(grid, input.horns, hornRow, hornCol, "horns", input.palette, input.probabilisticBits, bitOffset);
    }
    if (input.eyes && input.body.anchors["eyes"]) {
      const anchor = input.body.anchors["eyes"];
      const eyeRow = bodyOffsetRow + anchor.row;
      const eyeCol = bodyOffsetCol + anchor.columnStart;
      stampTemplate(grid, input.eyes, eyeRow, eyeCol, "eyes", input.palette, input.probabilisticBits, bitOffset);
    }
    if (input.mouth && input.body.anchors["mouth"]) {
      const anchor = input.body.anchors["mouth"];
      const mouthRow = bodyOffsetRow + anchor.row;
      const mouthCol = bodyOffsetCol + anchor.columnStart;
      stampTemplate(grid, input.mouth, mouthRow, mouthCol, "mouth", input.palette, input.probabilisticBits, bitOffset);
    }
    for (const accessory of input.accessories) {
      const accCol = input.symmetryBreakSide === "left" ? 0 : input.gridSize - accessory.width;
      stampTemplate(grid, accessory, 0, accCol, "accessory", input.palette, input.probabilisticBits, bitOffset);
    }
    return grid;
  }

  // src/piximps/services/edge-detector.ts
  var DARKEN_FACTOR = 0.4;
  function darkenColor(color) {
    const multiplier = 1 - DARKEN_FACTOR;
    return [
      Math.round(color[0] * multiplier),
      Math.round(color[1] * multiplier),
      Math.round(color[2] * multiplier),
      color[3]
    ];
  }
  function isFilled(cellType) {
    return cellType !== 0 /* Empty */;
  }
  function hasEmptyNeighbor(cells, row, col, height, width) {
    if (row === 0 || row === height - 1 || col === 0 || col === width - 1) {
      return true;
    }
    const neighbors = [
      cells[row - 1][col],
      cells[row + 1][col],
      cells[row][col - 1],
      cells[row][col + 1]
    ];
    return neighbors.some((n) => !isFilled(n));
  }
  function detectEdges(grid) {
    const { cells, colors, width, height } = grid;
    const newCells = cells.map((row) => [...row]);
    const newColors = colors.map((row) => [...row]);
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (!isFilled(cells[r][c])) continue;
        if (hasEmptyNeighbor(cells, r, c, height, width)) {
          newCells[r][c] = 3 /* Edge */;
          if (colors[r][c]) {
            newColors[r][c] = darkenColor(colors[r][c]);
          }
        }
      }
    }
    return { cells: newCells, colors: newColors, width, height };
  }

  // src/piximps/entrypoints/renderers/to-rgba-buffer.ts
  function toRgbaBuffer(grid, outputSize) {
    const buffer = new Uint8Array(outputSize * outputSize * 4);
    const scale = outputSize / grid.width;
    for (let y = 0; y < outputSize; y++) {
      for (let x = 0; x < outputSize; x++) {
        const gridRow = Math.floor(y / scale);
        const gridCol = Math.floor(x / scale);
        const pixelOffset = (y * outputSize + x) * 4;
        const cell = grid.cells[gridRow]?.[gridCol];
        const color = grid.colors[gridRow]?.[gridCol];
        if (cell !== void 0 && cell !== 0 /* Empty */ && color) {
          buffer[pixelOffset] = color[0];
          buffer[pixelOffset + 1] = color[1];
          buffer[pixelOffset + 2] = color[2];
          buffer[pixelOffset + 3] = color[3];
        }
      }
    }
    return buffer;
  }

  // src/piximps/entrypoints/renderers/to-svg-string.ts
  function toSvgString(grid, outputSize) {
    const pixelSize = outputSize / grid.width;
    const rects = [];
    for (let r = 0; r < grid.height; r++) {
      for (let c = 0; c < grid.width; c++) {
        const cell = grid.cells[r][c];
        const color = grid.colors[r][c];
        if (cell === 0 /* Empty */ || !color) continue;
        const x = c * pixelSize;
        const y = r * pixelSize;
        rects.push(
          `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="rgb(${color[0]},${color[1]},${color[2]})" opacity="${color[3] / 255}"/>`
        );
      }
    }
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${outputSize}" height="${outputSize}" viewBox="0 0 ${outputSize} ${outputSize}">`,
      ...rects,
      "</svg>"
    ].join("\n");
  }

  // src/piximps/browser.ts
  var _ImpGenerator = class _ImpGenerator {
    constructor(options) {
      const grid = options?.grid ?? 16;
      const size = options?.size ?? 128;
      if (!_ImpGenerator.VALID_GRID_SIZES.includes(grid)) {
        throw new RangeError(`Grid size must be one of: ${_ImpGenerator.VALID_GRID_SIZES.join(", ")}`);
      }
      if (size <= 0 || size > _ImpGenerator.MAX_OUTPUT_SIZE) {
        throw new RangeError(`Output size must be between 1 and ${_ImpGenerator.MAX_OUTPUT_SIZE}`);
      }
      this.options = {
        size,
        grid,
        format: options?.format ?? "svg"
      };
    }
    getOptions() {
      return { ...this.options };
    }
    size(value) {
      return new _ImpGenerator({ ...this.options, size: value });
    }
    grid(value) {
      return new _ImpGenerator({ ...this.options, grid: value });
    }
    format(value) {
      return new _ImpGenerator({ ...this.options, format: value });
    }
    async generate(input) {
      const bytes = input !== void 0 ? hashToByteSequence(input) : crypto.getRandomValues(new Uint8Array(32));
      const palette = derivePalette(bytes);
      const traits = extractTraits(bytes, this.options.grid);
      const body = bodyTemplates[this.options.grid][traits.bodyIndex];
      if (!body) {
        throw new Error(`No body template at index ${traits.bodyIndex} for grid size ${this.options.grid}`);
      }
      const horns = hornTemplates[this.options.grid][traits.hornsIndex] ?? null;
      const eyes = eyeTemplates[this.options.grid][traits.eyesIndex] ?? null;
      const mouth = mouthTemplates[this.options.grid][traits.mouthIndex] ?? null;
      const accessories = [];
      const accessoryTypes = ["tail", "wings", "weapon", "hat"];
      for (const accType of accessoryTypes) {
        const idx = traits.accessoryIndices[accType];
        if (idx !== null) {
          const template = accessoryTemplates[accType]?.[this.options.grid]?.[idx];
          if (template) accessories.push(template);
        }
      }
      const composited = composeLayers({
        gridSize: this.options.grid,
        body,
        horns,
        eyes,
        mouth,
        accessories,
        palette,
        probabilisticBits: traits.probabilisticBits,
        symmetryBreakSide: traits.symmetryBreakSide
      });
      const edgeDetected = detectEdges(composited);
      switch (this.options.format) {
        case "buffer":
          return toRgbaBuffer(edgeDetected, this.options.size);
        case "svg":
          return toSvgString(edgeDetected, this.options.size);
      }
    }
  };
  _ImpGenerator.VALID_GRID_SIZES = [8, 16, 32];
  _ImpGenerator.MAX_OUTPUT_SIZE = 4096;
  var ImpGenerator = _ImpGenerator;
  return __toCommonJS(browser_exports);
})();
