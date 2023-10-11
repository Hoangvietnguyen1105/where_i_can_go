import { BLEND_NORMAL, StandardMaterial, Texture } from "playcanvas";
import { AssetLoader } from "../../assetLoader/assetLoader";
import { Game } from "../../game";
import { Util } from "../../helpers/util";

export class AssetConfigurator {
  static config() {
    // this._createCanvasFont();
    // this._configRoad();
    // this._configNumberMaterials();
    // this._configWallEndGameMaterial();
    // this._configFinishLine();
    // this._configBoss();
    // this._configMapObjects();

    this.configRoad();
    this.configAmbulanceCar();
    this.configDeliveryCar();
    this.configFireTruck();
    this.configHouse();
    this.configBuilding();
    this.configBarrier();
  }

  static configBarrier() {
    let matBarrier = new StandardMaterial();
    matBarrier.diffuse = Util.createColor(172, 172, 172);
    matBarrier.update();
    this.setModelMaterial("barier", matBarrier, 0);
  }
  static configBuilding() {
    let _defaultMat = new StandardMaterial();
    _defaultMat.diffuse = Util.createColor(255, 255, 255);
    _defaultMat.update();

    let border = new StandardMaterial();
    border.diffuse = Util.createColor(142, 144, 153);
    border.update();

    let door = new StandardMaterial();
    door.diffuse = Util.createColor(98, 102, 114);
    door.update();

    let roof = new StandardMaterial();
    roof.diffuse = Util.createColor(86, 188, 153);
    roof.update();

    let window = new StandardMaterial();
    window.diffuse = Util.createColor(188, 226, 255);
    window.update();

    this.setModelMaterial("small_buildingB", border, 0);
    this.setModelMaterial("small_buildingB", _defaultMat, 1);
    this.setModelMaterial("small_buildingB", window, 2);
    this.setModelMaterial("small_buildingB", door, 3);

    this.setModelMaterial("small_buildingE", border, 0);
    this.setModelMaterial("small_buildingE", door, 1);
    this.setModelMaterial("small_buildingE", _defaultMat, 2);
    this.setModelMaterial("small_buildingE", window, 3);
    this.setModelMaterial("small_buildingE", roof, 4);
  }

  static configHouse() {
    let _defaultMat = new StandardMaterial();
    _defaultMat.diffuse = Util.createColor(242, 95, 74);
    _defaultMat.update();

    let border = new StandardMaterial();
    border.diffuse = Util.createColor(142, 144, 153);
    border.update();

    let door = new StandardMaterial();
    door.diffuse = Util.createColor(98, 102, 114);
    door.update();

    let roof = new StandardMaterial();
    roof.diffuse = Util.createColor(86, 188, 153);
    roof.update();

    let window = new StandardMaterial();
    window.diffuse = Util.createColor(188, 226, 255);
    window.update();

    this.setModelMaterial("house_type15", _defaultMat, 2);
    this.setModelMaterial("house_type15", border, 0);
    this.setModelMaterial("house_type15", window, 1);
    this.setModelMaterial("house_type15", door, 3);
    this.setModelMaterial("house_type15", roof, 4);

    this.setModelMaterial("house_type08", border, 0);
    this.setModelMaterial("house_type08", window, 1);
    this.setModelMaterial("house_type08", _defaultMat, 2);
    this.setModelMaterial("house_type08", roof, 3);
    this.setModelMaterial("house_type08", door, 4);

    this.setModelMaterial("house_type09", border, 0);
    this.setModelMaterial("house_type09", window, 1);
    this.setModelMaterial("house_type09", roof, 2);
    this.setModelMaterial("house_type09", _defaultMat, 3);
    this.setModelMaterial("house_type09", door, 4);

    this.setModelMaterial("house_type10", border, 0);
    this.setModelMaterial("house_type10", door, 1);
    this.setModelMaterial("house_type10", _defaultMat, 2);
    this.setModelMaterial("house_type10", window, 3);
    this.setModelMaterial("house_type10", roof, 4);

    this.setModelMaterial("house_type04", border, 0);
    this.setModelMaterial("house_type04", door, 1);
    this.setModelMaterial("house_type04", window, 2);
    this.setModelMaterial("house_type04", roof, 3);
    this.setModelMaterial("house_type04", _defaultMat, 4);

    this.setModelMaterial("house_type19", border, 0);
    this.setModelMaterial("house_type19", window, 1);
    this.setModelMaterial("house_type19", door, 2);
    this.setModelMaterial("house_type19", _defaultMat, 3);

  }

  static configFireTruck() {
    let mat0 = new StandardMaterial();
    mat0.diffuse = Util.createColor(255, 255, 255);
    mat0.update();
    this.setModelMaterial("firetruck", mat0, 9);
    this.setModelMaterial("firetruck", mat0, 12);
    this.setModelMaterial("firetruck", mat0, 15);
    this.setModelMaterial("firetruck", mat0, 18);
    this.setModelMaterial("firetruck", mat0, 21);

    let mat1 = new StandardMaterial();
    mat1.diffuse = Util.createColor(61, 61, 61);
    mat1.update();
    this.setModelMaterial("firetruck", mat1, 3);
    this.setModelMaterial("firetruck", mat1, 11);
    this.setModelMaterial("firetruck", mat1, 14);
    this.setModelMaterial("firetruck", mat1, 17);
    this.setModelMaterial("firetruck", mat1, 20);

    let mat2 = new StandardMaterial();
    mat2.diffuse = Util.createColor(255, 89, 58);
    mat2.update();
    this.setModelMaterial("firetruck", mat2, 0);

    let mat3 = new StandardMaterial();
    mat3.diffuse = Util.createColor(91, 177, 255);
    mat3.update();
    this.setModelMaterial("firetruck", mat3, 6);
    this.setModelMaterial("firetruck", mat3, 10);

    let mat4 = new StandardMaterial();
    mat4.diffuse = Util.createColor(244, 184, 66);
    mat4.update();
    this.setModelMaterial("firetruck", mat4, 4);

    let mat5 = new StandardMaterial();
    mat5.diffuse = Util.createColor(255, 58, 91);
    mat5.update();
    this.setModelMaterial("firetruck", mat5, 1);

    let mat6 = new StandardMaterial();
    mat6.diffuse = Util.createColor(96, 96, 96);
    mat6.update();
    this.setModelMaterial("firetruck", mat6, 2);
    this.setModelMaterial("firetruck", mat6, 8);
    this.setModelMaterial("firetruck", mat6, 13);
    this.setModelMaterial("firetruck", mat6, 16);
    this.setModelMaterial("firetruck", mat6, 19);
    this.setModelMaterial("firetruck", mat6, 22);

    let mat7 = new StandardMaterial();
    mat7.diffuse = Util.createColor(239, 239, 239);
    mat7.update();
    this.setModelMaterial("firetruck", mat7, 5);
  }

  static configDeliveryCar() {
    let mat0 = new StandardMaterial();
    mat0.diffuse = Util.createColor(255, 255, 255);
    mat0.update();

    this.setModelMaterial("delivery", mat0, 5);
    this.setModelMaterial("delivery", mat0, 9);
    this.setModelMaterial("delivery", mat0, 11);
    this.setModelMaterial("delivery", mat0, 14);
    this.setModelMaterial("delivery", mat0, 17);
    this.setModelMaterial("delivery", mat0, 20);

    let mat1 = new StandardMaterial();
    mat1.diffuse = Util.createColor(61, 61, 61);
    mat1.update();
    this.setModelMaterial("delivery", mat1, 4);
    this.setModelMaterial("delivery", mat1, 8);
    this.setModelMaterial("delivery", mat1, 10);
    this.setModelMaterial("delivery", mat1, 13);
    this.setModelMaterial("delivery", mat1, 16);
    this.setModelMaterial("delivery", mat1, 19);

    let mat2 = new StandardMaterial();
    mat2.diffuse = Util.createColor(255, 89, 58);
    mat2.update();
    this.setModelMaterial("delivery", mat2, 0);

    let mat3 = new StandardMaterial();
    mat3.diffuse = Util.createColor(244, 184, 66);
    mat3.update();
    this.setModelMaterial("delivery", mat3, 6);

    let mat4 = new StandardMaterial();
    mat4.diffuse = Util.createColor(62, 226, 134);
    mat4.update();
    this.setModelMaterial("delivery", mat4, 1);

    let mat5 = new StandardMaterial();
    mat5.diffuse = Util.createColor(228, 230, 246);
    mat5.update();
    this.setModelMaterial("delivery", mat5, 2);

    let mat6 = new StandardMaterial();
    mat6.diffuse = Util.createColor(96, 96, 96);
    mat6.update();
    this.setModelMaterial("delivery", mat6, 3);
    this.setModelMaterial("delivery", mat6, 12);
    this.setModelMaterial("delivery", mat6, 15);
    this.setModelMaterial("delivery", mat6, 18);
    this.setModelMaterial("delivery", mat6, 21);

    let mat7 = new StandardMaterial();
    mat7.diffuse = Util.createColor(239, 239, 239);
    mat7.update();
    this.setModelMaterial("delivery", mat7, 7);
  }

  static configRoad() {
    let mat1 = new StandardMaterial();
    mat1.diffuse = Util.createColor(110, 116, 135);
    mat1.update();

    let mat2 = new StandardMaterial();
    mat2.diffuse = Util.createColor(82, 86, 100);
    mat2.update();

    let mat3 = new StandardMaterial();
    mat3.diffuse = Util.createColor(140, 147, 172);
    mat3.update();

    let mat4 = new StandardMaterial();
    mat4.diffuse = Util.createColor(193, 193, 204);
    mat4.update();

    this.setModelMaterial("duong", mat4, 0);
    this.setModelMaterial("duong", mat1, 1);
    this.setModelMaterial("duong", mat2, 2);
    this.setModelMaterial("duong", mat3, 3);

    this.setModelMaterial("duongcong", mat4, 0);
    this.setModelMaterial("duongcong", mat1, 1);
    this.setModelMaterial("duongcong", mat2, 2);
    this.setModelMaterial("duongcong", mat3, 3);

    this.setModelMaterial("duongcuttron", mat4, 0);
    this.setModelMaterial("duongcuttron", mat3, 1);
    this.setModelMaterial("duongcuttron", mat1, 2);
    this.setModelMaterial("duongcuttron", mat2, 3);

    this.setModelMaterial("duongcutvuong", mat4, 0);
    this.setModelMaterial("duongcutvuong", mat2, 1);
    this.setModelMaterial("duongcutvuong", mat3, 2);
    this.setModelMaterial("duongcutvuong", mat1, 3);

    this.setModelMaterial("ngaba", mat1, 0);
    this.setModelMaterial("ngaba", mat4, 1);
    this.setModelMaterial("ngaba", mat2, 2);
    this.setModelMaterial("ngaba", mat3, 3);

    this.setModelMaterial("ngatu", mat3, 0);
    this.setModelMaterial("ngatu", mat1, 1);
    this.setModelMaterial("ngatu", mat2, 2);
    this.setModelMaterial("ngatu", mat4, 3);

    let mat5 = new StandardMaterial();
    mat5.diffuse = Util.createColor(255, 255, 255);
    mat5.update();

    this.setModelMaterial("duongcutvuong", mat4, 0);
    this.setModelMaterial("duongcutvuong", mat1, 1);
    this.setModelMaterial("duongcutvuong", mat2, 2);
    this.setModelMaterial("duongcutvuong", mat3, 3);
  }

  static configAmbulanceCar() {
    let _defaultMat = new StandardMaterial();
    _defaultMat.diffuse = Util.createColor(255, 255, 255);
    _defaultMat.update();

    this.setModelMaterial("ambulance", _defaultMat, 4);
    this.setModelMaterial("ambulance", _defaultMat, 17);
    this.setModelMaterial("ambulance", _defaultMat, 20);
    this.setModelMaterial("ambulance", _defaultMat, 23);
    this.setModelMaterial("ambulance", _defaultMat, 26);

    let carTire = new StandardMaterial();
    carTire.diffuse = Util.createColor(61, 61, 61);
    carTire.update();

    this.setModelMaterial("ambulance", carTire, 3);
    this.setModelMaterial("ambulance", carTire, 16);
    this.setModelMaterial("ambulance", carTire, 19);
    this.setModelMaterial("ambulance", carTire, 22);
    this.setModelMaterial("ambulance", carTire, 25);

    let lightBlue = new StandardMaterial();
    lightBlue.diffuse = Util.createColor(91, 177, 255);
    lightBlue.update();
    this.setModelMaterial("ambulance", lightBlue, 7);

    let lightFront = new StandardMaterial();
    lightFront.diffuse = Util.createColor(244, 184, 66);
    lightFront.update();
    this.setModelMaterial("ambulance", lightFront, 5);

    let paintRed = new StandardMaterial();
    paintRed.diffuse = Util.createColor(255, 58, 91);
    paintRed.update();
    this.setModelMaterial("ambulance", paintRed, 1);
    this.setModelMaterial("ambulance", paintRed, 11);
    this.setModelMaterial("ambulance", paintRed, 15);

    let paintWhite = new StandardMaterial();
    paintWhite.diffuse = Util.createColor(228, 230, 246);
    paintWhite.update();
    this.setModelMaterial("ambulance", paintWhite, 0);
    this.setModelMaterial("ambulance", paintWhite, 8);
    this.setModelMaterial("ambulance", paintWhite, 12);

    let plastic = new StandardMaterial();
    plastic.diffuse = Util.createColor(96, 96, 96);
    plastic.update();
    this.setModelMaterial("ambulance", plastic, 2);
    this.setModelMaterial("ambulance", plastic, 9);
    this.setModelMaterial("ambulance", plastic, 13);
    this.setModelMaterial("ambulance", plastic, 18);
    this.setModelMaterial("ambulance", plastic, 21);
    this.setModelMaterial("ambulance", plastic, 24);
    this.setModelMaterial("ambulance", plastic, 27);

    let window = new StandardMaterial();
    window.diffuse = Util.createColor(239, 239, 239);
    window.update();
    this.setModelMaterial("ambulance", window, 6);
    this.setModelMaterial("ambulance", window, 10);
    this.setModelMaterial("ambulance", window, 14);

    this.setModelMaterial("garbageTruck", _defaultMat, 5);
    this.setModelMaterial("garbageTruck", _defaultMat, 14);
    this.setModelMaterial("garbageTruck", _defaultMat, 17);
    this.setModelMaterial("garbageTruck", carTire, 4);
    this.setModelMaterial("garbageTruck", carTire, 10);
    this.setModelMaterial("garbageTruck", carTire, 13);
    this.setModelMaterial("garbageTruck", carTire, 16);
    this.setModelMaterial("garbageTruck", carTire, 19);

    let lightBack = new StandardMaterial();
    lightBack.diffuse = Util.createColor(255, 89, 58);
    lightBack.update();
    this.setModelMaterial("garbageTruck", lightBack, 9);
    this.setModelMaterial("garbageTruck", lightFront, 6);
    let paintGreen = new StandardMaterial();
    paintGreen.diffuse = Util.createColor(62, 226, 134);
    paintGreen.update();
    this.setModelMaterial("garbageTruck", paintGreen, 0);
    this.setModelMaterial("garbageTruck", paintGreen, 2);
    this.setModelMaterial("garbageTruck", paintWhite, 7);
    this.setModelMaterial("garbageTruck", plastic, 21);
    this.setModelMaterial("garbageTruck", plastic, 18);
    this.setModelMaterial("garbageTruck", plastic, 15);
    this.setModelMaterial("garbageTruck", plastic, 12);
    this.setModelMaterial("garbageTruck", plastic, 3);
    this.setModelMaterial("garbageTruck", plastic, 1);
    this.setModelMaterial("garbageTruck", window, 8);

    this.setModelMaterial("police", _defaultMat, 2);
    this.setModelMaterial("police", _defaultMat, 9);
    this.setModelMaterial("police", carTire, 5);
    this.setModelMaterial("police", carTire, 12);
    this.setModelMaterial("police", carTire, 14);
    this.setModelMaterial("police", carTire, 16);
    this.setModelMaterial("police", carTire, 18);
    this.setModelMaterial("police", lightBack, 4);
    this.setModelMaterial("police", lightBack, 10);
    this.setModelMaterial("police", lightBlue, 7);
    this.setModelMaterial("police", lightBlue, 11);
    this.setModelMaterial("police", lightFront, 3);
    this.setModelMaterial("police", paintWhite, 0);
    this.setModelMaterial("police", plastic, 1);
    this.setModelMaterial("police", plastic, 8);
    this.setModelMaterial("police", plastic, 13);
    this.setModelMaterial("police", plastic, 15);
    this.setModelMaterial("police", plastic, 17);
    this.setModelMaterial("police", plastic, 19);
    this.setModelMaterial("police", window, 6);

    this.setModelMaterial("race", _defaultMat, 3);
    this.setModelMaterial("race", carTire, 4);
    this.setModelMaterial("race", carTire, 7);
    this.setModelMaterial("race", carTire, 10);
    this.setModelMaterial("race", carTire, 13);
    this.setModelMaterial("race", paintRed, 0);
    let paintYellow = new StandardMaterial();
    paintYellow.diffuse = Util.createColor(255, 188, 66);
    paintYellow.update();
    this.setModelMaterial("race", paintYellow, 6);
    this.setModelMaterial("race", paintYellow, 9);
    this.setModelMaterial("race", paintYellow, 12);
    this.setModelMaterial("race", paintYellow, 15);
    this.setModelMaterial("race", plastic, 1);
    this.setModelMaterial("race", plastic, 5);
    this.setModelMaterial("race", plastic, 8);
    this.setModelMaterial("race", plastic, 11);
    this.setModelMaterial("race", plastic, 14);
    this.setModelMaterial("race", window, 2);

    this.setModelMaterial("raceFuture", _defaultMat, 2);
    this.setModelMaterial("raceFuture", carTire, 4);
    this.setModelMaterial("raceFuture", carTire, 7);
    this.setModelMaterial("raceFuture", carTire, 10);
    this.setModelMaterial("raceFuture", carTire, 13);
    let paintBlue = new StandardMaterial();
    paintBlue.diffuse = Util.createColor(105, 121, 216);
    this.setModelMaterial("raceFuture", paintBlue, 1);
    this.setModelMaterial("raceFuture", paintYellow, 6);
    this.setModelMaterial("raceFuture", paintYellow, 9);
    this.setModelMaterial("raceFuture", paintYellow, 12);
    this.setModelMaterial("raceFuture", paintYellow, 15);
    this.setModelMaterial("raceFuture", plastic, 0);
    this.setModelMaterial("raceFuture", plastic, 5);
    this.setModelMaterial("raceFuture", plastic, 8);
    this.setModelMaterial("raceFuture", plastic, 11);
    this.setModelMaterial("raceFuture", plastic, 14);
    this.setModelMaterial("raceFuture", window, 3);

    this.setModelMaterial("sedanSports", _defaultMat, 3);
    this.setModelMaterial("sedanSports", _defaultMat, 11);
    this.setModelMaterial("sedanSports", _defaultMat, 14);
    this.setModelMaterial("sedanSports", _defaultMat, 17);
    this.setModelMaterial("sedanSports", _defaultMat, 20);
    this.setModelMaterial("sedanSports", carTire, 1);
    this.setModelMaterial("sedanSports", carTire, 7);
    this.setModelMaterial("sedanSports", carTire, 9);
    this.setModelMaterial("sedanSports", carTire, 12);
    this.setModelMaterial("sedanSports", carTire, 15);
    this.setModelMaterial("sedanSports", carTire, 18);
    this.setModelMaterial("sedanSports", lightBack, 4);
    this.setModelMaterial("sedanSports", lightFront, 6);
    this.setModelMaterial("sedanSports", paintRed, 2);
    this.setModelMaterial("sedanSports", paintRed, 8);
    this.setModelMaterial("sedanSports", plastic, 0);
    let wheelInside = new StandardMaterial();
    wheelInside.diffuse = Util.createColor(202, 205, 214);
    wheelInside.update();
    this.setModelMaterial("sedanSports", wheelInside, 10);
    this.setModelMaterial("sedanSports", wheelInside, 13);
    this.setModelMaterial("sedanSports", wheelInside, 16);
    this.setModelMaterial("sedanSports", wheelInside, 19);
    this.setModelMaterial("sedanSports", window, 4);

    this.setModelMaterial("taxi", _defaultMat, 4);
    this.setModelMaterial("taxi", carTire, 1);
    this.setModelMaterial("taxi", carTire, 8);
    this.setModelMaterial("taxi", carTire, 10);
    this.setModelMaterial("taxi", carTire, 12);
    this.setModelMaterial("taxi", carTire, 14);
    this.setModelMaterial("taxi", lightBack, 6);
    this.setModelMaterial("taxi", lightFront, 3);
    this.setModelMaterial("taxi", paintYellow, 2);
    this.setModelMaterial("taxi", plastic, 0);
    this.setModelMaterial("taxi", plastic, 9);
    this.setModelMaterial("taxi", plastic, 11);
    this.setModelMaterial("taxi", plastic, 13);
    this.setModelMaterial("taxi", plastic, 15);
    this.setModelMaterial("taxi", wheelInside, 7);
    this.setModelMaterial("taxi", window, 5);

    this.setModelMaterial("truck", _defaultMat, 4);
    this.setModelMaterial("truck", _defaultMat, 9);
    this.setModelMaterial("truck", _defaultMat, 12);
    this.setModelMaterial("truck", _defaultMat, 15);
    this.setModelMaterial("truck", _defaultMat, 18);
    this.setModelMaterial("truck", carTire, 1);
    this.setModelMaterial("truck", carTire, 7);
    this.setModelMaterial("truck", carTire, 10);
    this.setModelMaterial("truck", carTire, 13);
    this.setModelMaterial("truck", carTire, 16);
    this.setModelMaterial("truck", lightBack, 5);
    this.setModelMaterial("truck", lightFront, 3);
    this.setModelMaterial("truck", paintGreen, 2);
    this.setModelMaterial("truck", plastic, 0);
    this.setModelMaterial("truck", wheelInside, 8);
    this.setModelMaterial("truck", wheelInside, 11);
    this.setModelMaterial("truck", wheelInside, 14);
    this.setModelMaterial("truck", wheelInside, 17);
    this.setModelMaterial("truck", window, 6);
  }

  static _createCanvasFont() {
    AssetLoader.createCanvasFont("Arial", 106, "bold");
  }

  static _configMapObjects() {
    // let mat = new StandardMaterial();
    // let tex = AssetLoader.getAssetByKey("tex_road").resource;
    // mat.diffuseMap = tex;
    // this.setModelMaterial("model_wall", mat, 0);
    // this.setModelMaterial("model_red_damage", mat, 0);
    // this.setModelMaterial("model_middle_wall", mat, 0);
    // this.setModelMaterial("model_jump", mat, 0);
    // this.setModelMaterial("model_sawBlade", mat, 0);
  }

  static _configNumberMaterials() {
    // let texRed = AssetLoader.getAssetByKey("tex_red_number").resource;
    // let matRed = new StandardMaterial();
    // matRed.diffuseMap = texRed;
    // AssetLoader.registerAsset(matRed, "mat_red_number", "material");

    // let texBlue = AssetLoader.getAssetByKey("tex_blue_number").resource;
    // let matBlue = new StandardMaterial();
    // matBlue.diffuseMap = texBlue;
    // AssetLoader.registerAsset(matBlue, "mat_blue_number", "material");
    // this.setModelMaterial("model_0", matBlue, 0);
    // this.setModelMaterial("model_1", matBlue, 0);
    // this.setModelMaterial("model_2", matBlue, 0);
    // this.setModelMaterial("model_3", matBlue, 0);
    // this.setModelMaterial("model_4", matBlue, 0);
    // this.setModelMaterial("model_5", matBlue, 0);
    // this.setModelMaterial("model_6", matBlue, 0);
    // this.setModelMaterial("model_7", matBlue, 0);
    // this.setModelMaterial("model_8", matBlue, 0);
    // this.setModelMaterial("model_9", matBlue, 0);
  }

  static _configWallEndGameMaterial() {
    // let texGradient = AssetLoader.getAssetByKey("tex_gradient").resource;
    // let matRed = new StandardMaterial();
    // matRed.diffuseTint = true;
    // matRed.diffuse = Util.createColor(255, 2, 0);
    // matRed.opacityMap = texGradient;
    // matRed.blendType = BLEND_NORMAL;
    // matRed.opacityMapChannel = "r";
    // matRed.depthWrite = false;
    // AssetLoader.registerAsset(matRed, "mat_red_wall", "material");

    // let matGreen = new StandardMaterial();
    // matGreen.diffuseTint = true;
    // matGreen.diffuse = Util.createColor(83, 255, 0);
    // matGreen.opacityMap = texGradient;
    // matGreen.blendType = BLEND_NORMAL;
    // matGreen.opacityMapChannel = "g";
    // matGreen.depthWrite = false;
    // AssetLoader.registerAsset(matGreen, "mat_green_wall", "material");

    // let mat1 = new StandardMaterial();
    // mat1.diffuseTint = true;
    // mat1.diffuse = Util.createColor(255, 255, 13);
    // mat1.opacityMap = texGradient;
    // mat1.blendType = BLEND_NORMAL;
    // mat1.opacityMapChannel = "r";
    // mat1.depthWrite = false;
    // AssetLoader.registerAsset(mat1, "mat_1_wall", "material");

    // let mat2 = new StandardMaterial();
    // mat2.diffuseTint = true;
    // mat2.diffuse = Util.createColor(215, 255, 20);
    // mat2.opacityMap = texGradient;
    // mat2.blendType = BLEND_NORMAL;
    // mat2.opacityMapChannel = "r";
    // mat2.depthWrite = false;
    // AssetLoader.registerAsset(mat2, "mat_2_wall", "material");

    // let mat3 = new StandardMaterial();
    // mat3.diffuseTint = true;
    // mat3.diffuse = Util.createColor(174, 255, 26);
    // mat3.opacityMap = texGradient;
    // mat3.blendType = BLEND_NORMAL;
    // mat3.opacityMapChannel = "r";
    // mat3.depthWrite = false;
    // AssetLoader.registerAsset(mat3, "mat_3_wall", "material");

    // let mat4 = new StandardMaterial();
    // mat4.diffuseTint = true;
    // mat4.diffuse = Util.createColor(134, 255, 33);
    // mat4.opacityMap = texGradient;
    // mat4.blendType = BLEND_NORMAL;
    // mat4.opacityMapChannel = "r";
    // mat4.depthWrite = false;
    // AssetLoader.registerAsset(mat4, "mat_4_wall", "material");

    // let mat5 = new StandardMaterial();
    // mat5.diffuseTint = true;
    // mat5.diffuse = Util.createColor(94, 255, 39);
    // mat5.opacityMap = texGradient;
    // mat5.blendType = BLEND_NORMAL;
    // mat5.opacityMapChannel = "r";
    // mat5.depthWrite = false;
    // AssetLoader.registerAsset(mat5, "mat_5_wall", "material");

    // let mat6 = new StandardMaterial();
    // mat6.diffuseTint = true;
    // mat6.diffuse = Util.createColor(63, 255, 44);
    // mat6.opacityMap = texGradient;
    // mat6.blendType = BLEND_NORMAL;
    // mat6.opacityMapChannel = "r";
    // mat6.depthWrite = false;
    // AssetLoader.registerAsset(mat6, "mat_6_wall", "material");

    // let mat7 = new StandardMaterial();
    // mat7.diffuseTint = true;
    // mat7.diffuse = Util.createColor(101, 255, 38);
    // mat7.opacityMap = texGradient;
    // mat7.blendType = BLEND_NORMAL;
    // mat7.opacityMapChannel = "r";
    // mat7.depthWrite = false;
    // AssetLoader.registerAsset(mat7, "mat_7_wall", "material");

    // let mat8 = new StandardMaterial();
    // mat8.diffuseTint = true;
    // mat8.diffuse = Util.createColor(140, 255, 32);
    // mat8.opacityMap = texGradient;
    // mat8.blendType = BLEND_NORMAL;
    // mat8.opacityMapChannel = "r";
    // mat8.depthWrite = false;
    // AssetLoader.registerAsset(mat8, "mat_8_wall", "material");

    // let mat9 = new StandardMaterial();
    // mat9.diffuseTint = true;
    // mat9.diffuse = Util.createColor(178, 255, 25);
    // mat9.opacityMap = texGradient;
    // mat9.blendType = BLEND_NORMAL;
    // mat9.opacityMapChannel = "r";
    // mat9.depthWrite = false;
    // AssetLoader.registerAsset(mat9, "mat_9_wall", "material");

    // let mat10 = new StandardMaterial();
    // mat10.diffuseTint = true;
    // mat10.diffuse = Util.createColor(217, 255, 19);
    // mat10.opacityMap = texGradient;
    // mat10.blendType = BLEND_NORMAL;
    // mat10.opacityMapChannel = "r";
    // mat10.depthWrite = false;
    // AssetLoader.registerAsset(mat10, "mat_10_wall", "material");
  }

  static _configRoad() {
    // let mat = new StandardMaterial();
    // let tex = AssetLoader.getAssetByKey("tex_road").resource;
    // mat.diffuseMap = tex;
    // this.setModelMaterial("model_road", mat, 0);
  }

  static _configBoss() {
    // let mat = new StandardMaterial();
    // let tex = AssetLoader.getAssetByKey("tex_road").resource;
    // mat.diffuseMap = tex;
    // this.setModelMaterialInRange("model_bigBoss", mat, 0, 2);
    // this.setModelMaterial("model_solider_boss", mat, 0);
  }

  static _configFinishLine() {
    // let mat = new StandardMaterial();
    // let tex = AssetLoader.getAssetByKey("tex_finish_line").resource;
    // mat.diffuseMap = tex;
    // mat.diffuseMapTiling.set(3, 0.37);
    // this.setModelMaterial("model_finish_line", mat, 0);
  }

  static _configSkyboxCubemap() {
    let textures = [
      AssetLoader.getAssetByKey("tex_skybox_right"),
      AssetLoader.getAssetByKey("tex_skybox_left"),
      AssetLoader.getAssetByKey("tex_skybox_up"),
      AssetLoader.getAssetByKey("tex_skybox_down"),
      AssetLoader.getAssetByKey("tex_skybox_front"),
      AssetLoader.getAssetByKey("tex_skybox_back"),
    ];
    let cmSkybox = new Texture(Game.app.graphicsDevice, {
      cubemap: true,
    });
    cmSkybox.setSource(textures.map((texture) => texture.resource.getSource()));
    AssetLoader.registerAsset(cmSkybox, "cm_skybox", "cubemap");
  }

  /**
   * @param {pc.Texture} texture
   */
  static setTextureFiltering(texture, filter = FILTER_NEAREST, address = ADDRESS_REPEAT) {
    texture.minFilter = filter;
    texture.magFilter = filter;
    texture.addressU = address;
    texture.addressV = address;
  }

  static setSpriteSlice(spriteAsset, border = new Vec4(), pixelsPerUnit = 1) {
    let asset = AssetLoader.getAssetByKey(spriteAsset);
    asset.resource.renderMode = SPRITE_RENDERMODE_SLICED;
    this.setSpriteBorder(asset, border.x, border.y, border.z, border.w);
    this.setSpritePixelsPerUnit(spriteAsset, pixelsPerUnit);
  }

  static setSpriteBorder(spriteAsset, left = 0, bottom = 0, right = 0, top = 0) {
    let sprite = AssetLoader.getAssetByKey(spriteAsset).resource;
    sprite.atlas.frames[sprite.frameKeys[0]].border.set(left, bottom, right, top);
  }

  static setSpritePixelsPerUnit(spriteAsset, pixelsPerUnit = 100) {
    let sprite = AssetLoader.getAssetByKey(spriteAsset).resource;
    sprite.pixelsPerUnit = pixelsPerUnit;
  }

  static setModelTexture(modelAsset, textureAsset, index = 0) {
    let material = this.getMaterial(modelAsset, index);
    let texture = AssetLoader.getAssetByKey(textureAsset);
    material.diffuseMap = texture.resource;
  }

  static setModelDiffuse(modelAsset, color, index = 0) {
    let material = this.getMaterial(modelAsset, index);
    material.diffuse.copy(color);
    material.diffuseTint = true;
  }

  static setModelMaterial(modelAsset, material, index = 0) {
    let model = AssetLoader.getAssetByKey(modelAsset).resource;
    model.meshInstances[index].material = material;
  }

  static setModelMaterialInRange(modelAsset, material, startIndex, endIndex) {
    for (var i = startIndex; i <= endIndex; i++) {
      this.setModelMaterial(modelAsset, material, i);
    }
  }

  static setModelMaterialWithIndexes(modelAsset, material, indexes = []) {
    indexes.forEach((index) => {
      this.setModelMaterial(modelAsset, material, index);
    });
  }

  static createColorMaterial(r = 255, g = 255, b = 255, a = 1) {
    let material = new StandardMaterial();
    if (typeof r === "object") {
      material.diffuse = r;
    }
    else {
      material.diffuse = Util.createColor(r, g, b, a);
    }
    return material;
  }

  /**
   * @param {string} modelName
   * @returns {pc.StandardMaterial}
   */
  static getMaterial(modelName, index = 0) {
    let model = AssetLoader.getAssetByKey(modelName);
    let material = model.resource.meshInstances[index].material;

    if (material.id === 1) { // default material
      material = new StandardMaterial();
      model.resource.meshInstances[index].material = material;
    }

    return material;
  }
}