var TARGET_WIDTH = 801; // Desired width
var TARGET_HEIGHT = 601;
var WIDTH; // Actual width of game, scaled to fit screen
var HEIGHT;
var GUI_HEIGHT = 150;
var DEBUG = false;
// WASD
var P1_UP = 87;
var P1_DOWN = 83;
var P1_LEFT = 65;
var P1_RIGHT = 68;
var P1_FIRE = 49; // Character 1

// Arrow keys
var P2_UP = 38;
var P2_DOWN = 40;
var P2_LEFT = 37;
var P2_RIGHT = 39;
var P2_FIRE = 189; // Character -

// Other settings
var TANK_SIZE = 15;
var TANK_SPEED = 1;
var TANK_TURN_SPEED = 5;
var WALL_WIDTH = 2;
var CELL_SIZE = 50;
var RESET_COUNTER_MAX = 200; // Time to start next round (frames)
var EPSILON = 0.001; // Used for comparing floats

// Optimization: skip collision checks between distant objects
// NOTE: This only works if there are no large objects in the scene
var MAX_DIST_FOR_COLLISIONS = 2; // (this is multiplied by CELL_SIZE)

// Global variables (Do not attempt to configure)
var TANK_P1, TANK_P2;
var CELLS_X, CELLS_Y;
var CANVAS, CTX, KEYSTATE, GAME_OBJECTS;
var PRERENDERED_CANVAS, PRERENDERED_CTX, PRERENDERED_REDRAW_NEEDED;
var GUI_REDRAW_NEEDED;
var END_ROUND = false;
var RESET_COUNTER;

var P1 = 1;
var P2 = 2;
var P1_SCORE = 0;
var P2_SCORE = 0;

// helper func
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}