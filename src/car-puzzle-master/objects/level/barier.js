import { Entity, Vec3 } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { BoxCollider } from "../../../physics/scripts/boxCollider";
import { CollisionTag } from "../../../physics/collisionTag";
import { GameConstant } from "../../../gameConstant";
import { SpawningEvent } from "../../scripts/spawners/spawningEvent";
import { BlockAreaManager } from "../blockArea/blockAreaManager";
import { Move } from "../../scripts/components/move";
import { PlayerController } from "../../scripts/controllers/playerController";
export class barier extends Entity {
  constructor() {
    super("barier");
    this.barier = this.addComponent("model", {
      asset: AssetLoader.getAssetByKey("barier"),
    });

    this.key = "obstacle";
    this.addComponent("collision", {
      type: "box",
      halfExtents: new Vec3(0.2, 0.3, 0.5),
      linearOffset: new Vec3(0, 0.3, 0),
    });
    this.addComponent("rigidbody", {
      type: "static",
      restitution: 0.5,
      friction: 0.5,
    });
    this.collider = this.addScript(BoxCollider, {
      tag: CollisionTag.barier,
      render: GameConstant.DEBUG_COLLIDER,
      position: new Vec3(1, 0, 0),
      scale: new Vec3(1, 1, 1),
    });

    this.on(SpawningEvent.Spawn, () => {
      this.collider.enable();
      this.collider.respawn();
      BlockAreaManager.instance.addRoadBlockArea(this.collider);
    });
  }

  config(data) {
    let pos = data.pos;
    let rot = data.rot;
    let scale = data.scale;
    this.setLocalPosition(pos.x, pos.y, pos.z);
    this.setLocalEulerAngles(rot.x, rot.y, rot.z);
    this.setLocalScale(scale.x, scale.y, scale.z);

    }
  }



  

