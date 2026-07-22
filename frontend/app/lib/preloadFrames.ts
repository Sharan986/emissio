/**
 * Preloads a sequence of WebP frame images with batched concurrency.
 *
 * Loads frames in batches to avoid overwhelming the network.
 * Reports progress via callback for the loading screen.
 */

const TOTAL_FRAMES = 151;
const BATCH_SIZE = 8;

/** Generate the URL for a given frame index (1-based) */
function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/frames/frame_${padded}.webp`;
}

export interface PreloadOptions {
  onProgress?: (progress: number) => void;
}

export async function preloadFrames(
  options?: PreloadOptions
): Promise<HTMLImageElement[]> {
  const { onProgress } = options ?? {};
  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
  let loaded = 0;

  /** Load a single frame and store it at the correct index */
  const loadFrame = (index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(index + 1); // frames are 1-indexed
      img.onload = () => {
        images[index] = img;
        loaded++;
        onProgress?.(Math.round((loaded / TOTAL_FRAMES) * 100));
        resolve();
      };
      img.onerror = () => {
        // Still resolve to avoid blocking the entire sequence
        console.warn(`Failed to load frame ${index + 1}`);
        loaded++;
        onProgress?.(Math.round((loaded / TOTAL_FRAMES) * 100));
        resolve();
      };
    });
  };

  // Load in batches to control concurrency
  for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
    const batch = [];
    for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
      batch.push(loadFrame(j));
    }
    await Promise.all(batch);
  }

  return images;
}

export { TOTAL_FRAMES };
