import {
  ELEMENTTYPE_TEXT,
  Entity,
  Vec2,
  Vec4,
} from "playcanvas";
import { GameConstant } from "../../../gameConstant";
import { UIScreen } from "../../../template/ui/uiScreen";
import { Util } from "../../../helpers/util";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { ObjectFactory } from "../../../template/objects/objectFactory";
import { SceneManager } from "../../../template/scene/sceneManager";
import { PlaySceneEvent } from "../../scenes/playScene";
import { Setting } from "../objects/setting/setting";
import { Sound } from "../../../template/sound/sound";
import { UserData } from "../../data/userData";


export class PlayScreen extends UIScreen {
  constructor() {
    super(GameConstant.SCREEN_PLAY);
    this._initLevelText();
    this._initRunButton();
    this._initBtnSetting();
    this._initSetting();
    this.resize();
  }

  create() {
    super.create();
  }

  _initBtnSetting() {
    this.settingBtn = ObjectFactory.createImageElement("ic-sett", {
      anchor: new Vec4(0, 1, 0, 1),
      pivot: new Vec2(0, 1),
      x: 20,
      y: -20,
      z: 0,
      scale: 0.6,
    });

    this.addChild(this.settingBtn);
    this.settingBtn.setLocalScale(0.5, 0.5, 0.5);
    Util.registerOnTouch(this.settingBtn.element, () => { this.setting.enabled = true; }, this);
  }

  _initSetting() {
    this.setting = new Setting();
    this.addChild(this.setting);
    this.setting.enabled = false;

    this.setting.on("disableSeting", () => { this.setting.enabled = false }, this);

    this.setting.on("musicSetting", (boolean) => {
      if (boolean) {
        Sound.musicOn();
      }
      else {
        Sound.musicOff();
      }
    }, this);

    this.setting.on("soundSetting", (boolean) => {
      if (boolean) {
        Sound.soundOn();
      }
      else {
        Sound.soundOff();
      }
    }, this);

  }

  _initLevelText() {
    this.levelText = new Entity("levelText");
    this.levelText.addComponent("element", {
      type: ELEMENTTYPE_TEXT,
      anchor: new Vec4(0.98, 1, 0.98, 1),
      pivot: new Vec2(1, 1),
      fontSize: 70,
      autoWidth: true,
      autoHeight: true,
      fontAsset: AssetLoader.getAssetByKey("font_ariston_comic"),
      text: "Level",
      color: Util.createColor(255, 255, 255),
      outlineThickness: 0.2,
      outlineColor: Util.createColor(0, 0, 0),
    });
    this.addChild(this.levelText);
   
  }

  _initRunButton() {
    this.runButton = ObjectFactory.createImageElement("spr_btn_green", {
      anchor: new Vec4(0.5, 0.15, 0.5, 0.15),
      pivot: new Vec2(0.5, 0.5),
      scale: 0.8,
    })
    this.addChild(this.runButton);
    Util.registerOnTouch(this.runButton.element, this._onRunButtonTouch, this);

    this.runText = new Entity("runText");
    this.runText.addComponent("element", {
      type: ELEMENTTYPE_TEXT,
      anchor: new Vec4(0.45, 0.25, 0.45, 0.25),
      pivot: new Vec2(0.5, 0.5),
      fontSize: 55,
      fontAsset: AssetLoader.getAssetByKey("font_ariston_comic"),
      text: "Start",
      color: Util.createColor(255, 255, 255),
      outlineThickness: 0,
      outlineColor: Util.createColor(0, 0, 0),
    });
    this.runButton.addChild(this.runText);
  }

  _onRunButtonTouch() {
    // this.runButton.element.enabled = false;
    this.runButton.element.opacity = 0;
    this.runText.element.opacity = 0;
    let playScene = SceneManager.getScene(GameConstant.SCENE_PLAY);
    playScene.fire(PlaySceneEvent.RunCar)
  }
  update() {
    super.update();
    let currentLevel = UserData.currentLevel;
    this.levelText.element.text = "Level " + currentLevel;
  }

  resize() {
    super.resize();
  }
}
