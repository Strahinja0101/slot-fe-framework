// src/components/UI/specialButtons/AutoPlayButton.ts
import { Application } from "pixi.js";
import { BaseButton } from "../BaseButton";

export class AutoPlayButton extends BaseButton {
  constructor(onClick: () => void) {
    super(onClick);
  }

  protected getTextureKeys() {
    return {
      normal: "autoplay_normal.png",
      hover: "autoplay_hover.png",
      pressed: "autoplay_pressed.png",
      disabled: "autoplay_disabled.png",
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
        `[AutoPlayButton] Nema pozicije, koristi default: x=${finalX}, y=${finalY}`
      );
    }

    this.x = app.renderer.width / 2 + finalX;
    this.y = app.renderer.height / 2 - finalY;
  }
}
