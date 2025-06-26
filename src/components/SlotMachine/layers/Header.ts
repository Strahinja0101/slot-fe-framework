import { Container, Graphics, Text, TextStyle, Application } from 'pixi.js';

export class Header extends Container {
  private background: Graphics;
  private title: Text;

  constructor() {
    super();

    this.background = new Graphics();
    this.addChild(this.background);

    const style = new TextStyle({
      fill: '#ffffff',
      fontSize: 32,
      fontWeight: 'bold',
    });

    this.title = new Text('Slot Game Header', style);
    this.title.anchor.set(0.5);
    this.title.y = 30; // centrirano vertikalno unutar 60px visine
    this.addChild(this.title);
  }

  public setSize(width: number) {
    this.background.clear()
      .beginFill(0x333333)
      .drawRect(0, 0, width, 60)
      .endFill();

    this.title.x = width / 2;
  }

  public setPosition() {
    this.x = 0;
    this.y = 0;
  }
}
