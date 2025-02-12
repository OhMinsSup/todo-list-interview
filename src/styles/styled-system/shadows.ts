export const shadows = {
  none: "none",

  todoBox:
    "0px 16px 32px 0px rgba(0, 0, 0, 0.12), 0px 0px 6px 0px rgba(0, 0, 0, 0.06)",

  // input
  input: "0 0 0 2px rgba(5,145,255,0.1)",

  // button
  buttonPrimary: "0 2px 0 rgba(5,145,255,0.1)",
  buttonDefault: "0 2px 0 rgba(0,0,0,0.02)",
};

export type Shadows = keyof typeof shadows;
