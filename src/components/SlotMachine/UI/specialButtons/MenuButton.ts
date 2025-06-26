// src/components/UI/specialButtons/MenuButton.ts
import { Application } from "pixi.js";
import { BaseButton } from "../BaseButton";

export class MenuButton extends BaseButton {
  constructor(onClick: () => void) {
    super(onClick);
  }

  protected getTextureKeys() {
    return {
      normal: "info.png",
      hover: "info_hover.png",
      pressed: "info_pressed.png",
      disabled: "info_disabled.png",
    };
  }

  protected override setButtonPosition(
    app: Application,
    x?: number,
    y?: number
  ): void {
    const finalX = x ?? 0;
    const finalY = y ?? 0;

    if (x === undefined || y === undefined) {
      console.warn(
        `[MenuButton] Koristi default poziciju: x=${finalX}, y=${finalY}`
      );
    }

    this.x = app.renderer.width / 2 + finalX;
    this.y = app.renderer.height / 2 - finalY;
  }
}
