import { Vec3 } from "playcanvas";
import { Script } from "../../../template/systems/script/script";
import { Time } from "../../../template/systems/time/time";
import { Tween } from "../../../template/systems/tween/tween";
import { GameConstant } from "../../../gameConstant";

export const Move = Script.createScript({
  name: "moveScript",
  attributes: {
    speed: { default: new Vec3() },
    multiplier: { default: 1 },
  },
  _initMoveEvent() {
    this.entity.on("right", this.moveRight, this);
    this.entity.on("left", this.moveLeft, this);
    this.entity.on("turnAround", this.turnAround, this);

    this.right = 0;
    this.isMoving = false;
  },
  moveRight() {
    let rotX = this.entity.getEulerAngles().x;
    let rotY = this.entity.getEulerAngles().y;
    let rotZ = this.entity.getEulerAngles().z;
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    if (this.entity.euler === "up") {
      this.entity.euler = "right";
      (rotX = 0), (rotY = 0), (rotZ = 0);
      targetX = 0;
      targetY = -90;
      targetZ = 0;
    } else if (this.entity.euler === "right") {
      this.entity.euler = "down";
      (rotX = 0), (rotY = -90), (rotZ = 0);
      targetX = 0;
      targetY = -180;
      targetZ = 0;
    } else if (this.entity.euler === "down") {
      this.entity.euler = "left";
      (rotX = 0), (rotY = 180), (rotZ = 0);
      targetX = 0;
      targetY = 90;
      targetZ = 0;
    } else if (this.entity.euler === "left") {
      this.entity.euler = "up";
      (rotX = 0), (rotY = 90), (rotZ = 0);
      targetX = 0;
      targetY = 0;
      targetZ = 0;
    }

    let curveY = new pc.Curve([0, rotY, 1, targetY]);
    let curveX = new pc.Curve([0, rotX, 1, targetX]);
    let curveZ = new pc.Curve([0, rotZ, 1, targetZ]);

    Tween.createCountTween({
      duration: 0.2,
      onUpdate: (dt) => {
        let dataX = curveX.value(dt.percent);
        let dataY = curveY.value(dt.percent);
        let dataZ = curveZ.value(dt.percent);

        this.entity.setEulerAngles(dataX, dataY, dataZ);
      },
    }).start();
    if (this.speed.z === 10) {
      this.speed = new Vec3(-10, 0, 0);
    } else if (this.speed.z === -10) {
      this.speed = new Vec3(10, 0, 0);
    } else if (this.speed.x === 10) {
      this.speed = new Vec3(0, 0, 10);
    } else if (this.speed.x === -10) {
      this.speed = new Vec3(0, 0, -10);
    }
  },

  moveLeft() {
    let rotX = this.entity.getEulerAngles().x;
    let rotY = this.entity.getEulerAngles().y;
    let rotZ = this.entity.getEulerAngles().z;
    let targetX = GameConstant.ROT_DOWN.x;
    let targetY = GameConstant.ROT_DOWN.y;
    let targetZ = GameConstant.ROT_DOWN.z;
    if (this.entity.euler === "up") {
      this.entity.euler = "left";
      (rotX = 0), (rotY = 0), (rotZ = 0);
      targetX = 0;
      targetY = 90;
      targetZ = 0;
      this.speed = new Vec3(10, 0, 0);
    } else if (this.entity.euler === "right") {
      this.entity.euler = "up";
      (rotX = 0), (rotY = -90), (rotZ = 0);
      targetX = 0;
      targetY = 0;
      targetZ = 0;
      this.speed = new Vec3(0, 0, 10);
    } else if (this.entity.euler === "down") {
      this.entity.euler = "right";
      (rotX = 0), (rotY = 180), (rotZ = 0);
      targetX = 0;
      targetY = 270;
      targetZ = 0;
      this.speed = new Vec3(-10, 0, 0);
    } else if (this.entity.euler === "left") {
      this.entity.euler = "down";
      (rotX = 0), (rotY = 90), (rotZ = 0);
      targetX = 0;
      targetY = 180;
      targetZ = 0;
      this.speed = new Vec3(0, 0, -10);
    }
    let curveY = new pc.Curve([0, rotY, 1, targetY]);
    let curveX = new pc.Curve([0, rotX, 1, targetX]);
    let curveZ = new pc.Curve([0, rotZ, 1, targetZ]);

    Tween.createCountTween({
      duration: 0.2,
      onUpdate: (dt) => {
        let dataX = curveX.value(dt.percent);
        let dataY = curveY.value(dt.percent);
        let dataZ = curveZ.value(dt.percent);

        this.entity.setEulerAngles(dataX, dataY, dataZ);
      },
    }).start();
  },
  turnAround() {
    this.moveRight();
    this.moveRight();
  },

  update() {

    if (!this.isMoving) return;

    let pos = this.entity.getLocalPosition();
    pos.x += this.speed.x * this.multiplier * Time.dt;
    pos.y += this.speed.y * this.multiplier * Time.dt;
    pos.z += this.speed.z * this.multiplier * Time.dt;
    this.entity.setLocalPosition(pos);
  },
});
