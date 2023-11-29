export const GameConstant = Object.freeze({
  GAME_WIDTH: 720,
  GAME_HEIGHT: 1280,
  DEBUG_ON: true,
  DEBUG_CAMERA: false,
  DEBUG_FPS: false,
  DEBUG_COLLIDER: false,
  DEBUG_RAY: false,
  DEBUB_PHYSICS: false,

  PLATFORM_ANDROID: "android",
  PLATFORM_IOS: "ios",

  SCENE_PLAY: "PlayScene",
  SCENE_LOADING: "LoadingScene",

  SCREEN_PLAY: "PlayScreen",
  SCREEN_TUTORIAL: "TutorialScreen",
  SCREEN_LOADING: "LoadingScreen",
  SCREEN_LOSE: "LoseScreen",
  SCREEN_WIN: "WinScreen",

  GAME_SPEED: 7.5,
  PLAYER_SPEED: 10.3,
  PLAYER_START_NUMBER: 2,
  PLAYER_START_UPGRADE_NUMBER_MONEY: 200,
  PLAYER_START_UPGRADE_NUMBER_STEP: 1,
  PLAYER_START_INCOME: 1,
  PLAYER_START_UPGRADE_INCOME_MONEY: 500,
  PLAYER_START_UPGRADE_INCOME_STEP: 0.1,
  PLAYER_LIMIT_X: 5,
  PLAYER_DISTANCE_JUMP: 7,
  PLAYER_POS_Y: 0.5,
  PLAYER_POS_Y_DOWN: 0.38,
  SWIPE_MULTIPLIER: 0.01,
  CAMERA_LIMIT_X: 4,
  CAMERA_POSITION_Y: 7,
  CAMERA_POSITION_Z: -7,

  DISTANCE_BETWEEN_ROAD: 5,
  END_ROAD_BONUS: 15,

  SOLIDER_MOVE_SPEED: 3,
  SOLIDER_MOVE_DISTANCE: 7,
  LOADING_PROGRESS_DURATION: 3,
  TOTAL_MONEY_SPAWN: 10,

  INDEXEDDB_NAME: "PathWay Puzzle",
  INDEXEDDB_VERSION: 2,
  INDEXEDDB_STORE_NAME: "userData",
  INDEXEDDB_CURRENT_LEVEL_KEY: "currentLevel",
  INDEXEDDB_CURRENCY_KEY: "currency",
  INDEXEDDB_START_NUMBER_KEY: "startNumber",
  INDEXEDDB_INCOME_KEY: "incomeValue",

  LOADING_TEXT: "Loading...",
  LEVEL_TEXT: "Level ",
  DEFEAT_TEXT: "Defeat",
  COMPLETE_TEXT: "Complete",
  TRY_AGAIN_TEXT: "Try again",
  CONTINUE_TEXT: "Continue",

  ROT_RIGHT: {
    x: 0,
    y: -90,
    z: 0
  },
  ROT_LEFT: {
    x: 0,
    y: 90,
    z: 0
  },
  ROT_UP: {
    x: 0,
    y: 0,
    z: 0
  },
  ROT_DOWN: {
    x: -180,
    y: 0,
    z: 180
  },

  VIDEO_ADS_TIME_APPEAR: 180,
  VIDEO_ADS_COUNT_APPEAR: 1,
});
