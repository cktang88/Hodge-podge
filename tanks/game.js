var TankGame = (function() {
  /*
  ===============================================================================
  ----------------------------COLLISION DETECTION--------------------------------
  ===============================================================================
  */

  /*
  ===============================================================================
  ---------------------------------MAIN FUNCTIONS--------------------------------
  ===============================================================================
  */

  function fitToWindow() {
    /*
      Scales the game if the browser window is too small.
    */
    let screen_margin = 10;
    WIDTH = Math.min(TARGET_WIDTH, window.innerWidth - screen_margin);
    HEIGHT = Math.min(TARGET_HEIGHT, window.innerHeight - screen_margin - 300);
    WIDTH = Math.max(WIDTH, 100);
    HEIGHT = Math.max(HEIGHT, 100);

    CANVAS.width = WIDTH;
    CANVAS.height = HEIGHT + GUI_HEIGHT;

    PRERENDERED_CANVAS.width = WIDTH;
    PRERENDERED_CANVAS.height = HEIGHT + GUI_HEIGHT;
  }

  function main() {
    /*
      Creates a new HTML5 canvas element, adds listeners for input and
      contains the main loop.
    */
    CANVAS = document.createElement("canvas");
    CTX = CANVAS.getContext("2d");

    // Initialize another canvas for quickly drawing static objects
    PRERENDERED_CANVAS = document.createElement("canvas");
    PRERENDERED_CTX = PRERENDERED_CANVAS.getContext("2d");

    fitToWindow(); // Set the size of both canvas

    // Attempt to find a document element with specific id, otherwise attach the
    // canvas to document body.
    attach_to = document.getElementById('game_window');
    if (attach_to == null) attach_to = document.body;
    attach_to.appendChild(CANVAS);

    // Add listeners for keydown and keyup
    KEYSTATE = {};
    document.addEventListener("keydown", function(evt) {
      if([32, 37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
          evt.preventDefault(); // Prevent scrolling with arrowkeys and spacebar
      }
      KEYSTATE[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function(evt) {
      delete KEYSTATE[evt.keyCode];
    });

    init();
    RESET_COUNTER = 0;

    var previous_time = Date.now(); // Time in milliseconds
    var frames = 0;
    var iteration_time = 0;

    var loop = function() {
      /*
        The main loop where all the magic happens.
      */
      var start_time = Date.now();
      // Step the game forwards and draw everything
      spawn_powerup();
      update();
      draw();
      iteration_time += Date.now() - start_time;

      // FPS-counter for performance analysis
      if (DEBUG) {
        frames++;
        if (Date.now() - previous_time > 1000) {
          console.log(frames + "  :  " + (iteration_time/frames));
          previous_time = Date.now();
          iteration_time = 0;
          frames = 0;
        }
      }


      // Start a new round if necessary
      if (END_ROUND === true) RESET_COUNTER++;
      if (RESET_COUNTER > RESET_COUNTER_MAX) {
        init();
        END_ROUND = false;
        RESET_COUNTER = 0;
      }

      // Wait for the browser to finish drawing before looping again
      window.requestAnimationFrame(loop, CANVAS);
    };
    window.requestAnimationFrame(loop, CANVAS);
  }

  function spawn_powerup() {
    // Randomly spawns a random powerup to the level
    this.max_spawn_time = 50000; // Max time between spawns (Milliseconds)
    if (typeof this.last_spawn == 'undefined') {
      this.last_spawn = Date.now();
      this.next_spawn_in = Math.random() * this.max_spawn_time;
    }
    if (Date.now() - this.last_spawn > this.next_spawn_in) {
      this.last_spawn = Date.now();
      this.next_spawn_in = Math.random() * this.max_spawn_time;
      let pos = get_random_location();
      new Powerup(pos.x, pos.y, PowerupType.get_random_type());
    }
  }

  function get_random_location() {
    // Gets a location, which is in the middle of a random cell.
    var x = (Math.floor(Math.random() * CELLS_X) + 0.5) * (CELL_SIZE);
    var y = (Math.floor(Math.random() * CELLS_Y) + 0.5) * (CELL_SIZE);
    return new Vector2d(x, y);
  }

  function init() {
    /*
      Initialize global variables.
    */
    GAME_OBJECTS = [];
    KEYSTATE = {}; // Reset the keystate to avoid stuck buttons
    PRERENDERED_REDRAW_NEEDED = true;
    GUI_REDRAW_NEEDED = true;

    fitToWindow(); // Rescale the game window, if necessary

    // Generate map
    maze_generator_kruskal();

    // Create tanks at random locations

    let pos = get_random_location();
    TANK_P1 = new Tank(pos.x, pos.y, P1);
    let pos2 = pos;
    while (pos.x == pos2.x && pos.y == pos2.y) {
      pos2 = get_random_location();
    }
    TANK_P2 = new Tank(pos2.x, pos2.y, P2);
  }

  function update() {
    /*
      Handles game logic by moving all objects and checking collisions.
    */
    for (obj_ind in GAME_OBJECTS) {
      obj = GAME_OBJECTS[obj_ind];
      obj.update();
    }
  }

  function draw() {
    /*
      Handles all drawing on the HTML5 canvas.
    */

    // Game
    CTX.fillStyle = "#fff";
    CTX.clearRect(0, 0, WIDTH, HEIGHT);

    // Redraw static objects only if they have been changed
    if (PRERENDERED_REDRAW_NEEDED) {
      PRERENDERED_CTX.fillStyle = "#fff";
      PRERENDERED_CTX.clearRect(0, 0, WIDTH, HEIGHT);
      PRERENDERED_REDRAW_NEEDED = false;
      for (obj_ind in GAME_OBJECTS) {
        obj = GAME_OBJECTS[obj_ind];
        if (obj.movable === false) {
          obj.draw(PRERENDERED_CTX);
        }
      }
    }

    // Draw prerendered static objects
    CTX.drawImage(PRERENDERED_CANVAS, 0, 0);

    // Draw other objects
    for (obj_ind in GAME_OBJECTS) {
      obj = GAME_OBJECTS[obj_ind];
      if (obj.movable === true) {
        obj.draw(CTX);
      }
    }

    // GUI
    if (GUI_REDRAW_NEEDED || END_ROUND) {
      GUI_REDRAW_NEEDED = false;
      var P2_offset_x = WIDTH - 270;
      CTX.save();
      CTX.translate(0, HEIGHT); // Move to GUI space
      CTX.fillStyle = "#fff";
      CTX.clearRect(0, 0, WIDTH, GUI_HEIGHT);
      CTX.font = "30px Arial";
      CTX.fillStyle = (P1_SCORE >= P2_SCORE) ? "green" : "red";
      CTX.fillText("Player One: " + P1_SCORE, 30, 50);
      CTX.fillStyle = (P2_SCORE >= P1_SCORE) ? "green" : "red";
      CTX.fillText("Player Two: " + P2_SCORE, P2_offset_x, 50);
      if (END_ROUND === true) {
        CTX.fillStyle = "blue";
        CTX.fillText("Next round in: " + (RESET_COUNTER_MAX - RESET_COUNTER), P2_offset_x/2, 50);
      }
      CTX.fillStyle = "#000";
      CTX.font = "16px Arial";
      CTX.fillText("Move: WASD", 30, 80);
      CTX.fillText("Fire: 1", 30, 100);
      CTX.fillText("Move: Arrow keys", P2_offset_x, 80);
      CTX.fillText("Fire: -", P2_offset_x, 100);
      CTX.font = "bold " + CTX.font;
      CTX.fillText("Weapon: " + TANK_P1.gun.get_name(), 30, 120);
      CTX.fillText("Ammo remaining: " + TANK_P1.gun.get_ammo_str(), 30, 140);
      CTX.fillText("Weapon: " + TANK_P2.gun.get_name(), P2_offset_x, 120);
      CTX.fillText("Ammo remaining: " + TANK_P2.gun.get_ammo_str(), P2_offset_x, 140);
      CTX.restore();
    }
  }





  /*
  ===============================================================================
  ---------------------------------MAP GENERATION--------------------------------
  ===============================================================================
  */

  function maze_generator_kruskal() {
    /*
      Uses randomized Kruskal's algorithm to generate a maze.
      https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Kruskal.27s_algorithm

      Normally this algorithm generates 'perfect' mazes, with only one route
      from end to beginning. For gameplay reasons multiple routes through the
      maze is preferred. This is achieved by randomly deleting additional walls.
    */

    class Cell {
      constructor(x, y, i, j) {
        this.ind_x = i;
        this.ind_y = j;
        this.x = x;
        this.y = y;
        this.right_wall = true;
        this.bottom_wall = true;
      }
    };

    function shuffle(a) {
      /*
        Shuffles array in place.
        Taken from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
        because I'm lazy and it is a perfectly fine function.
      */
      var j, x, i;
      for (var i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }

    function find_cell_set(cell, sets) {
      // Finds the set where the given cell is found.
      for (set in sets) {
        if (sets[set].has(cell)) return set;
      }
    }

    function join_cell_sets(cell_1, cell_2, sets) {
      /*
        Checks if given cells are in different sets, joins the sets and returns
        true. Otherwise returns false.
      */
      set_ind1 = find_cell_set(cell_1, sets);
      set_ind2 = find_cell_set(cell_2, sets);
      if (!(set_ind1 === set_ind2)) {
        var joined_set = new Set(function*() {
          yield* sets[set_ind1]; yield* sets[set_ind2]; }()
        );
        delete sets[set_ind1];
        delete sets[set_ind2];
        sets.push(joined_set);
        return true;
      }
      return false;
    }
    cell_size_min = 30;
    cell_size_max = 100;
    rand = Math.random();
    CELL_SIZE = 30 + (rand * (100-30)); // A random number between min and max
    CELL_SIZE = Math.floor(CELL_SIZE);
    console.log(CELL_SIZE);
    console.log(CELL_SIZE % 5);
    CELL_SIZE -= CELL_SIZE % 5;
    console.log(CELL_SIZE);

    // Create cells to assist with maze generation
    var cells = [];
    CELLS_X = Math.floor(WIDTH / CELL_SIZE);
    CELLS_Y = Math.floor(HEIGHT / CELL_SIZE);
    for (var i = 0; i < CELLS_X; i++) {
      var x = i * CELL_SIZE + CELL_SIZE / 2;
      var column = []

      for (var j = 0; j < CELLS_Y; j++) {
        var y = j * CELL_SIZE + CELL_SIZE / 2;
        new_cell = new Cell(x, y, i, j);
        column[j] = new_cell;
      }
      cells[i] = column;
    }

    // Add all walls to arrays and create a set for each cell
    var right_walls = [];
    var bottom_walls = [];
    var cell_sets = [];
    for (var i = 0; i < CELLS_X; i++) {
      for (var j = 0; j < CELLS_Y; j++) {
        cell = cells[i][j];
        cell_sets.push(new Set([cell]));
        right_walls.push(cell);
        bottom_walls.push(cell);
      }
    }

    // Shuffle walls to randomize the maze
    shuffle(right_walls);
    shuffle(bottom_walls);

    // These variables adjust the proportion of removed horizontal and vertical
    // walls.
    var horiz_prob = 0.6; // value must be 0 < x <= 1
    var vert_prob = 0.7; // value must be 0 < x <= 1
    var remove_anyway_prob = 0.2; // Probability for removing extra walls

    // Remove all walls between disconnected cells
    while (right_walls.length > 0 && bottom_walls.length > 0) {
      // Right walls
      if (right_walls.length > 0 && Math.random() < vert_prob) {
        var cell = right_walls.pop();
        if (cell.ind_x + 1 < CELLS_X) {
          next_cell = cells[cell.ind_x+1][cell.ind_y];
          // Check if the cell on right belongs to the same set (already connected)
          if (join_cell_sets(cell, next_cell, cell_sets)) {
            cell.right_wall = false;
          }
          // Randomly delete the wall anyway
          else if (Math.random() < remove_anyway_prob) cell.right_wall = false;
        }
      }

      // Bottom walls
      if (bottom_walls.length > 0 && Math.random() < horiz_prob) {
        var cell = bottom_walls.pop();
        if (cell.ind_y + 1 < CELLS_Y) {
          next_cell = cells[cell.ind_x][cell.ind_y+1];
          // Check if the cell below belongs to the same set (already connected)
          if (join_cell_sets(cell, next_cell, cell_sets)) {
            cell.bottom_wall = false;
          }
          // Randomly delete the wall anyway
          else if (Math.random() < remove_anyway_prob) cell.bottom_wall = false;
        }
      }
    }

    // Create a GameObject for every wall
    for (column_ind in cells) {
      column = cells[column_ind];
      for (cell_ind in column) {
        cell = column[cell_ind];
        var x = cell.x;
        var y = cell.y;
        var s = CELL_SIZE/2;
        var w = WALL_WIDTH/2;
        if (cell.bottom_wall) {
          let wall = new GameObject(x, y+s, s*2, w*2);
          if (cell_ind == column.length-1) {
            // Make the border walls indestructible
            wall.set_destructible(false);
          }
        }
        if (cell.right_wall) {
          let wall = new GameObject(x+s, y, w*2, s*2);
          if (column_ind == cells.length-1) {
            // Make the border walls indestructible
            wall.set_destructible(false);
          }
        }

        // Add left border wall
        if (column_ind == 0) {
          let wall = new GameObject(x-s+1, y, w*2, s*2); // Offset by one to improve visibility
          // Make the border walls indestructible
          wall.set_destructible(false);
        }
        // Add top border wall
        if (cell_ind == 0) {
          let wall = new GameObject(x, y-s+1, s*2, w*2); // Offset by one to improve visibility
          // Make the border walls indestructible
          wall.set_destructible(false);
        }
      }
    }
  }

  main();

  return {
    // Return some objects/methods for debugging purposes
    GAME_OBJECTS : GAME_OBJECTS,
    SET_DEBUG : function set_debug(value) { DEBUG = value; },
    SET_COLLISION_DISTANCE : function set_collision_distance(value) { MAX_DIST_FOR_COLLISIONS = value; },
  };

})();
