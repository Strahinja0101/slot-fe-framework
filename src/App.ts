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
            symbols:   'assets/images/sym_static.json',// PNG + JSON atlas
            ui:      'assets/images/all_ui_buttons_new.json', // PNG + JSON atlas
            background: 'assets/spines/base_background_anim.json', // Spine animacija
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

    const atlas1 = Assets.get('ui');
    const textureKey1 = Object.keys(atlas1.textures ?? {});
    console.log('Loaded texture names:', textureKey1);

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
