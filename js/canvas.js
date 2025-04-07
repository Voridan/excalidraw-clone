import { Rectangle } from './elements/rectangle.element.js';
import { getMousePos, isNear } from './util.js';

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
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
  }

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
    this.canvas.addEventListener('mousedown', (e) => {
      const { x, y } = getMousePos(e, this.canvasRect);

      for (let i = this.shapes.length - 1; i >= 0; i--) {
        const shape = this.shapes[i];
        if (shape.contains(x, y)) {
          this.currentShape = shape;
          this.renderCanvas();
          return;
        }
      }

      this.currentShape = null;
      this.renderCanvas();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      const { x, y } = getMousePos(e, canvas);

      if (this.currentShape) {
        const handleIndex = this.getHandleUnderMouse({
          x,
          y,
        });
        if (handleIndex !== -1) {
          activeHandle = handleIndex;
          resizing = true;
          return;
        }
      }

      this.currentShape = null;
      this.renderCanvas();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.drawing) return;

      const x = e.clientX - this.canvasRect.left;
      const y = e.clientY - this.canvasRect.top;

      const size = {
        width: Math.abs(x - origin.x),
        height: Math.abs(y - origin.y),
      };

      const adjustedOrigin = {
        x: Math.min(x, origin.x),
        y: Math.min(y, origin.y),
      };

      const strokeProps = { color: '#000000', width: 2, style: 'solid' };
      const style = { fillColor: '#00ccff', opacity: 1 };
      const selectedTool = 'rectangle';

      switch (selectedTool) {
        case 'rectangle':
          this.currentShape = new Rectangle(
            adjustedOrigin,
            size,
            strokeProps,
            style
          );
          break;
        // case 'ellipse':
        //   this.currentShape = new Ellipse(
        //     {
        //       x: adjustedOrigin.x + size.width / 2,
        //       y: adjustedOrigin.y + size.height / 2,
        //     },
        //     { radiusX: size.width / 2, radiusY: size.height / 2 },
        //     strokeProps,
        //     style
        //   );
        //   break;
        // case 'diamond':
        //   this.currentShape = new Diamond(
        //     {
        //       x: adjustedOrigin.x + size.width / 2,
        //       y: adjustedOrigin.y + size.height / 2,
        //     },
        //     size,
        //     strokeProps,
        //     style
        //   );
        //   break;
      }

      this.renderCanvas();
    });

    this.canvas.addEventListener('mouseup', () => {
      if (this.drawing) {
        this.drawing = false;
        this.shapes.push(this.currentShape.clone());
        this.currentShape = null;
      }
    });
  };
}
