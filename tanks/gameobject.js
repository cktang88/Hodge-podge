class GameObject {
    constructor(x, y, width, height, movable = false) {
        this.destructible = true; // Can this object be destroyed?
        this.max_hp = 1000;
        this.hp = this.max_hp;
        this.pos = new Vector2d(x, y);
        this.width = width;
        this.height = height;
        this.rotation = 0; // In degrees
        this.velocity = new Vector2d(0, 0);
        this.movable = movable; // Can be moved by collisions
        this.color = {};
        this.color.r = 0;
        this.color.g = 0;
        this.color.b = 0;
        this.verts = [];
        this.rotated_verts = [];
        this.ignored_collision_objs = [this];
        this.circle = false;
        this.radius = 0;
        this.unstoppable = false; // Lets object move through destructible objects

        var w = this.width / 2;
        var h = this.height / 2;
        this.verts.push(new Vector2d(-w, -h));
        this.verts.push(new Vector2d(-w, h));
        this.verts.push(new Vector2d(w, h));
        this.verts.push(new Vector2d(w, -h));

        GAME_OBJECTS.push(this);
        if (this.movable == false) {
            PRERENDERED_REDRAW_NEEDED = true;
        }

    }

    damage(amount) {
        if (this.destructible && this.hp > 0) {
            if (amount > 0) {
                this.hp -= amount;
                this.color_by_damage();
            } else console.log("WARNING: Attempted to damage by negative amount!!!");
        }
    }

    set_unstoppable(value) {
        this.unstoppable = value;
    }

    set_destructible(value) {
        this.destructible = value;
    }

    color_by_damage() {
        var red = Math.round(255 - (255 * (this.hp / this.max_hp)));
        this.color.r = red;
    }

    rotate(degrees) {
        if (degrees != 0) {
            this.rotation += degrees;
            while (this.rotation < 0) this.rotation += 360;
            while (this.rotation > 360) this.rotation -= 360;
            this.calculate_rotated_verts();
        }
    }

    move(vector) {
        if (vector instanceof Vector2d) {
            this.pos.add(vector);
        } else throw "Invalid argument";
    }

    get_rect(local_coordinates) {
        var x = this.pos.x;
        var y = this.pos.y;
        var w = this.width / 2;
        var h = this.height / 2;
        if (local_coordinates) return [-w, -h, w * 2, h * 2];
        else return [x - w, y - h, w * 2, h * 2];
    }

    calculate_rotated_verts() {
        var radians = deg2rad(this.rotation)
        this.rotated_verts = [];
        for (var vert of this.verts) {
            this.rotated_verts.push(vert.clone().rotate(radians));
        }
        this.rotated_verts;
    }

    get_verts() {
        if (this.rotated_verts.length === 0) this.calculate_rotated_verts();
        return this.rotated_verts;
    }

    on_collision(obj) {
        /*
          Default GameObjects do nothing on collision. Child classes can use this
          for example to damage or give powerups to tanks on collision.
        */
        //console.log(typeof(obj));
    }

    destroy() {
        var i = GAME_OBJECTS.indexOf(this);
        delete GAME_OBJECTS[i];
        if (this.movable == false) {
            PRERENDERED_REDRAW_NEEDED = true;
        }
    }

    update() {
        /*
          Moves GameObject by its velocity and checks for collisions.
          If collisions are found, attempts to solve them by moving itself.
        */
        if (this.hp <= 0) {
            this.destroy();
            return;
        }
        if (this.movable) {
            // Move by velocity, if it has any
            this.move(this.velocity);

            // Get all colliding objects
            var collisions = GetCollisions(this);

            var attempts = 0; // Track attempts to prevent infinite loops
            var done = false;
            var max_attempts = 5;
            while (done === false && attempts < max_attempts) {
                var prev_pos = this.pos.clone();
                var prev_velo = this.velocity.clone();
                done = true;
                if (collisions.length > 0) {
                    //console.log(collisions);
                }
                for (var i = 0; i < collisions.length; i++) {
                    // Loop over all collisions one at a time
                    var collision = collisions[i];
                    var obj1 = collision.obj1; // This object (redundant)
                    var obj2 = collision.obj2; // The colliding object
                    var dir = collision.direction.clone();
                    if (this.unstoppable && obj2.destructible == true) {
                        // Don't attempt to solve collisions for unstoppable objects
                        // unstoppable objects can go through almost anything.
                        obj1.on_collision(obj2);
                        obj2.on_collision(obj1);
                        break;
                    }
                    this.move(dir.clone().multiply(collision.magnitude));
                    this.velocity.reflect(dir);


                    // Get all new collisions after moving
                    var new_collisions = GetCollisions(this);
                    if (new_collisions.length === 0) {
                        // Success! No new collisions found
                        obj1.on_collision(obj2);
                        obj2.on_collision(obj1);
                        break; // Don't check any other collisions
                    } else if (i < collisions.length - 1) {
                        // Fail! Move back to original position and attempt to solve the next collision
                        this.pos = prev_pos;
                        this.velocity = prev_velo;
                    } else {
                        // Fail! No collisions remaining. Try to resolve collisions from the new position
                        obj1.on_collision(obj2);
                        obj2.on_collision(obj1);
                        collisions = new_collisions;
                        done = false;
                        attempts++;
                    }
                }

            }
            if (attempts > 1) {
                console.log("Attempted to resolve collisions " + attempts + " times");
            }
        }
    }

    draw(context) {
        context.save();
        let color = "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
        context.fillStyle = color;
        context.translate(this.pos.x, this.pos.y);
        context.beginPath();
        if (this.circle === true) {
            context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        } else {
            var verts = this.get_verts();
            context.moveTo(verts[0].x, verts[0].y);
            for (var vert of verts) {
                context.lineTo(vert.x, vert.y);
            }
            context.lineTo(vert.x, vert.y);
        }
        context.fill();
        context.restore();
    }
};