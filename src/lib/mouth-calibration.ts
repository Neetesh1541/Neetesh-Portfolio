/**
 * Mouth overlay position + size, expressed as percentages of the profile image.
 *   leftPct / topPct  → center of the mouth
 *   widthPct / heightPct → resting size of the overlay
 *
 * Resolution priority (highest wins):
 *   1) User calibration saved in localStorage
 *   2) MediaPipe face-landmark detection cached in localStorage per image src
 *   3) Sensible default measured from the current profile photo
 */

export interface MouthBox {
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}

export const DEFAULT_MOUTH: MouthBox = {
  leftPct: 50,
  topPct: 18.6,
  widthPct: 6.2,
  heightPct: 1.8,
};

const CALIB_KEY = 'mouth_calibration_v1';
const DETECT_PREFIX = 'mouth_detected_v1:';

const safeRead = (key: string): MouthBox | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MouthBox;
    if (
      typeof parsed?.leftPct === 'number' &&
      typeof parsed?.topPct === 'number' &&
      typeof parsed?.widthPct === 'number' &&
      typeof parsed?.heightPct === 'number'
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const safeWrite = (key: string, box: MouthBox) => {
  try {
    localStorage.setItem(key, JSON.stringify(box));
  } catch {
    /* ignore */
  }
};

export const loadCalibration = () => safeRead(CALIB_KEY);
export const saveCalibration = (box: MouthBox) => safeWrite(CALIB_KEY, box);
export const clearCalibration = () => {
  try {
    localStorage.removeItem(CALIB_KEY);
  } catch {
    /* ignore */
  }
};

export const loadDetected = (imgSrc: string) => safeRead(DETECT_PREFIX + imgSrc);
export const saveDetected = (imgSrc: string, box: MouthBox) =>
  safeWrite(DETECT_PREFIX + imgSrc, box);

/**
 * Lazily loads MediaPipe FaceLandmarker and runs detection on the image.
 * Returns null on failure — callers should fall back to defaults/calibration.
 */
export const detectMouth = async (
  imageEl: HTMLImageElement
): Promise<MouthBox | null> => {
  try {
    const { FilesetResolver, FaceLandmarker } = await import(
      '@mediapipe/tasks-vision'
    );

    const fileset = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
    );

    const landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      },
      runningMode: 'IMAGE',
      numFaces: 1,
    });

    if (!imageEl.complete || imageEl.naturalWidth === 0) {
      await new Promise<void>((resolve) => {
        imageEl.onload = () => resolve();
        imageEl.onerror = () => resolve();
      });
    }

    const result = landmarker.detect(imageEl);
    landmarker.close();

    const face = result.faceLandmarks?.[0];
    if (!face || face.length < 400) return null;

    // FaceMesh landmark indices for the outer lip
    const leftCorner = face[61];
    const rightCorner = face[291];
    const upperLip = face[0];
    const lowerLip = face[17];

    if (!leftCorner || !rightCorner || !upperLip || !lowerLip) return null;

    const cx = ((leftCorner.x + rightCorner.x) / 2) * 100;
    const cy = ((upperLip.y + lowerLip.y) / 2) * 100;
    const w = Math.abs(rightCorner.x - leftCorner.x) * 100;
    const h = Math.abs(lowerLip.y - upperLip.y) * 100;

    // Guard rails against nonsense output
    if (w < 1 || w > 40 || h < 0.3 || h > 20) return null;

    return {
      leftPct: cx,
      topPct: cy,
      widthPct: w,
      heightPct: Math.max(h, 1.2),
    };
  } catch {
    return null;
  }
};
