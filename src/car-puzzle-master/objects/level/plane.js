import { Entity, Vec2, Vec3 } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader"; 
import { BoxCollider } from "../../../physics/scripts/boxCollider";
import { CollisionTag } from "../../../physics/collisionTag";
import { GameConstant } from "../../../gameConstant"; 
import { SpawningEvent } from "../../scripts/spawners/spawningEvent"; 
import { BlockAreaManager } from "../blockArea/blockAreaManager"; 
import { Move } from "../../scripts/components/move";
import { PlayerController } from "../../scripts/controllers/playerController"; 
export class Plane extends Entity {
    constructor() {
        super("Plane");
        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseMap = AssetLoader.getAssetByKey("tex_ground_mat").resource
        this.material.diffuseMapTiling = new Vec2(1, 1);
        this.material.update()

        this.addComponent("model", {
            type: "plane",
            material: this.material,
        });
     
        
        this.on(SpawningEvent.Spawn, () => {
            // this.collider.enable();
            // this.collider.respawn();
            BlockAreaManager.instance.addRoadBlockArea(this.collider);
        });
    }

    config(data) {
        let pos = data.pos;
        let rot = data.rot;
        let scale = data.scale;
        this.setLocalPosition(pos.x, pos.y, pos.z);
        this.setLocalEulerAngles(rot.x, rot.y,rot.z);
        this.setLocalScale(scale.x, scale.y, scale.z);
    }
    
    onCollide() {
        // this.collider && this.collider.disable();
        // this.fire(SpawningEvent.Despawn);
    }
}