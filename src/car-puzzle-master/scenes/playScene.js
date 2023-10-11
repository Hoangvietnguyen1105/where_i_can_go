import {
  Color,
  Entity,
  LAYERID_UI,
  LAYERID_WORLD,
  LIGHTTYPE_DIRECTIONAL,
  PROJECTION_PERSPECTIVE,
  StandardMaterial,
  Vec2,
  Vec3,
} from "playcanvas";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../template/scene/scene";
import { PlayScreen } from "../ui/screens/playScreen";
import { DataManager } from "../data/dataManager";
import { Level } from "../objects/level/level";
import {
  TutorialScreen,
  TutorialScreenEvent,
} from "../ui/screens/tutorialScreen";
import { GameState, GameStateManager } from "../../template/gameStateManager";
import { Game } from "../../game";
import { GameManager, GameManagerEvent } from "../../template/gameManager";
import { InputHandler, InputHandlerEvent } from "../scripts/input/inputHandler";
import { Tween } from "../../template/systems/tween/tween";
import { LoseScreen, LoseScreenEvent } from "../ui/screens/loseScreen";
import { WinScreen, WinScreenEvent } from "../ui/screens/winScreen";
import { Util } from "../../helpers/util";
import { GameBackground } from "../../template/objects/gameBackground";
import { AssetLoader } from "../../assetLoader/assetLoader";
import { UserData } from "../data/userData";
import { DataLocal } from "../data/dataLocal";
import { xeCuuHoa } from "../objects/player/xecuuhoa";
import { Time } from "../../template/systems/time/time";
import { PlayerEvent } from "../scripts/controllers/playerController";
import { Sound } from "../../template/sound/sound";

export const PlaySceneEvent = Object.freeze({
  LevelLoaded: "levelLoaded",
  LevelWin: "levelWin",
  LevelLose: "levelLose",
  RunCar: "runCar",
  CountCar: "countCar",
  NextLevel: "nextLevel",
});
export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
  }

  create() {
    super.create();
    this.ui.addScreens(new PlayScreen(), new WinScreen());
    this.playScreen = this.ui.getScreen(GameConstant.SCREEN_PLAY);
    this.ui.setScreenActive(GameConstant.SCREEN_PLAY);
    this.on(PlaySceneEvent.RunCar, this.onRunCar, this);
    this.on(PlaySceneEvent.LevelLose, this._onLose, this);
    this.on(PlaySceneEvent.LevelWin, this._onWin, this);
    this.on(PlaySceneEvent.CountCar, this._onCountCar, this);
    this.on(PlaySceneEvent.NextLevel, this.nextLevel, this);
    this._initialize();

    this.isWin = false;
    this.isLose = false;
  }
  _initialize() {
    this._initLevel();
    this._initLight();
    this._initPlayer();
    this._initCamera();
    this._initInputHandler();
    this._initBg();
    this._initPlane();
    this._initRenderPhysics();
    Sound.play("theme");
  }

  // replay() {
  //   this._onReplayed();
  // }

  // _onReplayed() {
  //   Game.replay();
  //   this.sfxGameLose.stop();
  //   this.respawnLevel();
  // }

  _onStart() {}

  update(dt) {
    super.update(dt);
  }

  _initInputHandler() {
    let inputHandlerEntity = new Entity("input");
    this.inputHandler = inputHandlerEntity.addScript(InputHandler);
    this.addChild(inputHandlerEntity);

    this.inputHandler.on(
      InputHandlerEvent.PointerDown,
      this._onPointerDown,
      this
    );
  }

  _onPointerDown(e) {
    // if game started
    if (e.x) {
      this._doRayCast(e);
    } else {
      if (e.touches.length == 1) {
        this._doRayCast(e.touches[0]);
      }
      e.event.preventDefault();
    }
  }

  _doRayCast(screenPosition) {
    let from = this.mainCamera.getPosition();
    // The pc.Vec3 to raycast to
    let to = this.mainCamera.camera.screenToWorld(
      screenPosition.x,
      screenPosition.y,
      this.mainCamera.camera.farClip
    );

    // Raycast between the two points
    let result = Game.app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
      let entity = result.entity;
      if (entity.name === "xe" && entity.state != PlayerEvent.Run) {
        entity.fire(PlayerEvent.Rotate);
      }
    }
  }

  _onLose() {
    if (this.isLose == false) {
      this.isLose = true;
      setTimeout(() => {
        this.resetLevel();
        this.isLose = false;
      }, 3000);
    }
  }

  _onWin() {
    if (this.isWin == false) {
      this.isWin = true;
      setTimeout(() => {
        this.ui.disableAllScreens();
        this.ui.setScreenActive(GameConstant.SCREEN_WIN);
        let WinScreen = this.ui.getScreen(GameConstant.SCREEN_WIN);
        WinScreen.play();
      }, 3000);
    }
  }

  _onCountCar() {
    this.countCar++;
    console.log("car pass");
    if (this.countCar == this.cars.length) {
      this.fire(PlaySceneEvent.LevelWin);
    }
  }

  pause() {
    // this.gameManager?.pause();
    // this.musicBg.pause();
  }

  resume() {
    // this.gameManager?.resume();
    // this.musicBg.resume();
  }

  _initRenderPhysics() {
    if (GameConstant.DEBUB_PHYSICS) {
      this.addComponent("script");
      this.script.create("renderPhysics");
    }
  }

  _initPlane() {
    this.mainPlane = new Entity("plane");
    this.mainPlane.addComponent("model", {
      type: "plane",
    });
    this.mainPlane.setLocalScale(500, 0.1, 500);
    this.mainPlane.setLocalPosition(0, -0.2, 0);
    this.mainPlane.setLocalEulerAngles(0, 0, 0);
    this.grassMat = new StandardMaterial();
    this.grassMat.diffuseMap =
      AssetLoader.getAssetByKey("tex_ground1").resource;
    this.grassMat.diffuseMapTiling = new Vec2(20, 20);
    this.grassMat.update();
    this.mainPlane.model.material = this.grassMat;
    this.addChild(this.mainPlane);

    this.mainPlane.addComponent("collision", {
      type: "box",
      halfExtents: new Vec3(250, 0.1, 250),
    });
    this.mainPlane.addComponent("rigidbody", {
      type: "static",
      friction: 0.5,
      restitution: 0.5,
    });
  }

  _initLevel() {
    let levelData = DataManager.getLevelData();

    this.level = new Level();
    this.addChild(this.level);

    this.level.config(levelData);
    this.level.generate(levelData.levelData);

    this.cars = [];
    this.cars = this.level.cars;
    this.countCar = 0;
  }

  _onLevelLoaded() {
    this.fire(PlaySceneEvent.LevelLoaded);
    this.ui.setScreenActive(GameConstant.SCREEN_PLAY);
    this.ui.setScreenActive(GameConstant.SCREEN_TUTORIAL);
  }

  _initPlayer() {
    // this.car = new xeCuuHoa();
    // this.addChild(this.car);
    // this.car.config(DataManager.getLevelData().levelData[0]);
  }

  _initBg() {
    let topColor = [Util.createColor(111, 182, 226)];
    let bottomColor = [Util.createColor(131, 225, 173)];
    let textures = [];
    for (let i = 0; i < topColor.length; i++) {
      const texWidth = 256;
      const texHeight = 512;
      let texture = new pc.Texture(Game.app.graphicsDevice, {
        width: texWidth,
        height: texHeight,
        format: pc.PIXELFORMAT_R8_G8_B8,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
      });
      let pixels = texture.lock();

      var count = 0;
      var result = new pc.Color();

      const topPixelColor = topColor[i];
      const bottomPixelColor = bottomColor[i];

      for (var h = 0; h < texHeight; h++) {
        for (var w = 0; w < texWidth; w++) {
          result.lerp(topPixelColor, bottomPixelColor, h / (texHeight - 1));

          // assign the result color to each texture pixel:
          pixels[count++] = result.r * 255; // red
          pixels[count++] = result.g * 255; // green
          pixels[count++] = result.b * 255; // blue
        }
      }
      texture.unlock();
      textures.push(texture);
    }
    let texture = Util.randomFromList(textures);
    // let asset = AssetLoader.getAssetByKey(texture);
    this.bg = new GameBackground(texture);
    this.bg.setLocalEulerAngles(80, 0, 0);
    this.addChild(this.bg);
  }

  _initCamera() {
    this.mainCamera = new pc.Entity();
    this.addChild(this.mainCamera);
    this.mainCamera.addComponent("camera", {
      clearColor: Util.createColor(175, 233, 255),
      farClip: 1000,
      fov: 60,
      nearClip: 0.1,
      type: pc.PROJECTION_PERSPECTIVE,
      frustumCulling: false,
    });

    this.updateCamera();
  }

  // _initCameraController() {
  //   this.cameraController = this.mainCamera.addScript(CameraController, {
  //     target: this.player,
  //     speed: 3,
  //     offset: this.mainCamera.getPosition().clone(),
  //     limitX: GameConstant.CAMERA_LIMIT_X,
  //   });
  // }

  _initLight() {
    this.directionalLight = new Entity("light-directional");
    this.addChild(this.directionalLight);

    this.directionalLight.addComponent("light", {
      type: "directional",
      color: new Color(1, 1, 1),
      intensity: 0.75,
      castShadows: true,
      shadowBias: 0.1,
      normalOffsetBias: 0.4,
      shadowDistance: 70,
      shadowIntensity: 1,
      normalOffsetBias: 0.05,
      numCascades: 1,
      // cascadeDistribution: 0.5,
      shadowResolution: 1024,
      affectDynamic: true,
      shadowUpdateMode: pc.SHADOWUPDATE_REALTIME,
      shadowType: pc.SHADOW_PCF5,
    });
    this.directionalLight.setLocalPosition(2, 2, -2);
    this.directionalLight.setLocalEulerAngles(45, 135, 0);
  }

  onRunCar() {
    this.cars.forEach((car) => {
      car.move.isMoving = true;
      car.state = PlayerEvent.Run;
    });
  }

  resetLevel() {
    this.level.destroy();
    this._initLevel();
    let screenPlay = this.ui.getScreen(GameConstant.SCREEN_PLAY);
    screenPlay.runButton.element.opacity = 1;
    screenPlay.runText.element.opacity = 1;
  }

  nextLevel() {
    this.isWin = false;
    DataManager.nextLevel();
    this.level.destroy();
    this._initLevel();
    this.ui.disableAllScreens();
    let WinScreen = this.ui.getScreen(GameConstant.SCREEN_WIN);
    WinScreen.stop();
    this.ui.setScreenActive(GameConstant.SCREEN_PLAY);
    let screenPlay = this.ui.getScreen(GameConstant.SCREEN_PLAY);
    screenPlay.runButton.element.opacity = 1;
    screenPlay.runText.element.opacity = 1;
    this.updateCamera();
    
  }

  updateCamera() {
    if (UserData.currentLevel == 1) {
      this.mainCamera.setLocalPosition(5.67, 32.73, -24.417);
      this.mainCamera.setLocalEulerAngles(118.86, 0, 180);
    }
    if (UserData.currentLevel == 2) {
      this.mainCamera.setLocalPosition(0.798, 41.009, -34.534);
      this.mainCamera.setLocalEulerAngles(118.71, 0, -180);
    }
    if (UserData.currentLevel == 3) {
      this.mainCamera.setLocalPosition(0.798, 41.009,-26.349);
    this.mainCamera.setLocalEulerAngles(111.41, 0, -180);
    }
    if (UserData.currentLevel == 4 || UserData.currentLevel == 5) {
      this.mainCamera.setLocalPosition(0.798, 41.009,-24.039);
      this.mainCamera.setLocalEulerAngles(111.41, 0, -180);
    }

  }
}
