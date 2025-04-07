import BaseElement from './base.element.js';

export class Diamond extends BaseElement {
  /**
   * @param {{x: number, y: number}} origin
   * @param {{width: number, height: number}} size
   * @param {{color: string, width: number, style: "solid" | "dashed"}} strokeProps
   * @param {{opacity: number, fillColor: string}} style
   */
  constructor(origin, size, strokeProps, style) {
    super(origin, strokeProps, style.opacity);
    this.size = size;
    this.fillColor = style.fillColor;
  }

  /**
   * Get the four points of the diamond shape
   * @returns {{x: number, y: number}[]}
   */
  getVertices() {
    const { x, y } = this.origin;
    const { width, height } = this.size;

    return [
      { x: x, y: y - height / 2 }, // top
      { x: x + width / 2, y: y }, // right
      { x: x, y: y + height / 2 }, // bottom
      { x: x - width / 2, y: y }, // left
    ];
  }

  clone() {
    return new Diamond(
      structuredClone(this.origin),
      structuredClone(this.size),
      structuredClone(this.strokeProps),
      structuredClone(this.style)
    );
  }
}
