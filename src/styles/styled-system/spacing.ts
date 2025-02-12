import { generatePXs, PxObject } from "./helpers";

const pxs = generatePXs(100) as PxObject<101>;

export const spacing = {
  "1/2": "50%",
  ...pxs,
};

export type Spacing = keyof typeof spacing;
