// hnadle file format even if extension is valid
import { handleColorInputs } from './inputs.js';
import Canvas from './canvas.js';

class App {
  constructor() {
    this.canvas = new Canvas();
  }

  init() {
    handleColorInputs();
    this.canvas.init();
  }
}

const app = new App();
app.init();
