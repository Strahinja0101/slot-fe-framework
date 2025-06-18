import type { Application, Container as PixiContainer } from 'pixi.js';
import { Container } from 'pixi.js';
import { Background } from './layers/Background';
import { ReelsFrame } from './layers/ReelsFrame';
import { Reels } from './layers/Reels';
import { UILayer } from './layers/UILayer';

export class SlotMachine {
  public container = new Container();

  private bgLayer = new Background();
  private frameLayer = new ReelsFrame();
  private reelsLayer = new Reels();
  private fxLayer = new Container();
  private uiLayer = new UILayer();

  constructor(private app: Application) {}

  async init() {
    await Promise.all([
      this.bgLayer.init(this.app),
      this.frameLayer.init(this.app),
      this.reelsLayer.init(this.app),
      this.uiLayer.init(this.app),
    ]);
    this.reelsLayer.container.mask = this.frameLayer.maskRect;
    this.container.addChild(
      this.bgLayer.container,
      this.reelsLayer.container,
      this.frameLayer.container,
      this.fxLayer,
      this.uiLayer.container
    );

    
  }
}
