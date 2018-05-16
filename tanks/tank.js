class Tank extends GameObject {
    constructor(x, y, player) {
        super(x, y, TANK_SIZE, TANK_SIZE, true); // Movable=true
        this.player = player;
        this.speed = 1;
        this.turn_speed = 5;
        this.fire_delay = 0;
        this.max_fire_delay = 30;
        this.max_ammo = 5;
        this.ammo = this.max_ammo;
        this.max_hp = 10;
        this.hp = this.max_hp;
        this.color_by_damage();

        // Add a gun
        this.set_gun(GunTypes.normal);
        var w = this.width / 2;
        var h = this.height / 2;
        var last_vert = this.verts.pop();
        this.verts.push(new Vector2d(w, h / 2));
        this.verts.push(new Vector2d(w * 2, h / 2));
        this.verts.push(new Vector2d(w * 2, -h / 2));
        this.verts.push(new Vector2d(w, -h / 2));
        this.verts.push(last_vert);
    }

    set_gun(type) {
        GUI_REDRAW_NEEDED = true; // GUI has info about player weapons
        switch (type) {
            case GunTypes.normal:
                this.gun = new Gun(this);
                break;
            case GunTypes.machinegun:
                this.gun = new Machinegun(this);
                break;
            case GunTypes.heavy:
                this.gun = new Heavygun(this);
                break;
            default:
                console.log("Invalid gun type given " + type);
                this.gun = new Gun(this);
                break;
        }
    }

    destroy() {
        END_ROUND = true;
        this.player === P1 ? P2_SCORE++ : P1_SCORE++;
        for (var i = 0; i < 360; i += 60) {
            // Spawn a ring of bullets on death
            var radians = deg2rad(i);
            var damage = 4;
            var off_x = this.width * Math.cos(radians);
            var off_y = this.width * Math.sin(radians);
            new Bullet(this.pos.x + off_x, this.pos.y + off_y, i, damage);
        }
        super.destroy();
    }

    update() {
        /*
          Checks for user input and checks collisions.
        */
        if (this.fire_delay > 0) this.fire_delay--;
        var p = this.player;
        var radians = deg2rad(this.rotation);

        if ((p == P1 && KEYSTATE[P1_UP]) || (p == P2 && KEYSTATE[P2_UP])) {
            this.velocity.x = this.speed * Math.cos(radians);
            this.velocity.y = this.speed * Math.sin(radians);
        } else if ((p == P1 && KEYSTATE[P1_DOWN]) || (p == P2 && KEYSTATE[P2_DOWN])) {
            this.velocity.x = -this.speed * Math.cos(radians);
            this.velocity.y = -this.speed * Math.sin(radians);
        } else {
            this.velocity = new Vector2d(0, 0);
        }
        if ((p == P1 && KEYSTATE[P1_LEFT]) || (p == P2 && KEYSTATE[P2_LEFT])) {
            this.rotate(-this.turn_speed);

        } else if ((p == P1 && KEYSTATE[P1_RIGHT]) || (p == P2 && KEYSTATE[P2_RIGHT])) {
            this.rotate(this.turn_speed);
        }

        super.update(); // Move and check collisions before firing

        if ((p == P1 && KEYSTATE[P1_FIRE]) || (p == P2 && KEYSTATE[P2_FIRE])) {
            if (this.gun.ammo > 0) {
                var off_x = this.width * 0.9 * Math.cos(radians);
                var off_y = this.width * 0.9 * Math.sin(radians);
                this.gun.fire(this.pos.x + off_x, this.pos.y + off_y, this.rotation);
            } else {
                this.set_gun(GunTypes.normal); // Replace all special guns with a regular gun
            }

        }
    }
};