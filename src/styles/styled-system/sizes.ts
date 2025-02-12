export const sizes = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",

  0: "0",
  full: "100%",
  none: "none",

  fit: "fit-content",
  min: "min-content",
  max: "max-content",
};

export type Size = keyof typeof sizes;
