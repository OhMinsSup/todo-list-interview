type GeneratedOpacityRange<
  T extends number,
  A extends string[] = [],
> = A["length"] extends T
  ? A[number]
  : GeneratedOpacityRange<
      T,
      [...A, `${A["length"] extends 0 ? "0" : `${A["length"]}`}`]
    >;

export type OpacityObject<T extends number> = T extends 0
  ? { "0": "0" }
  : { [K in GeneratedOpacityRange<T>]: K };

const opacities = Object.fromEntries(
  [...Array.from({ length: 101 }).keys()].map((i) => [`${i}`, `${i / 100}`]),
) as OpacityObject<101>;

export const opacity = {
  ...opacities,
};

export type Opacity = keyof typeof opacities;
