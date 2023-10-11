import { Entity, Vec3 } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
export class house extends Entity {
    constructor(value) {
        super(value);
        this.key = "house";
        value = value || "house";
        this.addComponent("model", {
            asset: AssetLoader.getAssetByKey(value),
        });
        this.value = value;

        this.addComponent("collision", {
            type: "box",
            halfExtents: new Vec3(2.4, 1.2, 2.45),
            linearOffset: new Vec3(0, 1.2, 0)
        });

        this.addComponent("rigidbody", {
            type: "static",
            friction: 0.5,
            restitution: 0.5,
        });
    }

    config(data) {
        this.value = data.value;
        let pos = data.pos;
        let rot = data.rot;
        let scale = data.scale;
        this.setLocalPosition(pos.x, pos.y, pos.z);
        this.setLocalEulerAngles(rot.x, rot.y, rot.z);
        this.setLocalScale(scale.x, scale.y, scale.z);
    }

    updateMaterial(material) {
        this.model.meshInstances[0].material = material;
    }
}