import { Entity, Vec3 } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { BoxCollider } from "../../../physics/scripts/boxCollider";
import { CollisionTag } from "../../../physics/collisionTag";
import { GameConstant } from "../../../gameConstant";
import { SpawningEvent } from "../../scripts/spawners/spawningEvent";
import { BlockAreaManager } from "../blockArea/blockAreaManager";
import { Move } from "../../scripts/components/move";
import { PlayerController } from "../../scripts/controllers/playerController";
import { Util } from "../../../helpers/util";
export class xeCuuHoa extends Entity {
  constructor() {
    super("xe");
    let carName = null;
    let rand = Util.randomInt(1, 10);
    if (rand == 1) {
      carName = "ambulance";
    } else if (rand == 2) {
      carName = "delivery";
    } else if (rand == 3) {
      carName = "firetruck";
    } else if (rand == 4) {
      carName = "garbageTruck";
    } else if (rand == 5) {
      carName = "police";
    } else if (rand == 6) {
      carName = "race";
    } else if (rand == 7) {
      carName = "raceFuture";
    } else if (rand == 8) {
      carName = "taxi";
    } else if (rand == 9) {
      carName = "sedanSports";
    } else if (rand == 10) {
      carName = "truck";
    }
    this.xeCuuHoa = this.addComponent("model", {
      asset: AssetLoader.getAssetByKey(carName),
    });
    this.collider = this.addScript(BoxCollider, {
      tag: CollisionTag.Player,
      render: GameConstant.DEBUG_COLLIDER,
      position: new Vec3(0, 0, -0.561),
      scale: new Vec3(2, 1, 1),
    });

    this.on(SpawningEvent.Spawn, () => {
      this.collider.enable();
      this.collider.respawn();
      BlockAreaManager.instance.addRoadBlockArea(this.collider);
    });
    this.itemValue = "itemxeCuuHoa";

    this.controller = this.addScript(PlayerController, {
      collider: this.collider,
    });
  }

  config(data) {
    let pos = data.pos;
    let rot = data.rot;
    let scale = data.scale;
    this.setLocalPosition(pos.x, pos.y, pos.z);
    this.setLocalEulerAngles(rot.x, rot.y, rot.z);
    this.setLocalScale(scale.x, scale.y, scale.z);
    if (
      data.rot.x === GameConstant.ROT_UP.x &&
      data.rot.y === GameConstant.ROT_UP.y &&
      data.rot.z === GameConstant.ROT_UP.z
    ) {
      this.euler = "up";
      this.move = this.addScript(Move, {
        speed: new pc.Vec3(0, 0, 10),
      });
    } else if (
      data.rot.x === GameConstant.ROT_LEFT.x &&
      data.rot.y === GameConstant.ROT_LEFT.y &&
      data.rot.z === GameConstant.ROT_LEFT.z
    ) {
      this.euler = "left";
      console.log("a");
      this.move = this.addScript(Move, {
        speed: new pc.Vec3(10, 0, 0),
      });
    } else if (
      data.rot.x === GameConstant.ROT_DOWN.x &&
      data.rot.y === GameConstant.ROT_DOWN.y &&
      data.rot.z === GameConstant.ROT_DOWN.z
    ) {
      this.euler = "down";
      this.move = this.addScript(Move, {
        speed: new pc.Vec3(0, 0, -10),
      });
    } else {
      this.euler = "right";
      this.move = this.addScript(Move, {
        speed: new pc.Vec3(-10, 0, 0),
      });
    }
    this.move._initMoveEvent();
  }

  onCollide() {
    // this.collider && this.collider.disable();
    // this.fire(SpawningEvent.Despawn);
  }

  setRotate() {
    let nextRot = null;
    if (this.euler == "up") {
      nextRot = GameConstant.ROT_RIGHT;
      this.euler = "right";
    } else if (this.euler == "right") {
      nextRot = GameConstant.ROT_DOWN;
      this.euler = "down";
    } else if (this.euler == "down") {
      nextRot = GameConstant.ROT_LEFT;
      this.euler = "left";
    } else if (this.euler == "left") {
      nextRot = GameConstant.ROT_UP;
      this.euler = "up";
    }
    this.setLocalEulerAngles(nextRot.x, nextRot.y, nextRot.z);
    if (
      nextRot.x === GameConstant.ROT_UP.x &&
      nextRot.y === GameConstant.ROT_UP.y &&
      nextRot.z === GameConstant.ROT_UP.z
    ) {
      this.move.speed = new pc.Vec3(0, 0, 10);
    } else if (
      nextRot.x === GameConstant.ROT_LEFT.x &&
      nextRot.y === GameConstant.ROT_LEFT.y &&
      nextRot.z === GameConstant.ROT_LEFT.z
    ) {
      this.move.speed = new pc.Vec3(10, 0, 0);
    } else if (
      nextRot.x === GameConstant.ROT_DOWN.x &&
      nextRot.y === GameConstant.ROT_DOWN.y &&
      nextRot.z === GameConstant.ROT_DOWN.z
    ) {
      this.move.speed = new pc.Vec3(0, 0, -10);
    } else {
      this.move.speed = new pc.Vec3(-10, 0, 0);
    }
  }
}
