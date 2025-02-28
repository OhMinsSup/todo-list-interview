import type { PxObject } from "./helpers";
import { generatePXs } from "./helpers";

const pxs = generatePXs(4) as PxObject<5>;

export const borderWidths = {
  ...pxs,
};

export type BorderWidth = keyof typeof borderWidths;
