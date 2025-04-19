import BaseElement from "./base.element.js";

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
    this.style = style;
  }

  render(ctx, isSelected = false) {
    ctx.save();
    ctx.globalAlpha = this.style.opacity;
    ctx.strokeStyle = this.strokeProps.color;
    ctx.lineWidth = this.strokeProps.width;
    // Apply dashed stroke if needed
    ctx.setLineDash(this.strokeProps.style === "dashed" ? [6, 4] : []);
    ctx.beginPath();
    ctx.ellipse(
      this.origin.x,
      this.origin.y,
      this.radii.radiusX,
      this.radii.radiusY,
      0, // rotation
      0,
      2 * Math.PI
    );
    // Fill if fillColor is not transparent
    if (this.fillColor !== "transparent") {
      ctx.fillStyle = this.style.fillColor;
      ctx.fill();
    }
    ctx.stroke();
    ctx.restore();
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
