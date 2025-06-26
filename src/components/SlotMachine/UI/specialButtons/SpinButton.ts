import { Application } from "pixi.js";
import { BaseButton } from "../BaseButton";

export class SpinButton extends BaseButton {
  constructor(onClick: () => void) {
    super(onClick);
  }

  protected getTextureKeys() {
    return {
      normal: "play.png",
      hover: "play_hover.png",
      pressed: "play_pressed.png",
      disabled: "play_disabled.png",
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
      console.log(
        `[SpinButton] Pozicija nije prosleđena, koristis default: x=${finalX}, y=${finalY}`
      );
    }

    this.x = (app.renderer.width / 2) + finalX;
    this.y = (app.renderer.height / 2) - finalY;
  }
}
