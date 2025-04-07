export class Ellipse extends BaseElement {
  /**
   * @param {{x: number, y: number}} origin
   * @param {{radiusX: number, radiusY: number}} radii
   * @param {{color: string, width: number, style: "solid" | "dashed"}} strokeProps
   * @param {{opacity: number, fillColor: string}} style
   */
  constructor(origin, radii, strokeProps, style) {
    super(origin, strokeProps, style.opacity);
    this.radii = radii;
    this.fillColor = style.fillColor;
  }

  clone() {
    return new Ellipse(
      structuredClone(this.origin),
      structuredClone(this.size),
      structuredClone(this.strokeProps),
      structuredClone(this.style)
    );
  }
}
