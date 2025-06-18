import type { Application } from 'pixi.js';
import { SlotMachine } from './components/SlotMachine/index';

export class App {
  constructor(private app: Application) {}

  async init() {
    const slot = new SlotMachine(this.app);
    await slot.init();
    this.app.stage.addChild(slot.container);
  }
}
