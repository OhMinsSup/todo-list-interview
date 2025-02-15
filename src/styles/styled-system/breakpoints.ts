const breakpoints = [375, 768, 1024, 1440];

export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints[0]}px)`,
  md: `@media (min-width: ${breakpoints[1]}px)`,
  lg: `@media (min-width: ${breakpoints[2]}px)`,
  xl: `@media (min-width: ${breakpoints[3]}px)`,
};

export type MediaQueries = keyof typeof mediaQueries;
