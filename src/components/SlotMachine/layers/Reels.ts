import { Container } from 'pixi.js';
import { Reel } from '../reel/Reel';

export class Reels {
  public container = new Container();
  private reelComponents: Reel[] = [];

  async init(app: PIXI.Application) {
    const reelCount = 3;
    for (let i = 0; i < reelCount; i++) {
      const r = new Reel(i);
      await r.init(app);
      r.container.x = i * 160;
      this.container.addChild(r.container);
      this.reelComponents.push(r);
    }
    // center container
    this.container.x = (app.renderer.width - (reelCount - 1) * 160) * 0.5;
    this.container.y = (app.renderer.height - 300) * 0.5;
  }

  spin() {
    this.reelComponents.forEach((r) => r.spin());
  }
}
