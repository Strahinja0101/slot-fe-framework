import { Container, Graphics, Application } from 'pixi.js';

export class ReelsFrame {
  public container = new Container();

  public readonly maskRect = new Graphics();

  async init(app: Application, w = 500, h = 300) {
 // 1) maska (ispunjeno, ali na alpha=1 -> svejedno je nevidljivo jer je maska)
    this.maskRect.beginFill(0x000000)
                 .drawRect(0, 0, w, h)
                 .endFill();

    // 2) vizuelni border
    const borderRect = new Graphics()
      .lineStyle(4, 0xffffff)
      .drawRect(0, 0, w, h);

    // 3) centriranje
    const cx = (app.renderer.width  - w) * 0.5;
    const cy = (app.renderer.height - h) * 0.5;

    // smesti sve u container (maskRect mora biti dete maske root-a da bi radila)
    this.container.position.set(cx, cy);
    this.container.addChild(this.maskRect, borderRect);
  }
}
