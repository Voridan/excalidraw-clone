// only for inheritance
export default class BaseElement {
  /**
   *
   * @param {{x: number, y: number}} origin
   * @param {{color: number, width: number, style: "solid" | "dashed"}} strokeProps
   * @param {number} opacity
   */
  constructor(origin, strokeProps, opacity) {
    this.origin = origin;
    this.strokeProps = strokeProps;
    this.opacity = opacity;
  }
}
