import { generatePXs, PxObject } from "./helpers";

const pxs = generatePXs(32) as PxObject<33>;

export const rounded = {
  full: "9999px",
  ...pxs,
};

export type Rounded = keyof typeof rounded;
