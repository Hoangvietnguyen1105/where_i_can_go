import { Curve, Entity } from "playcanvas";
import { AssetLoader } from "../../assetLoader/assetLoader";
import { Tween } from "../systems/tween/tween";

export class Sound {
  static playSound = true;
  static playMusic = true;
  static isFadeOut = false;
  static initSound(app) {
    this.soundEntity = new Entity("sound");
    this.soundEntity.addComponent("sound");
    app.root.addChild(this.soundEntity);

    // this.soundEntity.sound.addSlot("theme", {
    //   asset: AssetLoader.getAssetByKey("theme"),
    //   pitch: 1,
    //   volume: 1,
    //   loop: true,
    //   autoPlay: false,
    //   overlap: true,
    // });

    this.soundEntity.sound.addSlot("crash", {
      asset: AssetLoader.getAssetByKey("crash"),
      pitch: 1,
      volume: 1,
      loop: false,
      autoPlay: false,
      overlap: true,
    });
    this.soundEntity.sound.addSlot("sfx_civic_idle", {
      asset: AssetLoader.getAssetByKey("crash"),
      pitch: 1,
      volume: 1,
      loop: false,
      autoPlay: false,
      overlap: true,
    });

  }

  static play(soundName) {
    if (Sound.playSound == true || Sound.playMusic == true) {
      if (soundName == "theme" && Sound.playMusic == true) {
        this.soundEntity.sound.play(soundName);
        return;
      }

      if (soundName != "theme" && Sound.playSound == true) {
        this.soundEntity.sound.play(soundName);
        return;
      }
    }
    Sound.setVolume(soundName, 0);
  }

  static stop(soundName) {
    this.soundEntity.sound.stop(soundName);
  }

  static setPitch(soundName, pitch = 1) {
    let slot = this.soundEntity.sound.slot(soundName);
    slot.pitch = pitch;
  }

  static setVolume(soundName, volume = 1) {
    let slot = this.soundEntity.sound.slot(soundName);
    for (let i = 0; i < slot.instances.length; i++) {
      slot.instances[i].volume = volume;
    }
  }

  static fadeOut(soundName, duration = 2) {
    Sound.isFadeOut = true;
    let slot = this.soundEntity.sound.slot(soundName);
    let currentVolume = null;
    if (slot.instances.length > 0) {
      currentVolume = slot.instances[0].volume;
    } else {
      currentVolume = slot.volume;
    }
    let curveVolume = new Curve([0, 0.01, 0.1, currentVolume, 1, 0]);

    Tween.createCountTween({
      duration: duration,
      onUpdate: (dt) => {
        for (let i = 0; i < slot.instances.length; i++) {
          slot.instances[i].volume = curveVolume.value(dt.percent);
        }
      },
      onComplete: () => {
        Sound.stop(soundName);
        Sound.isFadeOut = false;
      },
    }).start();
  }

  static musicOff() {
    Sound.setVolume("theme", 0);
    Sound.playMusic = false;
  }

  static musicOn() {
    Sound.playMusic = true;
    Sound.setVolume("theme", 1);
  }

  static soundOff() {
    Sound.setVolume("crash", 0);
    Sound.playSound = false;
  }

  static soundOn() {
    Sound.playSound = true;
    Sound.setVolume("crash", 1);
  }

  static muteAll() {
    if (Sound.isFadeOut) return;
    this.tmpPlayMusic = Sound.playMusic ? true : false;
    this.tmpPlaySound = Sound.playSound ? true : false;
    Sound.musicOff();
    Sound.soundOff();
  }

  static unmuteAll() {
    if (this.tmpPlayMusic) Sound.musicOn();
    if (this.tmpPlaySound) Sound.soundOn();
  }
}
