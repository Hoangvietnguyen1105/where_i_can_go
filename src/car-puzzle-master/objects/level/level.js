import { Entity, Vec3 } from "playcanvas";
import { ObjectType } from "./objectType";
import { Spawner } from "../../scripts/spawners/spawner";

import { SpawningEvent } from "../../scripts/spawners/spawningEvent";

import { Util } from "../../../helpers/util";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { GameConstant } from "../../../gameConstant";

import { duong } from "./duong";
import { turnLeft } from "./turnLeft";
import { turnrRight } from "./turnRight";
import { turnAround } from "./turnAround";
import { xeCuuHoa } from "../player/xecuuhoa";
import { house } from "./house";
import { win } from "./Win";
import { barier } from "./barier";
import { Plane } from "./plane";
export const LevelEndGameType = Object.freeze({
  Normal: "normal",
  BigBoss: "bigBoss",
  SoliderBoss: "soliderBoss",
});

export const ObjectGameType = Object.freeze({
  Duong: "duong",
  DuongCong: "duongcong",
  NgaTu: "ngatu",
  NgaBa: "ngaba",
  Left: "left",
  Right: "right",
  Around: "around",
  Xe: "xe",
  house:"small_buildingB",
  house1:"small_buildingE",
  house2:"house_type04",
  house3:"house_type08",
  house4:"house_type09",
  house5:"house_type10",
  house6:"house_type15",
  house7:"house_type19",
  win:'win',
  barier:'barier',
  plane:'plane'

});

export class Level extends Entity {
  constructor() {
    super();
    // this._initMaterial();
    this._initSpawner();
    this.numbers = [];
    this.roads = [];
    this.redDamages = [];
    this.walls = [];
    this.bigBoss = null;
    this.roadBlockAreas = [];
    this.wallBlockAreas = [];
    this.cars = [];
  }

  reset() {
    for (let i = this.children.length - 1; i >= 0; i--) {
      let obj = this.children[i];
      obj.fire(SpawningEvent.Despawn, obj);
    }
    this.numbers = [];
    this.roads = [];
    this.redDamages = [];
    this.walls = [];
    this.bigBoss = null;
    this.soliderBoss = null;
    this.wallBlockAreas = [];
    this.roadBlockAreas = [];
    this.car = [];
  }

  config(levelData) {
    this.bossValue = levelData.bossValue;
    this.wallCount = levelData.wallCount;
    this.targetDamage = levelData.targetDamage;
    this.endCardType = levelData.endCardType;
    this.firstOffset = 16;
    this.distanceBetweenEndWall = 20;
    this.endPathPoint = new Vec3(0, 0, 0);
  }

  generate(levelData) {
    for (let i = 0; i < levelData.length; i++) {
      const data = levelData[i];
      let obj = null;
      switch (data.tp) {
        case ObjectGameType.Duong:
          obj = this.createObj(ObjectGameType.Duong);
          obj.config(data);
          break;
        case ObjectGameType.NgaBa:
          obj = this.createObj(ObjectGameType.NgaBa);
          obj.config(data);
          break;
        case ObjectGameType.NgaTu:
          obj = this.createObj(ObjectGameType.NgaTu);
          obj.config(data);
          break;
        case ObjectGameType.DuongCong:
          obj = this.createObj(ObjectGameType.DuongCong);
          obj.config(data);
          break;
        case ObjectGameType.Left:
          obj = this.turnLeftSpawner.spawn();
          obj.config(data);
          break;
        case ObjectGameType.Right:
          obj = this.turnRightEntity.spawn();
          obj.config(data);
          break;
        case ObjectGameType.Around:
          obj = this.turnAroundSpawner.spawn();
          obj.config(data);
          break;
        case ObjectGameType.Xe:
          obj = this.CarSpawner.spawn();
          obj.config(data);
          this.cars.push(obj);
          break;
        case ObjectGameType.house:
         obj = this.houseSpawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house1:
         obj = this.house1Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house2:
         obj = this.house2Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house3:
         obj = this.house3Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house4:
         obj = this.house4Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house5:
         obj = this.house5Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house6:
         obj = this.house6Spawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.house7:
         obj = this.house7Spawner.spawn();
          obj.config(data);
          break;
        case ObjectGameType.win:
         obj = this.winSpawner.spawn();
          obj.config(data);
          break;
         case ObjectGameType.barier:
           obj = this.barierSpawner.spawn();
          obj.config(data);
          break;
        case ObjectGameType.plane:
           obj = this.planeSpawner.spawn();
          obj.config(data);
          break;
        default: {
          obj = new Entity();
          break;
        }
      }
      this.addChild(obj);
    }
  }

  createObj(value) {
    let spawner = this.getSpawner(value);
    let obj = spawner.spawn();
    return obj;
  }

  getSpawner(value) {
    switch (value) {
      case "duong":
        return this.duongSpawner;
      case "duongcong":
        return this.duongcongSpawner;
      case "ngatu":
        return this.ngatuSpawner;
      case "ngaba":
        return this.ngabaSpawner;
      case "house_type04":
        return this.houseSpawner
      
      default:
        return null;
    }
  }

  _initSpawner() {
    let duongEntity = new Entity("duongSpawner");
    this.addChild(duongEntity);
    this.duongSpawner = duongEntity.addScript(Spawner, {
      class: duong,
      poolSize: 10,
      args: ["duong"],
    });
    this.duongSpawner.initialize();
    this.duongSpawner.postInitialize();
    let ngabaEntity = new Entity("ngabaSpawner");
    this.addChild(ngabaEntity);
    this.ngabaSpawner = ngabaEntity.addScript(Spawner, {
      class: duong,
      poolSize: 10,
      args: ["ngaba"],
    });
    this.ngabaSpawner.initialize();
    this.ngabaSpawner.postInitialize();

    let duongcongEntity = new Entity("duongcongSpawner");
    this.addChild(duongcongEntity);
    this.duongcongSpawner = duongcongEntity.addScript(Spawner, {
      class: duong,
      poolSize: 10,
      args: ["duongcong"],
    });
    this.duongcongSpawner.initialize();
    this.duongcongSpawner.postInitialize();

    let ngatuEntity = new Entity("ngatuSpawner");
    this.addChild(ngatuEntity);
    this.ngatuSpawner = ngatuEntity.addScript(Spawner, {
      class: duong,
      poolSize: 10,
      args: ["ngatu"],
    });
    this.ngatuSpawner.initialize();
    this.ngatuSpawner.postInitialize();

    let turnLeftEntity = new Entity("turnLeftEntity");
    this.addChild(turnLeftEntity);
    this.turnLeftSpawner = turnLeftEntity.addScript(Spawner, {
      class: turnLeft,
      poolSize: 10,
      args: ["ngatu"],
    });
    let turnRightEntity = new Entity("turnRightEntity");
    this.addChild(turnRightEntity);
    this.turnRightEntity = turnRightEntity.addScript(Spawner, {
      class: turnrRight,
      poolSize: 10,
      args: ["ngatu"],
    });

    let turnAroundEntity = new Entity("turnAroundEntity");
    this.addChild(turnAroundEntity);
    this.turnAroundSpawner = turnAroundEntity.addScript(Spawner, {
      class: turnAround,
      poolSize: 10,
      args: ["ngatu"],
    });
    let Car = new Entity("Car");
    this.addChild(Car);
    this.CarSpawner = Car.addScript(Spawner, {
      class: xeCuuHoa,
      poolSize: 5,
      args: ["ngatu"],
    });

    
    let houseEntity = new Entity("duongcongSpawner");
    this.addChild(houseEntity);
    this.houseSpawner = houseEntity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house],
    });
    let house1Entity = new Entity("duongcongSpawner");
    this.addChild(house1Entity);
    this.house1Spawner = house1Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house1],
    });
    let house2Entity = new Entity("duongcongSpawner");
    this.addChild(house2Entity);
    this.house2Spawner = house2Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house2],
    });
    let house3Entity = new Entity("duongcongSpawner");
    this.addChild(house3Entity);
    this.house3Spawner = house3Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house3],
    });
    let house4Entity = new Entity("duongcongSpawner");
    this.addChild(house4Entity);
    this.house4Spawner = house4Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house4],
    });
    let house5Entity = new Entity("duongcongSpawner");
    this.addChild(house5Entity);
    this.house5Spawner = house5Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house5],
    });
    let house6Entity = new Entity("duongcongSpawner");
    this.addChild(house6Entity);
    this.house6Spawner = house6Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house6],
    });
    let house7Entity = new Entity("duongcongSpawner");
    this.addChild(house7Entity);
    this.house7Spawner = house7Entity.addScript(Spawner, {
      class: house,
      poolSize: 10,
      args: [ObjectGameType.house7],
    });

    let winEntity = new Entity("winEntity");
    this.addChild(winEntity);
    this.winSpawner = winEntity.addScript(Spawner, {
      class: win,
      poolSize:5,
    });

    let barierEntity = new Entity("barierEntity");
    this.addChild(barierEntity);
    this.barierSpawner = barierEntity.addScript(Spawner, {
      class: barier,
      poolSize:20,
    });

    let planeEntity = new Entity("planeEntity");
    this.addChild(planeEntity);
    this.planeSpawner = planeEntity.addScript(Spawner, {
      class: Plane,
      poolSize:5,
    });
  }
}
