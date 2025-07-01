import { Application, Assets } from 'pixi.js';
import { SlotMachine } from './components/SlotMachine/index';
import { getEnvironmentInfo } from '../src/utils/EnvironmentGameController';


export class App {
  constructor(private app: Application) {}

  async init() {
    const env = getEnvironmentInfo();
  console.log('Environment:', env);

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
    let resizeTimeout: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => this.resize(), 100);
});

  }

  

resize() {
  const env = getEnvironmentInfo();
  console.log('Environment:', env);

  const { renderer, stage } = this.app;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  renderer.resize(vw, vh);                 

  const bounds = stage.getLocalBounds();
  const designWidth = bounds.width;
  const designHeight = bounds.height;

  const scaleX = vw / designWidth;
  const scaleY = vh / designHeight;

  // Ako je desktop, koristi scaleX (popuni širinu), inače koristi Math.min
  const scale = env.isDesktop ? scaleX : Math.min(scaleX, scaleY);

  stage.scale.set(scale);

  // Centriranje po visini, horizontalno nije potrebno jer je popunjeno
  stage.position.set(
    (vw - designWidth * scale) * 0.5,
    (vh - designHeight * scale) * 0.5
  );
}



}
