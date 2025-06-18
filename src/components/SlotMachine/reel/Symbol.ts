import { Sprite, Texture } from 'pixi.js';

export class Symbol extends Sprite {
   constructor(public readonly id: string, texture: Texture) {
    super(texture);
    this.anchor.set(0.5);
    this.scale.set(0.9);           // mala margina u ćeliji
  }

  static fromId(id: string, atlas: Record<string, Texture>): Symbol {
    return new Symbol(id, atlas[id] ?? Texture.WHITE);
  }
}
