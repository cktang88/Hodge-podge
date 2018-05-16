class Collision {
    constructor(game_obj1, game_obj2) {
        this.obj1 = game_obj1;
        this.obj2 = game_obj2;
        this.has_collided = false;
        this.direction = new Vector2d(0, 0); // Direction of penetration
        this.magnitude = Number.NEGATIVE_INFINITY; // Shortest distance of penetration
    }
}

function getSATCollision(game_obj1, game_obj2) {
    /*
      Uses Separating Axis Test to get the direction and magnitude of
      any possible collision between given two objects.
      https://en.wikipedia.org/wiki/Hyperplane_separation_theorem

      Objects can have any convex shape. Circles are a special case.
    */
    var obj1 = game_obj1;
    var obj2 = game_obj2;
    let temp_pos1 = obj1.pos.clone();
    var d_origins = temp_pos1.subtract(obj2.pos).get_magnitude();
    var collision = new Collision(game_obj1, game_obj2);
    collision.has_collided = false;
    if (d_origins > MAX_DIST_FOR_COLLISIONS * CELL_SIZE) {
        // Optimization: Skip further checks for distant objects
        return collision;
    }
    var verts1 = game_obj1.get_verts();
    var verts2 = game_obj2.get_verts();
    var pos1 = game_obj1.pos.clone();
    var pos2 = game_obj2.pos.clone();

    for (var i = 0; i < verts1.length + verts2.length; i++) {
        // Calculate next axis by taking the normal of a side of one object
        if (i < verts1.length) {
            var vert = verts1[i];
            if (i < verts1.length - 1) var next_vert = verts1[i + 1];
            else var next_vert = verts1[0];
        } else {
            var vert = verts2[i - verts1.length];
            if (i < verts1.length + verts2.length - 1) var next_vert = verts2[i + 1 - verts1.length];
            else var next_vert = verts2[0];
        }
        var side = next_vert.clone().subtract(vert).get_unit_vector();
        var axis = side.get_right_normal();

        // Get minimum and maximum projections on axis from center of obj1
        var min_dist1 = verts1[0].get_dot_product(axis);
        var max_dist1 = min_dist1;
        for (var j = 1; j < verts1.length; j++) {
            var distance = verts1[j].get_dot_product(axis);
            if (distance < min_dist1) min_dist1 = distance;
            else if (distance > max_dist1) max_dist1 = distance;
        }

        // Get minimum and maximum projections on axis from center of obj2
        var min_dist2 = verts2[0].get_dot_product(axis);
        var max_dist2 = min_dist2;
        for (var j = 1; j < verts2.length; j++) {
            var distance = verts2[j].get_dot_product(axis);
            if (distance < min_dist2) min_dist2 = distance;
            else if (distance > max_dist2) max_dist2 = distance;
        }

        // Calculate the distance between objects and flip axis if necessary
        var d = new Vector2d(pos2.x - pos1.x, pos2.y - pos1.y).get_dot_product(axis);

        // Calculate the gaps between objects projected along axis
        // Negative gap means that there is a collision on this axis
        var gap1 = d - max_dist1 + min_dist2;
        var gap2 = -d - max_dist2 + min_dist1;
        if (gap1 >= -EPSILON || gap2 >= -EPSILON) {
            // No collision on this axis - these objects cannot be colliding!
            collision.has_collided = false;
            return collision;
        }
        if (gap1 > gap2 && gap1 > collision.magnitude) {
            collision.magnitude = gap1;
            collision.direction = axis;
        }
        if (gap2 > gap1 && gap2 > collision.magnitude) {
            collision.magnitude = gap2;
            collision.direction = axis.get_inverted();
        }
    }
    collision.has_collided = true;
    return collision;
}

function GetCollisions(obj) {
    /*
      Checks collisions given gameobject and all other gameobjects.
    */
    var ign1 = obj.ignored_collision_objs;
    var collisions = [];
    for (obj_ind in GAME_OBJECTS) {
        var other_obj = GAME_OBJECTS[obj_ind];
        var ign2 = other_obj.ignored_collision_objs;
        if (ign1.indexOf(other_obj) === -1 && ign2.indexOf(obj) === -1) {
            var collision = getSATCollision(obj, other_obj);
            if (collision.has_collided === true) {
                collisions.push(collision);
            }
        }
    }
    return collisions;
}