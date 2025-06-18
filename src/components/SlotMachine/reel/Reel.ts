import { Container, Graphics, Application, Assets, Texture, Rectangle } from 'pixi.js';
import { Symbol } from './Symbol';

const SYMBOL_W = 140;
const SYMBOL_H = 140;
const REEL_COUNT     = 3;
const VIEW_W = SYMBOL_W;
const VIEW_H = SYMBOL_H * REEL_COUNT;

export class Reel {
  public container = new Container();
  private symbols: Symbol[] = [];

  constructor(private index: number) {}

  async init(app: Application) {
    const textures = Assets.get('symbols').textures as Record<string, Texture>;

    const STRIP = Object.keys(textures)

    STRIP.forEach((id, i) => {
      const sym  = new Symbol(id, textures[id]);
      sym.x      = SYMBOL_W * 0.5;
      sym.y      = i * SYMBOL_H + SYMBOL_H * 0.5;
      this.container.addChild(sym);
      this.symbols.push(sym);
    });



    // const mask = new Graphics()
    // .beginFill(0x000000)
    // .drawRect(-SYMBOL_W * 0.5, -SYMBOL_H * 0.5, SYMBOL_W, ROWS * SYMBOL_H)
    // .endFill();

    // this.container.addChild(mask);
    // this.container.mask = mask;

    // const mask = new Container();
    // mask.hitArea = new Rectangle(0, 0, SYMBOL_W, ROWS * SYMBOL_H);
    // this.container.mask = mask;
    // const g = new Graphics();
    // g.beginFill(0xffd700);
    // g.drawRect(0, 0, 140, 280);
    // g.endFill();
    // this.container.addChild(g);
  }

  spin() {
    // placeholder spin animation
    console.log(`Spinning reel ${this.index}`);
    
  }
}
