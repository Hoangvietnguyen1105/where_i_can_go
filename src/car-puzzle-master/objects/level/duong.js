import { Entity } from "playcanvas";
import { AssetLoader } from "../../../assetLoader/assetLoader";
export class duong extends Entity {
    constructor(value) {
        super(value);
        value = value || "duong";
        this.addComponent("model", {
            asset: AssetLoader.getAssetByKey(value),
        });
        this.value = value;
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