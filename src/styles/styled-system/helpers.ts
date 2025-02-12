export type GenerateRemRange<
  T extends number,
  A extends string[] = [],
> = A["length"] extends T
  ? A[number]
  : GenerateRemRange<
      T,
      [...A, `${A["length"] extends 0 ? "0" : `${A["length"]}rem`}`]
    >;

export type RemObject<T extends number> = T extends 0
  ? { "0": "0" }
  : { [K in GenerateRemRange<T>]: K };

export const generateREMs = (max: number) => {
  const lists = Object.fromEntries(
    [...Array.from({ length: max }).keys()].map((i) => [
      `${i}px`,
      `${i / 16}rem`,
    ]),
  );

  return {
    0: "0",
    ...lists,
  };
};

type GeneratePxRange<
  T extends number,
  A extends string[] = [],
> = A["length"] extends T
  ? A[number]
  : GeneratePxRange<
      T,
      [...A, `${A["length"] extends 0 ? "0" : `${A["length"]}px`}`]
    >;

export type PxObject<T extends number> = T extends 0
  ? { "0": "0" }
  : { [K in GeneratePxRange<T>]: K };

export const generatePXs = (max: number) => {
  const lists = Object.fromEntries(
    [...Array.from({ length: max }).keys()].map((i) => [`${i}px`, `${i}px`]),
  );

  return {
    "0": "0",
    ...lists,
  };
};
