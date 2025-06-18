import { Container, Sprite, Texture, Application  } from 'pixi.js';
import { eventBus } from '../../../eventBus';

export class UILayer {
  public container = new Container();

  async init(app: Application) {
    const tex = Texture.WHITE;
    const btn = new Sprite(tex);
    btn.tint = 0x00ff00;
    btn.width = btn.height = 80;
    btn.anchor.set(0.5);
    btn.x = app.renderer.width - 100;
    btn.y = app.renderer.height - 80;
    btn.eventMode = 'static';    // omogućava pointer događaje
    btn.cursor    = 'pointer';  // kursor "ruka" kad pređeš
    btn.on('pointertap', () => eventBus.emit('spin'));
    this.container.addChild(btn);
  }
}
