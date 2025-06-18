import { Container, Sprite, Texture } from 'pixi.js';

export class Background {
  public container = new Container();

  async init(app: PIXI.Application) {
    // placeholder texture - solid color
    const tex = Texture.WHITE;
    const bg = new Sprite(tex);
    bg.tint = 0x003366; // dark blue

    bg.width = app.renderer.width;
    bg.height = app.renderer.height;

    this.container.addChild(bg);
  }
}
