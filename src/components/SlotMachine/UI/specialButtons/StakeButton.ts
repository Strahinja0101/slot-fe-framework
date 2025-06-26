// src/components/UI/specialButtons/StakeButton.ts
import { Application } from "pixi.js";
import { BaseButton } from "../BaseButton";

export class StakeButton extends BaseButton {
  constructor(onClick: () => void) {
    super(onClick);
  }

  protected getTextureKeys() {
    return {
      normal: "Bet_normal.png",
      hover: "Bet_hover.png",
      pressed: "Bet_pressed.png",
      disabled: "Bet_disabled.png",
    };
  }

  protected override setButtonPosition(
    app: Application,
    x?: number,
    y?: number
  ): void {
    const finalX = x ?? app.renderer.width / 2;
    const finalY = y ?? app.renderer.height / 2;

    if (x === undefined || y === undefined) {
      console.warn(
        `[StakeButton] Koristi default poziciju: x=${finalX}, y=${finalY}`
      );
    }

    this.x = (app.renderer.width / 2) + finalX;
    this.y = (app.renderer.height / 2) - finalY;
  }
}
