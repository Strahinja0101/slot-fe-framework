import type { Application, Container } from 'pixi.js';
import { Container as PixiContainer, Sprite as PixiSprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';

export class SlotMachine {
  public container: Container;

  constructor(private app: Application) {
    this.container = new PixiContainer();
  }

  async init() {
   const tex = Texture.WHITE;
     const centerSquare = new PixiSprite(tex);
    centerSquare.tint  = 0xffd700;      // zlatna boja (promeni po želji)
    centerSquare.width = centerSquare.height = 120;

    // Izračunaj centar render-platna
    const { width, height } = this.app.renderer;
    centerSquare.x = (width  - centerSquare.width)  * 0.5;
    centerSquare.y = (height - centerSquare.height) * 0.5;
    this.container.addChild(centerSquare);
  }
}
