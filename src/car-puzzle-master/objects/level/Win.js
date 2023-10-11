import { Entity, Vec3 } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { BoxCollider } from "../../../physics/scripts/boxCollider";
import { CollisionTag } from "../../../physics/collisionTag";
import { GameConstant } from "../../../gameConstant";
import { SpawningEvent } from "../../scripts/spawners/spawningEvent";
import { BlockAreaManager } from "../blockArea/blockAreaManager";
import { Move } from "../../scripts/components/move";
import { PlayerController } from "../../scripts/controllers/playerController";
export class win extends Entity {
  constructor() {
    super("win");
    this.win = this.addComponent("model", {
      asset: AssetLoader.getAssetByKey("duong"),
    });
    this.collider = this.addScript(BoxCollider, {
      tag: CollisionTag.win,
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



  

