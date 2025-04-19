import canvas from "./canvas.js";
import {
  ARROW_TYPE_ENUM,
  BACKGROUND_COLORS_ENUM,
  EDGES_STYLE_ENUM,
  FILL_STYLE_ENUM,
  STROKE_COLORS_ENUM,
  STROKE_STYLE_ENUM,
  STROKE_WIDTH_ENUM,
  TOOLS_WITH_MENU,
} from "./config.js";
import { ARROWS_SVGs } from "./html-elements.js";

/**
 * A map of selected style configurations for drawing elements.
 * @typedef {Map<
 *   "selectedStrokeColor" |
 *   "selectedBackgroundColor" |
 *   "selectedFillStyle" |
 *   "selectedStrokeWidth" |
 *   "selectedStrokeStyle" |
 *   "selectedEdgeStyle" |
 *   "selectedArrowType",
 *   any
 * >} StyleMap
 */

const menuContainerElement = document.querySelector(".menu__container");

/** @type {StyleMap} */
const selectedStyleMap = new Map([
  ["selectedStrokeColor", STROKE_COLORS_ENUM.englishVermillion],
  ["selectedBackgroundColor", BACKGROUND_COLORS_ENUM.transparent],
  ["selectedFillStyle", FILL_STYLE_ENUM.hachure],
  ["selectedStrokeWidth", STROKE_WIDTH_ENUM.thin],
  ["selectedStrokeStyle", STROKE_STYLE_ENUM.solid],
  ["selectedEdgeStyle", EDGES_STYLE_ENUM.sharp],
  ["selectedArrowType", ARROW_TYPE_ENUM.sharp_arrow],
]);
console.log(selectedStyleMap);

document.querySelectorAll('input[name="tool"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    if (e.target.checked) {
      const toolName = e.target.value;
      canvas.setSelectedTool(toolName);
      renderToolMenu(toolName);
    }
  });
});

/**
 * @param {"lock" | "hand" | "select" | "rectangle" | "diamond" | "ellipse" | "arrow" | "line" | "pencil"} toolName
 */
export const renderToolMenu = (toolName) => {
  clearToolMenu();
  if (TOOLS_WITH_MENU.includes(toolName)) {
    switch (toolName) {
      case "rectangle":
      case "diamond":
        renderMenuStrokeRow();
        renderMenuBackgroundRow();
        renderMenuFillRow();
        renderMenuStrokeWidthRow();
        renderMenuStrokeStyleRow();
        renderMenuEdgesRow();
        break;

      case "ellipse":
        renderMenuStrokeRow();
        renderMenuBackgroundRow();
        renderMenuFillRow();
        renderMenuStrokeWidthRow();
        renderMenuStrokeStyleRow();
        break;

      case "arrow":
        renderMenuStrokeRow();
        renderMenuStrokeWidthRow();
        renderMenuStrokeStyleRow();
        renderMenuArrowTypeRow();
        break;

      case "line":
        renderMenuStrokeRow();
        renderMenuStrokeWidthRow();
        renderMenuStrokeStyleRow();
        renderMenuEdgesRow();
        break;

      default:
        clearToolMenu();
        break;
    }

    renderMenuOpacityRow();
    showToolMenu();
  } else {
    clearToolMenu();
    hideToolMenu();
  }
};

const clearToolMenu = () => {
  menuContainerElement.innerHTML = "";
};

const showToolMenu = () => {
  menuContainerElement.style.display = "block";
};

const hideToolMenu = () => {
  menuContainerElement.style.display = "none";
};

const renderMenuStrokeRow = () => {
  const menuSection = document.createElement("div");
  menuSection.className = "menu-section";

  const title = document.createElement("div");
  title.className = "section-title";
  title.textContent = "Stroke";

  const options = document.createElement("div");
  options.className = "options";

  [...Object.values(STROKE_COLORS_ENUM)].forEach((color) => {
    const option = document.createElement("div");
    option.className = "option stroke";
    option.style.color = color;
    if (color === selectedStyleMap.get("selectedStrokeColor")) {
      option.classList.add("selected");
    }
    options.appendChild(option);
  });

  menuSection.appendChild(title);
  menuSection.appendChild(options);

  menuContainerElement.append(menuSection);
};

const renderMenuBackgroundRow = () => {
  const backgroundSection = document.createElement("div");
  backgroundSection.className = "menu-section";

  const bgTitle = document.createElement("div");
  bgTitle.className = "section-title";
  bgTitle.textContent = "Background";

  const bgOptions = document.createElement("div");
  bgOptions.className = "options";

  [...Object.values(BACKGROUND_COLORS_ENUM)].forEach((color) => {
    const option = document.createElement("div");
    option.className = "option background";
    if (color === "transparent") option.classList.add("transparent");
    if (color === selectedStyleMap.get("selectedBackgroundColor"))
      option.classList.add("selected");
    if (color !== "transparent") option.style.color = color;
    bgOptions.appendChild(option);
  });

  backgroundSection.appendChild(bgTitle);
  backgroundSection.appendChild(bgOptions);

  menuContainerElement.append(backgroundSection);
};

const renderMenuFillRow = () => {
  const fillSection = document.createElement("div");
  fillSection.className = "menu-section";

  const fillTitle = document.createElement("div");
  fillTitle.className = "section-title";
  fillTitle.textContent = "Fill";

  const fillOptions = document.createElement("div");
  fillOptions.className = "options";

  Object.keys(FILL_STYLE_ENUM).forEach((fillStyle) => {
    const option = document.createElement("div");
    option.className = "option";
    if (
      FILL_STYLE_ENUM[fillStyle] === selectedStyleMap.get("selectedFillStyle")
    )
      option.classList.add("selected");

    const fillIcon = document.createElement("div");
    fillIcon.className = `fill-icon fill-${fillStyle}`;

    option.appendChild(fillIcon);
    fillOptions.appendChild(option);
  });

  fillSection.appendChild(fillTitle);
  fillSection.appendChild(fillOptions);

  menuContainerElement.append(fillSection);
};

const renderMenuStrokeWidthRow = () => {
  const strokeWidthSection = document.createElement("div");
  strokeWidthSection.className = "menu-section";

  const strokeWidthTitle = document.createElement("div");
  strokeWidthTitle.className = "section-title";
  strokeWidthTitle.textContent = "Stroke width";

  const strokeWidthOptions = document.createElement("div");
  strokeWidthOptions.className = "options";

  Object.keys(STROKE_WIDTH_ENUM).forEach((strokeWidth) => {
    const option = document.createElement("div");
    option.className = "option";
    if (
      STROKE_WIDTH_ENUM[strokeWidth] ===
      selectedStyleMap.get("selectedStrokeWidth")
    )
      option.classList.add("selected");

    const icon = document.createElement("div");
    icon.className = `stroke-width-icon stroke-width-${strokeWidth}`;

    option.appendChild(icon);
    strokeWidthOptions.appendChild(option);
  });

  strokeWidthSection.appendChild(strokeWidthTitle);
  strokeWidthSection.appendChild(strokeWidthOptions);

  menuContainerElement.append(strokeWidthSection);
};

const renderMenuStrokeStyleRow = () => {
  const strokeStyleSection = document.createElement("div");
  strokeStyleSection.className = "menu-section";

  const strokeStyleTitle = document.createElement("div");
  strokeStyleTitle.className = "section-title";
  strokeStyleTitle.textContent = "Stroke style";

  const strokeStyleOptions = document.createElement("div");
  strokeStyleOptions.className = "options";

  Object.keys(STROKE_STYLE_ENUM).forEach((strokeStyle) => {
    const option = document.createElement("div");
    option.className = "option";
    if (
      STROKE_STYLE_ENUM[strokeStyle] ===
      selectedStyleMap.get("selectedStrokeStyle")
    )
      option.classList.add("selected");

    const icon = document.createElement("div");
    icon.className = `stroke-style-${strokeStyle}`;

    option.appendChild(icon);
    strokeStyleOptions.appendChild(option);
  });

  strokeStyleSection.appendChild(strokeStyleTitle);
  strokeStyleSection.appendChild(strokeStyleOptions);

  menuContainerElement.append(strokeStyleSection);
};

const renderMenuArrowTypeRow = () => {
  const arrowSection = document.createElement("div");
  arrowSection.className = "menu-section";

  const arrowTitle = document.createElement("div");
  arrowTitle.className = "section-title";
  arrowTitle.textContent = "Arrow type";

  const arrowOptions = document.createElement("div");
  arrowOptions.className = "options";

  Object.keys(ARROW_TYPE_ENUM).forEach((arrowType) => {
    const option = document.createElement("div");
    option.className = "option";
    if (
      ARROW_TYPE_ENUM[arrowType] === selectedStyleMap.get("selectedArrowType")
    )
      option.classList.add("selected");

    option.innerHTML = ARROWS_SVGs[ARROW_TYPE_ENUM[arrowType]];
    arrowOptions.appendChild(option);
  });

  arrowSection.appendChild(arrowTitle);
  arrowSection.appendChild(arrowOptions);

  menuContainerElement.append(arrowSection);
};

const renderMenuEdgesRow = () => {
  const edgeSection = document.createElement("div");
  edgeSection.className = "menu-section";

  const edgeTitle = document.createElement("div");
  edgeTitle.className = "section-title";
  edgeTitle.textContent = "Edges";

  const edgeOptions = document.createElement("div");
  edgeOptions.className = "options";

  Object.keys(EDGES_STYLE_ENUM).forEach((edge) => {
    const option = document.createElement("div");
    option.className = "option";
    if (EDGES_STYLE_ENUM[edge] === selectedStyleMap.get("selectedEdgeStyle"))
      option.classList.add("selected");

    const icon = document.createElement("div");
    icon.className = `edge-icon edge-${edge}`;

    option.appendChild(icon);
    edgeOptions.appendChild(option);
  });

  edgeSection.appendChild(edgeTitle);
  edgeSection.appendChild(edgeOptions);

  menuContainerElement.append(edgeSection);
};

const renderMenuOpacityRow = () => {
  const opacitySection = document.createElement("div");
  opacitySection.className = "menu-section";

  const sectionTitle = document.createElement("div");
  sectionTitle.className = "section-title";
  sectionTitle.textContent = "Opacity";
  opacitySection.appendChild(sectionTitle);

  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";
  opacitySection.appendChild(sliderContainer);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "100";
  slider.value = "100";
  slider.className = "slider";
  slider.id = "opacitySlider";
  sliderContainer.appendChild(slider);

  const sliderValues = document.createElement("div");
  sliderValues.className = "slider-values";
  sliderContainer.appendChild(sliderValues);

  const minValue = document.createElement("span");
  minValue.textContent = "0";
  sliderValues.appendChild(minValue);

  const maxValue = document.createElement("span");
  maxValue.textContent = "100";
  sliderValues.appendChild(maxValue);

  menuContainerElement.append(opacitySection);
};
