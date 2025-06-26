import { Container, Sprite, Texture, Application, Assets } from "pixi.js";
import { Spine } from "pixi-spine";

export class Background {
  public container = new Container();
  spine?: Spine;

  async init(app: Application) {
    const bacgroundSpineAsset = Assets.get("background");
    this.spine = new Spine(bacgroundSpineAsset.spineData);
    // ili app.screen.height ako želiš fleksibilno

    this.spine.x = app.screen.width / 2; // centriraj horizontaln
    this.spine.y = app.screen.height; // dno canvasa
    this.container.addChild(this.spine);
    const bounds = this.spine.getLocalBounds();

    // skaliraj da pokrije celu širinu
    const scaleX = app.screen.width / bounds.width;
    const scaleY = app.screen.height / bounds.height;
    this.spine.scale.set(scaleX, scaleY);
    this.spine.x = -bounds.x * scaleX;
    this.spine.y = -bounds.y * scaleY;

    this.spine.state.setAnimation(0, "bg_loop", true);

    this.container.addChild(this.spine);
  }
}
