import { Container, Sprite, Texture } from 'pixi.js';

export class UILayer {
  public container = new Container();

  async init(app: PIXI.Application) {
    const tex = Texture.WHITE;
    const btn = new Sprite(tex);
    btn.tint = 0x00ff00;
    btn.width = btn.height = 80;
    btn.anchor.set(0.5);
    btn.x = app.renderer.width - 100;
    btn.y = app.renderer.height - 80;
    btn.interactive = true;
    btn.buttonMode = true;
    btn.on('pointertap', () => app.emit('spin'));
    this.container.addChild(btn);
  }
}
