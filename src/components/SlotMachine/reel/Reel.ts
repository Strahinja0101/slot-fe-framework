import {
  Container,
  Graphics,
  Application,
  Assets,
  Texture,
  Rectangle,
} from "pixi.js";
import { Symbol } from "./Symbol";
import { gsap } from "gsap";

const SYMBOL_W = 140;
const SYMBOL_H = 140;
const REEL_COUNT = 3;
const VIEW_W = SYMBOL_W;
const VIEW_H = SYMBOL_H * REEL_COUNT;
const SYMBOL_VERTICAL_SPACING = 120;

export class Reel {
  public container = new Container();
  private symbols: Symbol[] = [];
  private symbolStrip: string[] = [];

  constructor(private index: number) {}

  async init(app: Application) {
    const textures = Assets.get("symbols").textures as Record<string, Texture>;

    this.symbolStrip = Object.keys(textures);

    for (let i = 0; i < 5; i++) {
      const symbolId = this.getRandomSymbol();
      const sym = new Symbol(symbolId, textures[symbolId]);
      sym.x = SYMBOL_W * 0.5;
      sym.y = i * SYMBOL_H + SYMBOL_H * 0.5;
      this.container.addChild(sym);
      this.symbols.push(sym);
    }
  }

  private getRandomSymbol(): string {
    const index = Math.floor(Math.random() * this.symbolStrip.length);
    return this.symbolStrip[index];
  }

  spin() {
    // placeholder spin animation
    const textures = Assets.get("symbols").textures as Record<string, Texture>;
    console.log(`Spinning reel ${this.index}`);
    const SPIN_DURATION = 0.1; // trajanje u sekundama
    const SPIN_DISTANCE = SYMBOL_H * 5; // koliko da se pomere
    const TOTAL_STEPS = 40;

    let step = 0;

 const doStep = () => {
  const textures = Assets.get("symbols").textures as Record<string, Texture>;

  // 1. Pomeri sve simbole naniže
  this.symbols.forEach((sym) => {
    gsap.to(sym, {
      y: sym.y + SYMBOL_H,
      duration: SPIN_DURATION,
      ease: "none",
    });
  });

  // 2. Nakon animacije: dodaj novi na vrh, ukloni donji
  gsap.delayedCall(SPIN_DURATION, () => {
    const newId = this.getRandomSymbol();
    const newSym = new Symbol(newId, textures[newId]);
    newSym.x = SYMBOL_W * 0.5;
    newSym.y = this.symbols[0].y - SYMBOL_H;
    this.container.addChild(newSym);
    this.symbols.unshift(newSym);

    const removed = this.symbols.pop();
    if (removed) this.container.removeChild(removed);

    step++;
    if (step < TOTAL_STEPS) {
      doStep(); // sledeći korak
    } else {
      // 🎯 Final bounce efekat
      this.symbols.forEach((sym) => {
        console.log(`Final symbol: ${sym.id}`);
        gsap.to(sym, {
          y: sym.y + 20,
          duration: 0.2,
          ease: "back.out(2)",
        });
      });
    }
  });
};



    doStep();
  }

  setSymbols(symbolIds: string[]) {
  // Očisti postojeće
  this.symbols.forEach(s => this.container.removeChild(s));
  this.symbols = [];

  const textures = Assets.get("symbols").textures as Record<string, Texture>;
  symbolIds.forEach((id, i) => {
    const sym = new Symbol(id, textures[id]);
    sym.x = SYMBOL_W * 0.5;
    sym.y = i * SYMBOL_H + SYMBOL_H * 0.5;
    this.container.addChild(sym);
    this.symbols.push(sym);
  });
}

}
