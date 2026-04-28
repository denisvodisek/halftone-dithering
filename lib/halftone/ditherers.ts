import type { DitherType } from "@/lib/halftone/types";

function applyErrorDiffusion(
  cellValues: Float32Array,
  numRows: number,
  numCols: number,
  matrix: number[][],
  centerColumn: number,
) {
  const threshold = 128;
  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      const index = row * numCols + col;
      const oldVal = cellValues[index];
      const newVal = oldVal < threshold ? 0 : 255;
      const error = oldVal - newVal;
      cellValues[index] = newVal;

      for (let mr = 0; mr < matrix.length; mr += 1) {
        for (let mc = 0; mc < matrix[mr].length; mc += 1) {
          const weight = matrix[mr][mc];
          if (weight === 0) {
            continue;
          }
          const targetCol = col + mc - centerColumn;
          const targetRow = row + mr;
          if (targetCol < 0 || targetCol >= numCols || targetRow >= numRows) {
            continue;
          }
          cellValues[targetRow * numCols + targetCol] += error * weight;
        }
      }
    }
  }
}

export function applyOrderedDithering(cellValues: Float32Array, numRows: number, numCols: number) {
  const bayerMatrix = [
    [0, 2],
    [3, 1],
  ];
  const matrixSize = 2;

  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      const index = row * numCols + col;
      const threshold =
        (bayerMatrix[row % matrixSize][col % matrixSize] + 0.5) * (255 / (matrixSize * matrixSize));
      cellValues[index] = cellValues[index] < threshold ? 0 : 255;
    }
  }
}

export function applyNoiseDithering(cellValues: Float32Array, numRows: number, numCols: number) {
  const threshold = 128;
  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      const index = row * numCols + col;
      const noise = (Math.random() - 0.5) * 50;
      const adjustedVal = cellValues[index] + noise;
      cellValues[index] = adjustedVal < threshold ? 0 : 255;
    }
  }
}

export function applyDithering(
  ditherType: DitherType,
  cellValues: Float32Array,
  numRows: number,
  numCols: number,
) {
  switch (ditherType) {
    case "FloydSteinberg":
      applyErrorDiffusion(
        cellValues,
        numRows,
        numCols,
        [
          [0, 0, 7 / 16],
          [3 / 16, 5 / 16, 1 / 16],
        ],
        1,
      );
      break;
    case "JarvisJudiceNinke":
      applyErrorDiffusion(
        cellValues,
        numRows,
        numCols,
        [
          [0, 0, 0, 7 / 48, 5 / 48],
          [3 / 48, 5 / 48, 7 / 48, 5 / 48, 3 / 48],
          [1 / 48, 3 / 48, 5 / 48, 3 / 48, 1 / 48],
        ],
        2,
      );
      break;
    case "Stucki":
      applyErrorDiffusion(
        cellValues,
        numRows,
        numCols,
        [
          [0, 0, 0, 8 / 42, 4 / 42],
          [2 / 42, 4 / 42, 8 / 42, 4 / 42, 2 / 42],
          [1 / 42, 2 / 42, 4 / 42, 2 / 42, 1 / 42],
        ],
        2,
      );
      break;
    case "Burkes":
      applyErrorDiffusion(
        cellValues,
        numRows,
        numCols,
        [
          [0, 0, 0, 8 / 32, 4 / 32],
          [2 / 32, 4 / 32, 8 / 32, 4 / 32, 2 / 32],
        ],
        2,
      );
      break;
    case "Ordered":
      applyOrderedDithering(cellValues, numRows, numCols);
      break;
    case "Noise":
      applyNoiseDithering(cellValues, numRows, numCols);
      break;
    default:
      break;
  }
}
