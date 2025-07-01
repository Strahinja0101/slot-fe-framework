import { Container, Application } from "pixi.js";
import { Reel } from "../reel/Reel";
import { eventBus } from "../../../eventBus";
import { gsap } from "gsap";

const REEL_W = 140;
const GAP = 20;
const ROWS = 5;
const VIEW_H = ROWS * REEL_W;

export class Reels {
  public container = new Container();
  private reelComponents: Reel[] = [];

  async init(app: Application) {
    const reelCount = 5;

    for (let i = 0; i < reelCount; i++) {
      const r = new Reel(i);
      await r.init(app);
      r.container.x = i * (REEL_W + GAP);
      this.container.addChild(r.container);
      this.reelComponents.push(r);
    }

    // centriraj posle što znaš ukupnu širinu
    const totalWidth = reelCount * REEL_W + (reelCount - 1) * GAP;
    this.container.x = (app.renderer.width - totalWidth) * 0.5;
    this.container.y = (app.renderer.height - VIEW_H) * 0.5;

    // listener
    eventBus.on("spin", () => this.spin());
  }

  spin() {
  for (let i = 0; i < this.reelComponents.length; i++) {
    const reel = this.reelComponents[i];
    const delay = i * 150;

    const originalY = reel.container.y;

    // Step 1: skoči nagore
    gsap.to(reel.container, {
      y: originalY - 30,
      duration: 0.15,
      ease: "power1.out",
      delay: delay / 1000, // gsap delay je u sekundama
      onComplete: () => {
        // Step 2: vrati se nazad dole
        gsap.to(reel.container, {
          y: originalY,
          duration: 0.15,
          ease: "power1.in",
          onComplete: () => {
            // Step 3: sad tek kreni spin
            reel.spin();
            console.log("[Reels] Spinning reel: " + i);
          }
        });
      }
    });
  }
}


  setResultSymbols(resultSymbols: string[][]) {
    this.reelComponents.forEach((reel, index) => {
      const symbols = resultSymbols[index];
      reel.setSymbols(symbols);
    });
  }
}
