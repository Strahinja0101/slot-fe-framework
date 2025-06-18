import { Container, Graphics } from 'pixi.js';

export class ReelsFrame {
  public container = new Container();

  async init(app: PIXI.Application) {
    const frame = new Graphics();
    frame.lineStyle(4, 0xffffff);
    const w = 500;
    const h = 300;
    frame.drawRect(0, 0, w, h);
    frame.x = (app.renderer.width - w) * 0.5;
    frame.y = (app.renderer.height - h) * 0.5;
    this.container.addChild(frame);
  }
}
