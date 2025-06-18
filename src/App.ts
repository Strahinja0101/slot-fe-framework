import { Application, Assets } from 'pixi.js';
import { SlotMachine } from './components/SlotMachine/index';

export class App {
  constructor(private app: Application) {}

  async init() {

    const manifest = {
      bundles: [
        {
          name: 'core',
          assets: {
            symbols:   'assets/sym_static.json' // PNG + JSON atlas
          }
        }
      ]
    };

    await Assets.init({ manifest });
    console.log('Assets manifest initialized!');
    

    await Assets.loadBundle('core', (progress) => {
      console.log(`Loading: ${(progress * 100).toFixed()} %`);
      // tu možeš update-ovati progress bar
    });

    const atlas = Assets.get('symbols');
    const textureKeys = Object.keys(atlas.textures ?? {});
    console.log('Loaded texture names:', textureKeys);

    const slot = new SlotMachine(this.app);
    await slot.init();
    this.app.stage.addChild(slot.container);

    // pozicioniraj za početnu veličinu
    this.resize();

    // reaguj na resize događaj
    window.addEventListener('resize', () => this.resize());

  }

  resize() {
    const { renderer, stage } = this.app;
   
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    renderer.resize(vw, vh);                 

    
    const bounds = this.app.stage.getLocalBounds();
    const designWidth  = bounds.width;
    const designHeight = bounds.height;

  
    const scale = vw / designWidth;

    
    stage.scale.set(scale);
    stage.position.set(
      0,
      (vh - designHeight * scale) * 0.5
    );
  }


}
