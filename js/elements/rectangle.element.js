import BaseElement from "./base.element.js";

export class Rectangle extends BaseElement {
  /**
   *
   * @param {{x: number, y: number}} origin
   * @param {{width: number, height: number}} size
   * @param {{color: number, width: number, style: "solid" | "dashed"}} strokeProps
   * @param {{opacity: number, fillColor: string}} style
   */
  constructor(origin, strokeProps, style) {
    super(origin, strokeProps, style.opacity);
    this.fillColor = style.fillColor;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   */
  render = (ctx, selected = false) => {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = this.fillColor;
    ctx.fillRect(
      this.origin.x,
      this.origin.y,
      this.size.width,
      this.size.height
    );

    ctx.strokeStyle = this.strokeProps.color;
    ctx.lineWidth = this.strokeProps.width;
    ctx.setLineDash(this.strokeProps.style === "dashed" ? [6, 4] : []);
    ctx.strokeRect(
      this.origin.x,
      this.origin.y,
      this.size.width,
      this.size.height
    );

    if (selected) this.drawResizeHandles(ctx);

    ctx.restore();
  };

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawResizeHandles = (ctx) => {
    const handles = this.getResizeHandles();
    ctx.fillStyle = "#000";
    for (const h of handles) {
      ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
    }
  };

  getResizeHandles = () => {
    const { x, y } = this.origin;
    const { width, height } = this.size;
    return [
      { x: x, y: y }, // top-left
      { x: x + width, y: y }, // top-right
      { x: x + width, y: y + height }, // bottom-right
      { x: x, y: y + height }, // bottom-left
    ];
  };

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns boolean
   */
  contains = (x, y) => {
    return (
      x >= this.origin.x &&
      x <= this.origin.x + this.size.width &&
      y >= this.origin.y &&
      y <= this.origin.y + this.size.height
    );
  };

  clone() {
    return new Rectangle(
      structuredClone(this.origin),
      structuredClone(this.size),
      structuredClone(this.strokeProps),
      structuredClone(this.style)
    );
  }
}
