import type { PxObject } from "./helpers";
import { generatePXs } from "./helpers";

const pxs = generatePXs(72) as PxObject<72>;

export const fontSizes = {
  ...pxs,
};

export type FontSize = keyof typeof fontSizes;
