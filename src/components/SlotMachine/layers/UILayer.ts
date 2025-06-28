import {
  Container,
  Sprite,
  Texture,
  Application,
  Assets,
  Spritesheet,
} from "pixi.js";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SpinButton } from "../UI/specialButtons/SpinButton";
import { AutoPlayButton } from "../UI/specialButtons/AutoPlayButton";
import { StakeButton } from "../UI/specialButtons/StakeButton";
import { MenuButton } from "../UI/specialButtons/MenuButton";
// System popup controller
import { showStakePopup } from '../../../utils/PopupSystemController';
import { eventBus } from "../../../eventBus";

export class UILayer {
  public container = new Container();

  private header!: Header;
  private footer!: Footer;

  async init(app: Application) {
    // Header
    this.header = new Header();
    this.header.setSize(app.screen.width);
    this.header.setPosition();
    this.container.addChild(this.header);

    // Footer
    this.footer = new Footer();
    this.footer.setSize(app.screen.width);
    this.footer.setPosition(app.screen.height);
    this.container.addChild(this.footer);

    // Spin Button initializacija
    const spinBtn = await SpinButton.create(
      () => eventBus.emit("spin"),
      app,
      600,
      0
    );
    this.container.addChild(spinBtn);

    // Auto Play Button initializacija
    const autoPlayBtn = await AutoPlayButton.create(
      () => eventBus.emit("autoplay"),
      app,
      600,
      -200
    );
    this.container.addChild(autoPlayBtn);

    // Stake Button initializacija
    const stakeBtn = await StakeButton.create(
      () => eventBus.emit("stake"),
      app,
      500,
      -350
    );
    this.container.addChild(stakeBtn);

    // Menu Button initializacija
    const menuBtn = await MenuButton.create(
      () => eventBus.emit("menu"),
      app,
      -750,
      -350
    );
    this.container.addChild(menuBtn);
  }
}
