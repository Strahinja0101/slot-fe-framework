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
import { GameModel } from "../../../model/GameModel";
import { GameCommunicationService } from "../../../services/GameCommunicationService";

const SYMBOL_W = 140;
const SYMBOL_H = 140;
const REEL_COUNT = 3;
const VIEW_W = SYMBOL_W;
const VIEW_H = SYMBOL_H * REEL_COUNT;
const SYMBOL_VERTICAL_SPACING = 120;



export class Reel {
  public container = new Container();
  private model = new GameModel();
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
  private getFinalSymbol(): string[] {
    return this.model.resultSymbols[this.model.resultSymbols.length - 1];
  }

  async spin() {
    // placeholder spin animation
    const textures = Assets.get("symbols").textures as Record<string, Texture>;
    console.log(`Spinning reel ${this.index}`);
    const SPIN_DURATION = 0.1; // trajanje u sekundama
    const SPIN_DISTANCE = SYMBOL_H * 5; // koliko da se pomere
    const TOTAL_STEPS = 20;
    const data = await GameCommunicationService.fetchInitialGameState();
    this.model.updateFromServer(data);

    let step = 0;

    const doStep = () => {
      const textures = Assets.get("symbols").textures as Record<
        string,
        Texture
      >;

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
        let symbol = this.getRandomSymbol();
        if (step > 15) {
          // Poslednji korak, koristi finalni simbol
          symbol = this.getFinalSymbol()[this.index];
        }
        const newId = symbol;
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
            const originalY = sym.y;

            // Step 1: Set initial small drop before bounce
            gsap.set(sym, {
              y: originalY - 20, // blago spljošten
            });

            // Step 2: Animate bounce up with easing
            gsap.to(sym, {
              y: originalY,
              duration: 0.5,
              ease: "back.out(2.5)",
            });
          });
        }
      });
    };

    doStep();
  }

  setSymbols(symbolIds: string[]) {
    // Očisti postojeće
    this.symbols.forEach((s) => this.container.removeChild(s));
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
