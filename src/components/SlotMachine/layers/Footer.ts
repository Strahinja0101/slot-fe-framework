// src/components/UI/Footer.ts
import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Footer extends Container {
  private background: Graphics;
  private creditsText: Text;
  private betText: Text;
  private winText: Text;

  constructor() {
    super();

    // Pozadina
    this.background = new Graphics();
    this.addChild(this.background);

    const style = new TextStyle({
      fill: "#ffffff",
      fontSize: 20,
    });

    // Credits
    this.creditsText = new Text("Credits: 1000.00", style);
    this.creditsText.anchor.set(0, 0.5);
    this.creditsText.y = 25;
    this.addChild(this.creditsText);

    // Bet
    this.betText = new Text("Bet: 1.00", style);
    this.betText.anchor.set(1, 0.5);
    this.betText.y = 25;
    this.addChild(this.betText);

    // Win
    this.winText = new Text("Win: 0.00", style);
    this.winText.anchor.set(0.5, 0.5);
    this.winText.y = 25;
    this.addChild(this.winText);
  }

  public setSize(width: number) {
    this.background
      .clear()
      .beginFill(0x333333)
      .drawRect(0, 0, width, 50)
      .endFill();

    // Pozicioniraj tekstove unutar footer-a
    this.creditsText.x = 20; // levo poravnato
    this.winText.x = width / 2; // centar
    this.betText.x = width - 20; // desno poravnato
  }
  // Postavi poziciju footer-a na dno ekrana
  public setPosition(canvasHeight: number) {
    this.x = 0;
    this.y = canvasHeight - 50;
  }

  public updateCredits(value: number) {
    this.creditsText.text = `Credits: ${value.toFixed(2)}`;
  }

  public updateBet(value: number) {
    this.betText.text = `Bet: ${value.toFixed(2)}`;
  }

  public updateWin(value: number) {
    this.winText.text = `Win: ${value.toFixed(2)}`;
  }
}
