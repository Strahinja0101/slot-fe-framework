import { Container, Graphics } from 'pixi.js';

export class Reel {
  public container = new Container();

  constructor(private index: number) {}

  async init(app: PIXI.Application) {
    const g = new Graphics();
    g.beginFill(0xffd700);
    g.drawRect(0, 0, 140, 280);
    g.endFill();
    this.container.addChild(g);
  }

  spin() {
    // placeholder spin animation
  }
}
