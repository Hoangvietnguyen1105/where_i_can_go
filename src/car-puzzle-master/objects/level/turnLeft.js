import { Entity, Vec3, StandardMaterial } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { BoxCollider } from "../../../physics/scripts/boxCollider";
import { CollisionTag } from "../../../physics/collisionTag";
import { SpawningEvent } from "../../scripts/spawners/spawningEvent";
import { BlockAreaManager } from "../blockArea/blockAreaManager";
import { GameConstant } from "../../../gameConstant";
export class turnLeft extends Entity {
    constructor() {
        super("road");
        this.modelShow = new Entity("modelShow");
        this.material = new pc.StandardMaterial()
        this.material.diffuse = new pc.Color(31 / 255, 54 / 255, 97 / 255)
        this.material.diffuseMap = AssetLoader.getAssetByKey("retrai1").resource
        this.material.update()

        this.modelShow.addComponent("model", {
            type: "plane",
            material: this.material,
        });
        this.addChild(this.modelShow)
        this.modelShow.setLocalPosition(0, 0.1, 0)
        this.modelShow.setLocalScale(1.5, 1.5, 1.5)
        this.modelShow.setLocalEulerAngles(0, 180, 0)

        this.collider = this.addScript(BoxCollider, {
            tag: CollisionTag.turnLeft,
            render: GameConstant.DEBUG_COLLIDER,
            position: new Vec3(0, 0, 3),
            scale: new Vec3(1, 1, 1),
        });

        this.ignoreTurn = new pc.Entity()
        this.ignoreTurnColi = this.ignoreTurn.addScript(BoxCollider, {
            tag: CollisionTag.ignoreTurn,
            render: GameConstant.DEBUG_COLLIDER,
            position: new Vec3(0, 0, 0),
            scale: new Vec3(1, 1, 1),
        })
        this.addChild(this.ignoreTurn)
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
    onCollide() {
        // this.collider && this.collider.disable();
        //this.fire(SpawningEvent.Despawn);
    }
}