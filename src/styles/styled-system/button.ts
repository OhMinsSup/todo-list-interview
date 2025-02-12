export const button = {
  primary: "#fff",

  textColor: "rgba(0, 0, 0, 0.88)",
  textHoverColor: "rgba(0, 0, 0, 0.88)",
  textActiveColor: "rgba(0, 0, 0, 0.88)",
  textHoverBg: "rgba(0, 0, 0, 0.04)",

  // default
  defaultColor: "rgba(0, 0, 0, 0.88)",
  defaultBg: "#ffffff",
  defaultBorderColor: "#d9d9d9",
  defaultBorderColorDisabled: "#d9d9d9",
  defaultHoverBg: "#ffffff",
  defaultHoverColor: "#4096ff",
  defaultHoverBorderColor: "#4096ff",
  defaultActiveBg: "#ffffff",
  defaultActiveColor: "#0958d9",
  defaultActiveBorderColor: "#0958d9",

  // soild
  solidTextColor: "#fff",

  // disalbed
  borderColorDisabled: "#d9d9d9",
};

export type Button = keyof typeof button;
