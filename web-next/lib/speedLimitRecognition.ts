export type SpeedLimitBoundingBox = readonly [
  x: number,
  y: number,
  width: number,
  height: number,
];

export interface SpeedLimitRecognitionResult {
  isSpeedLimit: boolean;
  visualConfidence: number;
  speedLimitKmh?: number;
}

interface BinaryComponent {
  area: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface RingCandidate extends BinaryComponent {
  geometryConfidence: number;
  centerDarkRatio: number;
}

interface NormalizedGlyph {
  mask: Uint8Array;
  width: number;
  height: number;
  aspectRatio: number;
  holes: number;
}

interface DigitMatch {
  digit: string;
  confidence: number;
}

const MAX_ANALYSIS_SIDE = 320;
const MIN_ANALYSIS_SIDE = 96;
const GLYPH_WIDTH = 30;
const GLYPH_HEIGHT = 48;
const SPEED_VALUES = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
] as const;
const TEMPLATE_FONTS = [
  '"Arial Narrow"',
  '"Roboto Condensed"',
  '"Liberation Sans Narrow"',
  '"Franklin Gothic Medium"',
  'Arial',
  'Impact',
  'sans-serif',
] as const;
const TEMPLATE_WEIGHTS = [700, 800, 900] as const;

let digitTemplateCache: ReadonlyMap<string, readonly NormalizedGlyph[]> | null =
  null;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function ratioScore(value: number, ideal: number, tolerance: number): number {
  return clamp(1 - Math.abs(value - ideal) / tolerance, 0, 1);
}

function pixelIndex(x: number, y: number, width: number): number {
  return y * width + x;
}

function isRedPixel(
  pixels: Uint8ClampedArray,
  offset: number,
): boolean {
  const red = pixels[offset];
  const green = pixels[offset + 1];
  const blue = pixels[offset + 2];
  const strongestOther = Math.max(green, blue);
  const weakest = Math.min(red, green, blue);
  const saturation = red === 0 ? 0 : (red - weakest) / red;

  return (
    red >= 72 &&
    red - strongestOther >= 26 &&
    red >= green * 1.18 &&
    saturation >= 0.32
  );
}

function luminance(
  pixels: Uint8ClampedArray,
  offset: number,
): number {
  return (
    pixels[offset] * 0.299 +
    pixels[offset + 1] * 0.587 +
    pixels[offset + 2] * 0.114
  );
}

function isLightNeutralPixel(
  pixels: Uint8ClampedArray,
  offset: number,
): boolean {
  const red = pixels[offset];
  const green = pixels[offset + 1];
  const blue = pixels[offset + 2];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);

  return luminance(pixels, offset) >= 135 && maximum - minimum <= 58;
}

/**
 * Returns connected foreground regions. The implementation deliberately uses
 * an iterative flood fill so a large phone photo cannot overflow the call
 * stack.
 */
export function findBinaryComponents(
  mask: Uint8Array,
  width: number,
  height: number,
  eightConnected = true,
): BinaryComponent[] {
  const visited = new Uint8Array(mask.length);
  const components: BinaryComponent[] = [];
  const queue = new Int32Array(mask.length);
  const directions = eightConnected
    ? [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ]
    : [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1],
      ];

  for (let start = 0; start < mask.length; start += 1) {
    if (mask[start] === 0 || visited[start] !== 0) {
      continue;
    }

    let read = 0;
    let write = 1;
    let area = 0;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    queue[0] = start;
    visited[start] = 1;

    while (read < write) {
      const current = queue[read];
      read += 1;
      const x = current % width;
      const y = Math.floor(current / width);
      area += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      for (const [deltaX, deltaY] of directions) {
        const nextX = x + deltaX;
        const nextY = y + deltaY;
        if (
          nextX < 0 ||
          nextY < 0 ||
          nextX >= width ||
          nextY >= height
        ) {
          continue;
        }

        const next = pixelIndex(nextX, nextY, width);
        if (mask[next] === 0 || visited[next] !== 0) {
          continue;
        }

        visited[next] = 1;
        queue[write] = next;
        write += 1;
      }
    }

    components.push({ area, minX, minY, maxX, maxY });
  }

  return components;
}

function makeRedMask(imageData: ImageData): Uint8Array {
  const mask = new Uint8Array(imageData.width * imageData.height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = isRedPixel(imageData.data, index * 4) ? 1 : 0;
  }
  return mask;
}

function scoreRingCandidate(
  component: BinaryComponent,
  redMask: Uint8Array,
  imageData: ImageData,
): RingCandidate | null {
  const { width: imageWidth, height: imageHeight, data } = imageData;
  const ringWidth = component.maxX - component.minX + 1;
  const ringHeight = component.maxY - component.minY + 1;
  const shortSide = Math.min(ringWidth, ringHeight);
  const longSide = Math.max(ringWidth, ringHeight);
  const minimumSide = Math.min(imageWidth, imageHeight);

  if (
    shortSide < Math.max(18, minimumSide * 0.13) ||
    longSide > Math.max(imageWidth, imageHeight) * 0.98
  ) {
    return null;
  }

  const aspectRatio = shortSide / longSide;
  if (aspectRatio < 0.7) {
    return null;
  }

  const centerX = (component.minX + component.maxX + 1) / 2;
  const centerY = (component.minY + component.maxY + 1) / 2;
  const radiusX = ringWidth / 2;
  const radiusY = ringHeight / 2;
  const sectorRed = new Int32Array(24);
  const sectorTotal = new Int32Array(24);
  let bandRed = 0;
  let bandTotal = 0;
  let centerRed = 0;
  let centerDark = 0;
  let centerLightNeutral = 0;
  let centerTotal = 0;

  for (let y = component.minY; y <= component.maxY; y += 1) {
    for (let x = component.minX; x <= component.maxX; x += 1) {
      const normalizedX = (x + 0.5 - centerX) / radiusX;
      const normalizedY = (y + 0.5 - centerY) / radiusY;
      const radius = Math.hypot(normalizedX, normalizedY);
      const index = pixelIndex(x, y, imageWidth);
      const red = redMask[index] !== 0;

      if (radius >= 0.66 && radius <= 1.02) {
        let angle = Math.atan2(normalizedY, normalizedX);
        if (angle < 0) {
          angle += Math.PI * 2;
        }
        const sector = Math.min(
          sectorTotal.length - 1,
          Math.floor((angle / (Math.PI * 2)) * sectorTotal.length),
        );
        sectorTotal[sector] += 1;
        bandTotal += 1;
        if (red) {
          sectorRed[sector] += 1;
          bandRed += 1;
        }
      }

      if (radius <= 0.57) {
        const offset = index * 4;
        centerTotal += 1;
        if (red) {
          centerRed += 1;
        }
        if (luminance(data, offset) < 125) {
          centerDark += 1;
        }
        if (isLightNeutralPixel(data, offset)) {
          centerLightNeutral += 1;
        }
      }
    }
  }

  if (bandTotal === 0 || centerTotal === 0) {
    return null;
  }

  const bandRedRatio = bandRed / bandTotal;
  const centerRedRatio = centerRed / centerTotal;
  const centerDarkRatio = centerDark / centerTotal;
  const centerLightRatio = centerLightNeutral / centerTotal;
  let coveredSectors = 0;
  for (let sector = 0; sector < sectorTotal.length; sector += 1) {
    if (
      sectorTotal[sector] > 0 &&
      sectorRed[sector] / sectorTotal[sector] >= 0.3
    ) {
      coveredSectors += 1;
    }
  }
  const angularCoverage = coveredSectors / sectorTotal.length;
  const fillRatio = component.area / (ringWidth * ringHeight);

  // A red diagonal or cross inside the white field is characteristic of a
  // generic prohibition sign, not P.127.
  if (
    bandRedRatio < 0.31 ||
    angularCoverage < 0.67 ||
    centerRedRatio > 0.075 ||
    centerLightRatio < 0.35 ||
    centerDarkRatio < 0.015 ||
    centerDarkRatio > 0.38 ||
    fillRatio < 0.1 ||
    fillRatio > 0.5
  ) {
    return null;
  }

  const aspectScore = ratioScore(aspectRatio, 1, 0.3);
  const bandScore = ratioScore(bandRedRatio, 0.72, 0.48);
  const coverageScore = ratioScore(angularCoverage, 0.96, 0.3);
  const centerRedScore = ratioScore(centerRedRatio, 0, 0.075);
  const centerLightScore = ratioScore(centerLightRatio, 0.72, 0.42);
  const fillScore = ratioScore(fillRatio, 0.27, 0.2);
  const geometryConfidence = clamp(
    aspectScore * 0.15 +
      bandScore * 0.2 +
      coverageScore * 0.2 +
      centerRedScore * 0.2 +
      centerLightScore * 0.15 +
      fillScore * 0.1,
    0,
    1,
  );

  return {
    ...component,
    geometryConfidence,
    centerDarkRatio,
  };
}

function findBestRedRing(imageData: ImageData): RingCandidate | null {
  const redMask = makeRedMask(imageData);
  const minimumArea = imageData.width * imageData.height * 0.004;
  const candidates = findBinaryComponents(
    redMask,
    imageData.width,
    imageData.height,
  )
    .filter((component) => component.area >= minimumArea)
    .map((component) =>
      scoreRingCandidate(component, redMask, imageData),
    )
    .filter((candidate): candidate is RingCandidate => candidate !== null)
    .sort((left, right) => {
      const leftSize =
        (left.maxX - left.minX + 1) * (left.maxY - left.minY + 1);
      const rightSize =
        (right.maxX - right.minX + 1) * (right.maxY - right.minY + 1);
      return (
        right.geometryConfidence * Math.sqrt(rightSize) -
        left.geometryConfidence * Math.sqrt(leftSize)
      );
    });

  return candidates[0] ?? null;
}

function otsuThreshold(histogram: Uint32Array, sampleCount: number): number {
  let totalIntensity = 0;
  for (let intensity = 0; intensity < histogram.length; intensity += 1) {
    totalIntensity += intensity * histogram[intensity];
  }

  let backgroundWeight = 0;
  let backgroundIntensity = 0;
  let bestVariance = -1;
  let bestThreshold = 105;

  for (let threshold = 0; threshold < histogram.length; threshold += 1) {
    backgroundWeight += histogram[threshold];
    if (backgroundWeight === 0) {
      continue;
    }

    const foregroundWeight = sampleCount - backgroundWeight;
    if (foregroundWeight === 0) {
      break;
    }

    backgroundIntensity += threshold * histogram[threshold];
    const backgroundMean = backgroundIntensity / backgroundWeight;
    const foregroundMean =
      (totalIntensity - backgroundIntensity) / foregroundWeight;
    const difference = backgroundMean - foregroundMean;
    const variance =
      backgroundWeight * foregroundWeight * difference * difference;
    if (variance > bestVariance) {
      bestVariance = variance;
      bestThreshold = threshold;
    }
  }

  return clamp(bestThreshold, 65, 155);
}

function createDigitMask(
  imageData: ImageData,
  ring: RingCandidate,
): {
  mask: Uint8Array;
  components: BinaryComponent[];
  hasExtraMark: boolean;
  ringWidth: number;
  ringHeight: number;
} {
  const ringWidth = ring.maxX - ring.minX + 1;
  const ringHeight = ring.maxY - ring.minY + 1;
  const centerX = (ring.minX + ring.maxX + 1) / 2;
  const centerY = (ring.minY + ring.maxY + 1) / 2;
  const radiusX = ringWidth / 2;
  const radiusY = ringHeight / 2;
  const histogram = new Uint32Array(256);
  let sampleCount = 0;

  for (let y = ring.minY; y <= ring.maxY; y += 1) {
    for (let x = ring.minX; x <= ring.maxX; x += 1) {
      const normalizedX = (x + 0.5 - centerX) / radiusX;
      const normalizedY = (y + 0.5 - centerY) / radiusY;
      if (Math.hypot(normalizedX, normalizedY) > 0.6) {
        continue;
      }
      const offset = pixelIndex(x, y, imageData.width) * 4;
      const gray = Math.round(luminance(imageData.data, offset));
      histogram[gray] += 1;
      sampleCount += 1;
    }
  }

  const threshold = otsuThreshold(histogram, sampleCount);
  const mask = new Uint8Array(ringWidth * ringHeight);
  for (let localY = 0; localY < ringHeight; localY += 1) {
    for (let localX = 0; localX < ringWidth; localX += 1) {
      const normalizedX = (localX + 0.5 - ringWidth / 2) / (ringWidth / 2);
      const normalizedY =
        (localY + 0.5 - ringHeight / 2) / (ringHeight / 2);
      if (Math.hypot(normalizedX, normalizedY) > 0.61) {
        continue;
      }

      const sourceX = ring.minX + localX;
      const sourceY = ring.minY + localY;
      const sourceOffset =
        pixelIndex(sourceX, sourceY, imageData.width) * 4;
      const dark =
        luminance(imageData.data, sourceOffset) <= threshold &&
        !isRedPixel(imageData.data, sourceOffset);
      mask[pixelIndex(localX, localY, ringWidth)] = dark ? 1 : 0;
    }
  }

  const rawComponents = findBinaryComponents(mask, ringWidth, ringHeight);
  const components = rawComponents
    .filter((component) => {
      const width = component.maxX - component.minX + 1;
      const height = component.maxY - component.minY + 1;
      const centerYOfComponent = (component.minY + component.maxY + 1) / 2;
      return (
        height >= ringHeight * 0.27 &&
        height <= ringHeight * 0.72 &&
        width >= Math.max(2, ringWidth * 0.018) &&
        width <= ringWidth * 0.35 &&
        component.area >= ringWidth * ringHeight * 0.002 &&
        Math.abs(centerYOfComponent - ringHeight / 2) <= ringHeight * 0.16
      );
    })
    .sort((left, right) => left.minX - right.minX);

  const selectedComponents = new Set(components);
  const hasExtraMark = rawComponents.some((component) => {
    if (selectedComponents.has(component)) {
      return false;
    }
    const width = component.maxX - component.minX + 1;
    const height = component.maxY - component.minY + 1;
    const centerXOfComponent = (component.minX + component.maxX + 1) / 2;
    const centerYOfComponent = (component.minY + component.maxY + 1) / 2;

    // P.115/P.117 contain a unit (T, m) or punctuation next to otherwise
    // plausible digits. Treat a sizeable unaligned mark in the inner field as
    // a hard rejection instead of silently reading just the leading number.
    return (
      height >= ringHeight * 0.11 &&
      width >= ringWidth * 0.012 &&
      component.area >= ringWidth * ringHeight * 0.001 &&
      centerXOfComponent >= ringWidth * 0.12 &&
      centerXOfComponent <= ringWidth * 0.88 &&
      Math.abs(centerYOfComponent - ringHeight / 2) <= ringHeight * 0.3
    );
  });

  return { mask, components, hasExtraMark, ringWidth, ringHeight };
}

function cropComponentMask(
  sourceMask: Uint8Array,
  sourceWidth: number,
  component: BinaryComponent,
): {
  mask: Uint8Array;
  width: number;
  height: number;
} {
  const width = component.maxX - component.minX + 1;
  const height = component.maxY - component.minY + 1;
  const result = new Uint8Array(width * height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      result[pixelIndex(x, y, width)] =
        sourceMask[
          pixelIndex(component.minX + x, component.minY + y, sourceWidth)
        ];
    }
  }

  return { mask: result, width, height };
}

function countHoles(mask: Uint8Array, width: number, height: number): number {
  const inverse = new Uint8Array(mask.length);
  for (let index = 0; index < mask.length; index += 1) {
    inverse[index] = mask[index] === 0 ? 1 : 0;
  }

  return findBinaryComponents(inverse, width, height, false).filter(
    (component) =>
      component.minX > 0 &&
      component.minY > 0 &&
      component.maxX < width - 1 &&
      component.maxY < height - 1 &&
      component.area >= 3,
  ).length;
}

function normalizeGlyph(
  sourceMask: Uint8Array,
  sourceWidth: number,
  sourceHeight: number,
): NormalizedGlyph {
  const mask = new Uint8Array(GLYPH_WIDTH * GLYPH_HEIGHT);
  const padding = 2;
  const targetWidth = GLYPH_WIDTH - padding * 2;
  const targetHeight = GLYPH_HEIGHT - padding * 2;

  for (let y = 0; y < targetHeight; y += 1) {
    const sourceY = clamp(
      Math.floor(((y + 0.5) / targetHeight) * sourceHeight),
      0,
      sourceHeight - 1,
    );
    for (let x = 0; x < targetWidth; x += 1) {
      const sourceX = clamp(
        Math.floor(((x + 0.5) / targetWidth) * sourceWidth),
        0,
        sourceWidth - 1,
      );
      mask[pixelIndex(x + padding, y + padding, GLYPH_WIDTH)] =
        sourceMask[pixelIndex(sourceX, sourceY, sourceWidth)];
    }
  }

  return {
    mask,
    width: GLYPH_WIDTH,
    height: GLYPH_HEIGHT,
    aspectRatio: sourceWidth / sourceHeight,
    holes: countHoles(mask, GLYPH_WIDTH, GLYPH_HEIGHT),
  };
}

function foregroundBounds(
  mask: Uint8Array,
  width: number,
  height: number,
): BinaryComponent | null {
  let area = 0;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (mask[pixelIndex(x, y, width)] === 0) {
        continue;
      }
      area += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  return area === 0 ? null : { area, minX, minY, maxX, maxY };
}

function renderDigitTemplate(
  digit: string,
  font: string,
  weight: number,
): NormalizedGlyph | null {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 136;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return null;
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
  context.font = `${weight} 112px ${font}`;
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.fillText(digit, canvas.width / 2, 116);
  const rendered = context.getImageData(0, 0, canvas.width, canvas.height);
  const mask = new Uint8Array(canvas.width * canvas.height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = luminance(rendered.data, index * 4) < 128 ? 1 : 0;
  }
  const bounds = foregroundBounds(mask, canvas.width, canvas.height);
  if (!bounds) {
    return null;
  }
  const cropped = cropComponentMask(mask, canvas.width, bounds);
  return normalizeGlyph(cropped.mask, cropped.width, cropped.height);
}

function getDigitTemplates(): ReadonlyMap<
  string,
  readonly NormalizedGlyph[]
> {
  if (digitTemplateCache) {
    return digitTemplateCache;
  }

  const templates = new Map<string, NormalizedGlyph[]>();
  for (let digit = 0; digit <= 9; digit += 1) {
    const rendered: NormalizedGlyph[] = [];
    for (const font of TEMPLATE_FONTS) {
      for (const weight of TEMPLATE_WEIGHTS) {
        const template = renderDigitTemplate(String(digit), font, weight);
        if (template) {
          rendered.push(template);
        }
      }
    }
    templates.set(String(digit), rendered);
  }
  digitTemplateCache = templates;
  return digitTemplateCache;
}

function distanceTransform(
  mask: Uint8Array,
  width: number,
  height: number,
): Float32Array {
  const diagonal = Math.SQRT2;
  const distances = new Float32Array(mask.length);
  for (let index = 0; index < mask.length; index += 1) {
    distances[index] = mask[index] === 0 ? 1_000 : 0;
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = pixelIndex(x, y, width);
      let distance = distances[index];
      if (x > 0) {
        distance = Math.min(distance, distances[index - 1] + 1);
      }
      if (y > 0) {
        distance = Math.min(distance, distances[index - width] + 1);
        if (x > 0) {
          distance = Math.min(
            distance,
            distances[index - width - 1] + diagonal,
          );
        }
        if (x + 1 < width) {
          distance = Math.min(
            distance,
            distances[index - width + 1] + diagonal,
          );
        }
      }
      distances[index] = distance;
    }
  }

  for (let y = height - 1; y >= 0; y -= 1) {
    for (let x = width - 1; x >= 0; x -= 1) {
      const index = pixelIndex(x, y, width);
      let distance = distances[index];
      if (x + 1 < width) {
        distance = Math.min(distance, distances[index + 1] + 1);
      }
      if (y + 1 < height) {
        distance = Math.min(distance, distances[index + width] + 1);
        if (x > 0) {
          distance = Math.min(
            distance,
            distances[index + width - 1] + diagonal,
          );
        }
        if (x + 1 < width) {
          distance = Math.min(
            distance,
            distances[index + width + 1] + diagonal,
          );
        }
      }
      distances[index] = distance;
    }
  }

  return distances;
}

function compareGlyphs(
  observed: NormalizedGlyph,
  template: NormalizedGlyph,
): number {
  const observedDistance = distanceTransform(
    observed.mask,
    observed.width,
    observed.height,
  );
  const templateDistance = distanceTransform(
    template.mask,
    template.width,
    template.height,
  );
  let observedCount = 0;
  let templateCount = 0;
  let observedToTemplate = 0;
  let templateToObserved = 0;
  let intersection = 0;
  let union = 0;

  for (let index = 0; index < observed.mask.length; index += 1) {
    const isObserved = observed.mask[index] !== 0;
    const isTemplate = template.mask[index] !== 0;
    if (isObserved) {
      observedCount += 1;
      observedToTemplate += templateDistance[index];
    }
    if (isTemplate) {
      templateCount += 1;
      templateToObserved += observedDistance[index];
    }
    if (isObserved && isTemplate) {
      intersection += 1;
    }
    if (isObserved || isTemplate) {
      union += 1;
    }
  }

  if (observedCount === 0 || templateCount === 0 || union === 0) {
    return 0;
  }

  const chamfer =
    (observedToTemplate / observedCount +
      templateToObserved / templateCount) /
    2;
  const chamferScore = Math.exp(-chamfer * 0.55);
  const overlapScore = intersection / union;
  const aspectDifference = Math.abs(
    Math.log(
      Math.max(0.05, observed.aspectRatio) /
        Math.max(0.05, template.aspectRatio),
    ),
  );
  const aspectScore = Math.exp(-aspectDifference * 1.35);
  const holePenalty =
    observed.holes === template.holes
      ? 1
      : Math.abs(observed.holes - template.holes) === 1
        ? 0.55
        : 0.25;

  return clamp(
    (chamferScore * 0.5 + overlapScore * 0.3 + aspectScore * 0.2) *
      holePenalty,
    0,
    1,
  );
}

function recognizeDigit(glyph: NormalizedGlyph): DigitMatch[] {
  const matches: DigitMatch[] = [];
  for (const [digit, templates] of getDigitTemplates()) {
    let best = 0;
    for (const template of templates) {
      best = Math.max(best, compareGlyphs(glyph, template));
    }
    matches.push({ digit, confidence: best });
  }
  return matches.sort((left, right) => right.confidence - left.confidence);
}

function analyzeDigits(
  imageData: ImageData,
  ring: RingCandidate,
): {
  confidence: number;
  speedLimitKmh?: number;
  layoutConfidence: number;
} {
  const { mask, components, hasExtraMark, ringWidth, ringHeight } =
    createDigitMask(imageData, ring);
  if (hasExtraMark || components.length < 2 || components.length > 3) {
    return { confidence: 0, layoutConfidence: 0 };
  }

  const componentHeights = components.map(
    (component) => component.maxY - component.minY + 1,
  );
  const tallest = Math.max(...componentHeights);
  const shortest = Math.min(...componentHeights);
  const tops = components.map((component) => component.minY);
  const bottoms = components.map((component) => component.maxY);
  const alignmentSpread =
    (Math.max(...tops) -
      Math.min(...tops) +
      Math.max(...bottoms) -
      Math.min(...bottoms)) /
    (ringHeight * 2);
  const heightConsistency = shortest / Math.max(1, tallest);
  const sequenceLeft = components[0].minX;
  const sequenceRight = components[components.length - 1].maxX;
  const sequenceCenter = (sequenceLeft + sequenceRight + 1) / 2;
  const horizontalCentering = ratioScore(
    Math.abs(sequenceCenter - ringWidth / 2) / ringWidth,
    0,
    0.16,
  );
  const layoutConfidence = clamp(
    heightConsistency * 0.45 +
      ratioScore(alignmentSpread, 0, 0.18) * 0.3 +
      horizontalCentering * 0.25,
    0,
    1,
  );

  if (heightConsistency < 0.62 || alignmentSpread > 0.22) {
    return { confidence: 0, layoutConfidence };
  }

  const digitMatches = components.map((component) => {
    const cropped = cropComponentMask(mask, ringWidth, component);
    return recognizeDigit(
      normalizeGlyph(cropped.mask, cropped.width, cropped.height),
    );
  });

  let bestSpeed: number | undefined;
  let bestScore = 0;
  let secondBestScore = 0;
  for (const speed of SPEED_VALUES) {
    const digits = String(speed);
    if (digits.length !== digitMatches.length) {
      continue;
    }

    let score = 0;
    for (let index = 0; index < digits.length; index += 1) {
      const match = digitMatches[index].find(
        (candidate) => candidate.digit === digits[index],
      );
      score += match?.confidence ?? 0;
    }
    score /= digits.length;

    if (score > bestScore) {
      secondBestScore = bestScore;
      bestScore = score;
      bestSpeed = speed;
    } else if (score > secondBestScore) {
      secondBestScore = score;
    }
  }

  const margin = bestScore - secondBestScore;
  const marginConfidence = clamp(margin / 0.12, 0, 1);
  const confidence = clamp(
    bestScore * 0.7 + layoutConfidence * 0.2 + marginConfidence * 0.1,
    0,
    1,
  );

  if (
    bestSpeed === undefined ||
    bestScore < 0.49 ||
    confidence < 0.56 ||
    layoutConfidence < 0.58
  ) {
    return { confidence, layoutConfidence };
  }

  return {
    confidence,
    speedLimitKmh: bestSpeed,
    layoutConfidence,
  };
}

/**
 * Pure pixel-level entry point used by the browser wrapper and by regression
 * tests. The supplied ImageData should contain the candidate box, not the
 * complete camera frame.
 */
export function analyzeSpeedLimitImageData(
  imageData: ImageData,
): SpeedLimitRecognitionResult {
  const ring = findBestRedRing(imageData);
  if (!ring) {
    return { isSpeedLimit: false, visualConfidence: 0 };
  }

  const digits = analyzeDigits(imageData, ring);
  const visualConfidence = clamp(
    ring.geometryConfidence * 0.58 + digits.confidence * 0.42,
    0,
    1,
  );
  const isSpeedLimit =
    ring.geometryConfidence >= 0.58 &&
    digits.speedLimitKmh !== undefined &&
    digits.confidence >= 0.56 &&
    visualConfidence >= 0.6;

  return {
    isSpeedLimit,
    visualConfidence,
    ...(isSpeedLimit && digits.speedLimitKmh !== undefined
      ? { speedLimitKmh: digits.speedLimitKmh }
      : {}),
  };
}

/**
 * Conservatively verifies whether a YOLO candidate is a Vietnamese P.127
 * speed-limit sign and, when legible, reads its numeric limit.
 */
export function analyzeSpeedLimitCandidate(
  image: HTMLImageElement,
  bbox: SpeedLimitBoundingBox,
): SpeedLimitRecognitionResult {
  const naturalWidth = image.naturalWidth || image.width;
  const naturalHeight = image.naturalHeight || image.height;
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    return { isSpeedLimit: false, visualConfidence: 0 };
  }

  const [rawX, rawY, rawWidth, rawHeight] = bbox;
  if (
    ![rawX, rawY, rawWidth, rawHeight].every(Number.isFinite) ||
    rawWidth <= 1 ||
    rawHeight <= 1
  ) {
    return { isSpeedLimit: false, visualConfidence: 0 };
  }

  const paddingX = rawWidth * 0.06;
  const paddingY = rawHeight * 0.06;
  const sourceX = clamp(Math.floor(rawX - paddingX), 0, naturalWidth - 1);
  const sourceY = clamp(Math.floor(rawY - paddingY), 0, naturalHeight - 1);
  const sourceRight = clamp(
    Math.ceil(rawX + rawWidth + paddingX),
    sourceX + 1,
    naturalWidth,
  );
  const sourceBottom = clamp(
    Math.ceil(rawY + rawHeight + paddingY),
    sourceY + 1,
    naturalHeight,
  );
  const sourceWidth = sourceRight - sourceX;
  const sourceHeight = sourceBottom - sourceY;
  const longestSide = Math.max(sourceWidth, sourceHeight);
  const scale = clamp(
    MAX_ANALYSIS_SIDE / longestSide,
    Math.min(1, MIN_ANALYSIS_SIDE / longestSide),
    1,
  );
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(sourceWidth * scale));
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return { isSpeedLimit: false, visualConfidence: 0 };
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return analyzeSpeedLimitImageData(
    context.getImageData(0, 0, canvas.width, canvas.height),
  );
}

// Kept as a descriptive alias for callers that prefer an imperative name.
export const recognizeSpeedLimitCandidate = analyzeSpeedLimitCandidate;
