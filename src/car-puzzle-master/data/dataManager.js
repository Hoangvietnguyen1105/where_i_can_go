import level1 from "../../../assets/jsons/level1.json";
import level2 from "../../../assets/jsons/level2.json";
import level3 from "../../../assets/jsons/level3.json";
import level4 from "../../../assets/jsons/level4.json";
import level5 from "../../../assets/jsons/level5.json";
import level6 from "../../../assets/jsons/level6.json";

import { DataLocal } from "./dataLocal";
import { Util } from "../../helpers/util";
import { UserData } from "./userData";
export class DataManager {
  static init() {
    this.levelDatas = [];
    this.levelDatas.push(level1);
    this.levelDatas.push(level2);
    this.levelDatas.push(level3);
    this.levelDatas.push(level4);;
    this.levelDatas.push(level5);
    this.levelDatas.push(level6);;
    this.currentLevel = DataLocal.currentLevel;
    UserData.init();
  }

  static getLevelData() {
    if (this.currentLevel >= this.levelDatas.length) {
      let randomIndex = Util.randomInt(0, 4);
      return this.levelDatas[randomIndex];
    }
    return this.levelDatas[UserData.currentLevel - 1];
  }

  static nextLevel() {
    this.currentLevel++;
    UserData.currentLevel = this.currentLevel;
    DataLocal.updateCurrentLevelData(this.currentLevel)
  }

}