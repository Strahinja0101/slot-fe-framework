// src/components/UI/BaseButton.ts
import {
  Application,
  Container,
  Sprite,
  Texture,
  Assets,
  Spritesheet,
} from "pixi.js";

export interface TextureKeys {
  normal: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export abstract class BaseButton extends Container {
  protected sprite: Sprite;
  protected textures!: Record<keyof TextureKeys, Texture>;
  protected isDisabled = false;

  constructor(onClick: () => void) {
    super();
    this.sprite = new Sprite();
    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerover", () => {
      if (!this.isDisabled) this.sprite.texture = this.textures.hover;
    });

    this.on("pointerout", () => {
      if (!this.isDisabled) this.sprite.texture = this.textures.normal;
    });

    this.on("pointerdown", () => {
      if (!this.isDisabled) this.sprite.texture = this.textures.pressed;
    });

    this.on("pointerup", () => {
      if (!this.isDisabled) {
        this.sprite.texture = this.textures.hover;
        console.log(`[BaseButton] Button clicked: ${this.constructor.name}`);
        onClick?.();
      }
    });

    this.on("pointerupoutside", () => {
      if (!this.isDisabled) this.sprite.texture = this.textures.normal;
    });
  }

  public setDisabled(disabled: boolean) {
    this.isDisabled = disabled;
    this.eventMode = disabled ? "none" : "static";
    this.sprite.texture = disabled
      ? this.textures.disabled
      : this.textures.normal;
  }

  // Dugme definiše koje ključeve iz spritesheet-a želi
  protected abstract getTextureKeys(): TextureKeys;

  // Dugme može da override-uje svoju poziciju
  protected setButtonPosition(app: Application, x?: number, y?: number): void {}

  // 🔁 Factory metoda
  static async create<T extends BaseButton>(
    this: new (onClick: () => void) => T,
    onClick: () => void,
    app: Application,
    x?: number,
    y?: number
  ): Promise<T> {
    const button = new this(onClick);
    const textureKeys = button.getTextureKeys();

    const image = await Assets.load("assets/images/all_ui_buttons_new.png");
    const json = await (
      await fetch("assets/images/all_ui_buttons_new.json")
    ).json();
    const spritesheet = new Spritesheet(image.baseTexture, json);
    await spritesheet.parse();

    button.textures = {
      normal: spritesheet.textures[textureKeys.normal],
      hover: spritesheet.textures[textureKeys.hover],
      pressed: spritesheet.textures[textureKeys.pressed],
      disabled: spritesheet.textures[textureKeys.disabled],
    };

    button.sprite.texture = button.textures.normal;
    button.setButtonPosition(app, x, y);
    return button;
  }
}
