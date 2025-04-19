import { SUPPORTED_TOOLS } from "./config.js";
import { Ellipse } from "./elements/ellipse.element.js";
import { isNear } from "./util.js";
let isDrawing = false;
let startX, startY;
let ellipses = [];

class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvasRect = this.canvas.getBoundingClientRect();

    this.shapes = [];
    this.currentShape = null;
    this.activeHandle = -1;
    this.resizing = false;
    this.originalSize = null;
    this.initialMousePosition = null;

    this.drawing = false;

    this.selectedTool = "ellipse";
  }

  setSelectedTool = (tool) => {
    if (SUPPORTED_TOOLS.includes(tool)) {
      this.selectedTool = tool;
    } else {
      alert("tool is not implemented");
    }
  };

  renderCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const shape of this.shapes) {
      shape.render(this.ctx, shape === this.currentShape);
    }
  };

  getHandleUnderMouse = (mousePos) => {
    return this.currentShape
      .getResizeHandles?.()
      .findIndex((h) => isNear(h, mousePos));
  };

  init = () => {
    this.canvas.addEventListener("mousedown", this.startDrawing);
    this.canvas.addEventListener("mousemove", this.drawEllipse);
    this.canvas.addEventListener("mouseup", this.endDrawing);
    this.canvas.addEventListener("mouseout", this.endDrawing);
    // this.canvas.addEventListener("mousedown", (e) => {
    //   const { x, y } = getMousePos(e, this.canvasRect);

    //   for (let i = this.shapes.length - 1; i >= 0; i--) {
    //     const shape = this.shapes[i];
    //     if (shape.contains(x, y)) {
    //       this.currentShape = shape;
    //       this.renderCanvas();
    //       return;
    //     }
    //   }

    //   this.currentShape = null;
    //   this.renderCanvas();
    // });

    // this.canvas.addEventListener("mousedown", (e) => {
    //   const { x, y } = getMousePos(e, this.canvasRect);

    //   if (this.currentShape) {
    //     const handleIndex = this.getHandleUnderMouse({
    //       x,
    //       y,
    //     });
    //     if (handleIndex !== -1) {
    //       activeHandle = handleIndex;
    //       resizing = true;
    //       return;
    //     }
    //   }

    //   this.currentShape = null;
    //   this.renderCanvas();
    // });

    // this.canvas.addEventListener("mousemove", (e) => {
    //   if (!this.drawing) return;

    //   const x = e.clientX - this.canvasRect.left;
    //   const y = e.clientY - this.canvasRect.top;

    //   const size = {
    //     width: Math.abs(x - origin.x),
    //     height: Math.abs(y - origin.y),
    //   };

    //   const adjustedOrigin = {
    //     x: Math.min(x, origin.x),
    //     y: Math.min(y, origin.y),
    //   };

    //   const strokeProps = { color: "#000000", width: 2, style: "solid" };
    //   const style = { fillColor: "#00ccff", opacity: 1 };
    //   const selectedTool = "rectangle";

    //   switch (selectedTool) {
    //     case "rectangle":
    //       this.currentShape = new Rectangle(
    //         adjustedOrigin,
    //         size,
    //         strokeProps,
    //         style
    //       );
    //       break;
    //     // case 'ellipse':
    //     //   this.currentShape = new Ellipse(
    //     //     {
    //     //       x: adjustedOrigin.x + size.width / 2,
    //     //       y: adjustedOrigin.y + size.height / 2,
    //     //     },
    //     //     { radiusX: size.width / 2, radiusY: size.height / 2 },
    //     //     strokeProps,
    //     //     style
    //     //   );
    //     //   break;
    //     // case 'diamond':
    //     //   this.currentShape = new Diamond(
    //     //     {
    //     //       x: adjustedOrigin.x + size.width / 2,
    //     //       y: adjustedOrigin.y + size.height / 2,
    //     //     },
    //     //     size,
    //     //     strokeProps,
    //     //     style
    //     //   );
    //     //   break;
    //   }

    //   this.renderCanvas();
    // });

    // this.canvas.addEventListener("mouseup", () => {
    //   if (this.drawing) {
    //     this.drawing = false;
    //     this.shapes.push(this.currentShape.clone());
    //     this.currentShape = null;
    //   }
    // });
  };

  startDrawing = (e) => {
    console.log("eeee");

    isDrawing = true;

    // Get mouse position relative to canvas
    startX = e.clientX - this.canvas.offsetLeft;
    startY = e.clientY - this.canvas.offsetTop;
  };

  drawEllipse = (e) => {
    console.log("deded");

    if (!isDrawing) return;

    const currentX = e.clientX - this.canvas.offsetLeft;
    const currentY = e.clientY - this.canvas.offsetTop;

    // Clear and redraw everything
    this.render();

    // Draw the ellipse in progress
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    const width = currentX - startX;
    const height = currentY - startY;

    // Calculate center and radius
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;
    const radiusX = Math.abs(width / 2);
    const radiusY = Math.abs(height / 2);

    // Draw the ellipse
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    this.ctx.stroke();
  };

  endDrawing = (e) => {
    if (!isDrawing) return;

    isDrawing = false;

    const endX = e.clientX - this.canvas.offsetLeft;
    const endY = e.clientY - this.canvas.offsetTop;

    const width = endX - startX;
    const height = endY - startY;

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const absoluteWidth = Math.abs(width);
    const absoluteHeight = Math.abs(height);

    if (absoluteWidth > 0 && absoluteHeight > 0) {
      const centerX = x + absoluteWidth / 2;
      const centerY = y + absoluteHeight / 2;
      const radii = {
        radiusX: absoluteWidth / 2,
        radiusY: absoluteHeight / 2,
      };

      const strokeProps = {
        color: "black",
        width: 2,
        style: "solid",
      };

      const style = {
        opacity: 1,
        fillColor: "transparent",
      };

      ellipses.push(
        new Ellipse({ x: centerX, y: centerY }, radii, strokeProps, style)
      );
    }

    // Redraw everything
    this.render();
  };

  render = () => {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all saved ellipses using their render method
    ellipses.forEach((ellipse) => {
      ellipse.render(this.ctx);
    });
  };
}

export default new Canvas();
