import { OnOff } from "./onOff";
import { Entity, Vec2, Vec4, Vec3, ELEMENTTYPE_IMAGE, ELEMENTTYPE_TEXT, Color } from "playcanvas";
import { AssetLoader } from "../../../../assetLoader/assetLoader";
import { ObjectFactory } from "../../../../template/objects/objectFactory";
import { Util } from "../../../../helpers/util";

export class Setting extends Entity {
    constructor() {
        super();
        this.addComponent("element", {
            type: ELEMENTTYPE_IMAGE,
            anchor: new Vec4(0, 0, 1, 1),
            pivot: new Vec2(0.5, 0.5),
            color: Util.createColor(0, 0, 0),
            opacity: 0.6,
        });

        Util.registerOnTouch(this.element, () => { });

        let asset = AssetLoader.getAssetByKey("frameCard");
        let frame = Util.getSpriteFrame(asset.resource, 0.75);

        this.main = new Entity();
        this.main.addComponent("element", {
            type: ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            spriteAsset: asset,
            width: frame.width,
            height: frame.height,
        });
        this.addChild(this.main);

        this.title = new Entity();
        this.title.addComponent("element", {
            type: ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.46, 0.86, 0.46, 0.86),
            pivot: new pc.Vec2(0.5, 0.5),
            fontAsset: AssetLoader.getAssetByKey("font_ariston_comic"),
            fontSize: 48,
            color: Color.WHITE,
            text: "SETTING!",
        });
        this.main.addChild(this.title);


        this.button_close = ObjectFactory.createImageElement("btn-x1", {
            anchor: new pc.Vec4(1, 1, 1, 1),
            pivot: new pc.Vec2(0.8, 0.8),
            scale: 0.35
        });
        this.main.addChild(this.button_close);

        Util.registerOnTouch(this.button_close.element, () => {
            this.fire("disableSeting");
        });

        this.frame = ObjectFactory.createImageElement("bg-morefun", {
            anchor: new pc.Vec4(0.5, 0.4, 0.5, 0.4),
            pivot: new pc.Vec2(0.5, 0.5),
            scale: 0.8
        });
        this.main.addChild(this.frame);

        let icon_music = ObjectFactory.createImageElement("ic-music", {
            anchor: new pc.Vec4(0.2, 0.7, 0.2, 0.7),
            pivot: new pc.Vec2(0.5, 0.5),
            scale: 0.4
        });
        this.frame.addChild(icon_music);

        let icon_sound = ObjectFactory.createImageElement("ic-sound", {
            anchor: new pc.Vec4(0.2, 0.3, 0.2, 0.3),
            pivot: new pc.Vec2(0.5, 0.5),
            scale: 0.4
        });
        this.frame.addChild(icon_sound);

        this.on_music = new OnOff(new Vec4(0.65, 0.7, 0.65, 0.7));
        this.frame.addChild(this.on_music);
        Util.registerOnTouch(this.on_music.element, () => {
            this.fire("musicSetting", this.on_music.setOnOff());

        });

        this.on_sound = new OnOff(new Vec4(0.65, 0.3, 0.65, 0.3));
        this.frame.addChild(this.on_sound);
        Util.registerOnTouch(this.on_sound.element, () => {
            this.fire("soundSetting", this.on_sound.setOnOff());
        }
        );
    }
}