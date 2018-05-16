// Other settings

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