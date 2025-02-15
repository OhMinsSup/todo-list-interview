import type { PxObject } from "./helpers";
import { generatePXs } from "./helpers";

const pxs = generatePXs(100) as PxObject<101>;

export const spacing = {
  ...pxs,
};

export type Spacing = keyof typeof spacing;
