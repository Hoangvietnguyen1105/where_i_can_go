import { CollisionEvent } from "../../../physics/collissionEvent";
import { Script } from "../../../template/systems/script/script";
import { CollisionTag } from "../../../physics/collisionTag";
import { GameConstant } from "../../../gameConstant";
import { Tween } from "../../../template/systems/tween/tween";
import { Vec3, log, math } from "playcanvas";
import { Util } from "../../../helpers/util";
import { SpawningEvent } from "../spawners/spawningEvent";
import { DataManager } from "../../data/dataManager";
import { UserData } from "../../data/userData";
import { Time } from "../../../template/systems/time/time";
import { SceneManager } from "../../../template/scene/sceneManager";
import { PlaySceneEvent } from "../../scenes/playScene";
import { Sound } from "../../../template/sound/sound";

export const PlayerState = Object.freeze({
  Run: "run",
  Wait: "wait",
  Crash: "crash",
  Win: "win",
  Lose: "lose",
});

export const PlayerEvent = Object.freeze({
  Crash: "Crash",
  Run: "Run",
  Win: "Win",
  Lose: "Lose",
  Rotate: "Rotate",
});

export const PlayerController = Script.createScript({
  name: "playerController",
  attributes: {
    move: { default: null },
    collider: { default: null },
    swipeMovement: { default: null },
    soliderSpawner: { default: null },
    blockAreas: { default: [] },
  },

  initialize() {
    this.entity.state = PlayerState.Wait;

    this.entity.addComponent("collision", {
      type: "box",
      halfExtents: new Vec3(0.5, 0.5, 1),
      linearOffset: new Vec3(0, 0.65, 0),
    });
    this.entity.addComponent("rigidbody", {
      type: "kinematic",
      mass: 1,
      linearDamping: 0.5,
      angularDamping: 0.5,
      friction: 0.5,
      restitution: 0.5,
    });

    this.entity.collision.on("collisionstart", this.onTriggerEnter, this);
    this.entity.on(PlayerEvent.Run, this.onRun, this);
    this.entity.on(PlayerEvent.Crash, this.onCrash, this);
    this.entity.on(PlayerEvent.Rotate, this.entity.setRotate, this.entity);

    this.collider.on(CollisionEvent.OnCollide, this.onCollide, this);
    this.collider.on(CollisionEvent.NotCollide, this.notCollide, this);
    this.reset();
  },

  reset() {},

  update() {},

  onRun() {},

  onTriggerEnter(e) {
    let other = e.other;
    if (other.name == "xe" || other.key == "house" || other.key == "obstacle") {
      this.entity.move.isMoving = false;
      this.entity.fire(PlayerEvent.Crash);
    }
  },

  onCrash() {
    this.entity.state = PlayerState.Crash;


    Sound.play("crash");
    this.entity.removeComponent("rigidbody");

    this.entity.addComponent("rigidbody", {
      type: "dynamic",
      mass: 1,
      linearDamping: 0.5,
      angularDamping: 0.5,
      friction: 0.5,
      restitution: 1,
    });

    let currentAngle = this.entity.getLocalEulerAngles().y;
    let angle = currentAngle * math.DEG_TO_RAD;
    let x = Math.cos(angle);
    let z = Math.sin(angle);

    let rand1 = Util.randomInt(-5, 5);
    let rand2 = Util.randomInt(-5, 5);
    if (x == 1 || x == -1) {
      this.entity.rigidbody.applyImpulse(rand1, 20, x * 10);
      this.entity.rigidbody.applyTorqueImpulse(0, 0, rand1 / 2);
    } else {
      this.entity.rigidbody.applyImpulse(z * 10, 10, rand2);
      this.entity.rigidbody.applyTorqueImpulse(rand2 / 2, 0, 0);
    }

    let playScene = SceneManager.getScene(GameConstant.SCENE_PLAY);
    playScene.fire(PlaySceneEvent.LevelLose);
  },

  onCollide(other) {
    if (other.tag === CollisionTag.MapObject) {
    } else if (other.tag === CollisionTag.turnLeft) {
      this.turnLeft(other);
    } else if (other.tag === CollisionTag.ignoreTurn) {
      this.ignoreColission(other);
    } else if (other.tag === CollisionTag.turnRight) {
      this.turnRight(other);
    } else if (other.tag === CollisionTag.turnAround) {
      this.turnAround(other);
    } else if (other.tag === CollisionTag.win) {
      this.onWin(other);
    }
  },
  ignoreColission(other) {
    this.entity.enableColi = other.entity.parent;
  },

  onWin(other) {
    if (other.entity === this.entity.ignoreColission) {
      return;
    }
    this.entity.ignoreColission = other.entity;
    this.entity.state = PlayerState.Win;
    let playScene = SceneManager.getScene(GameConstant.SCENE_PLAY);
    playScene.fire(PlaySceneEvent.CountCar);
  },

  turnLeft(other) {
    if (other.entity === this.entity.ignoreColission) {
      return;
    }
    if (other.entity !== this.entity.enableColi) {
      return;
    }
    this.entity.ignoreColission = other.entity;
    this.entity.fire("left");
  },
  turnRight(other) {
    if (other.entity === this.entity.ignoreColission) {
      return;
    }
    if (other.entity !== this.entity.enableColi) {
      return;
    }
    this.entity.ignoreColission = other.entity;
    this.entity.fire("right");
  },
  turnAround(other) {
    if (other.entity === this.entity.ignoreColission) {
      return;
    }
    if (other.entity !== this.entity.enableColi) {
      return;
    }
    this.entity.ignoreColission = other.entity;
    this.entity.fire("turnAround");
  },
});
