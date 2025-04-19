export const SUPPORTED_TOOLS = [
  "lock",
  "hand",
  "select",
  "rectangle",
  "diamond",
  "ellipse",
  "arrow",
  "line",
  "pencil",
];

export const TOOLS_WITH_MENU = SUPPORTED_TOOLS.slice(3);

export const STROKE_COLORS = [
  "black",
  "#d64545",
  "#4caf50",
  "#3f51b5",
  "#f29c1f",
];

export const BACKGROUND_COLORS = [
  "transparent",
  "#f8c1c1",
  "#c1f8c1",
  "#add8f7",
  "#fdf0a0",
];

export const FILL_STYLE_ENUM = {
  hachure: 1,
  cross_hatch: 2,
  solid: 3,
};

export const STROKE_WIDTH_ENUM = {
  thin: 1,
  bold: 2,
  extra_bold: 3,
};

export const STROKE_STYLE_ENUM = {
  solid: 1,
  dashed: 2,
  dotted: 3,
};

export const EDGES_STYLE_ENUM = {
  sharp: 1,
  round: 2,
};

export const ARROW_TYPE_ENUM = {
  sharp_arrow: 1,
  curved_arrow: 2,
  elbowed_arrow: 3,
};
