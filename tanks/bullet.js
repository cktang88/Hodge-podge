class Bullet extends GameObject {
    constructor(x, y, direction, damage, gun, size, speed) {
        if (typeof speed == 'undefined') speed = 1.5;
        if (typeof size == 'undefined') size = 5;
        super(x, y, size, size, true);
        this.max_time_to_live = 15000; // After this time the bullet disappears (milliseconds)
        this.remaining_bounces = 10;
        this.first_bounce = true;
        this.spawn_time = Date.now();
        this.ignore_owner_for = 3 * size / speed; // HACK: this value is just randomly guessed (milliseconds)
        this.speed = speed;
        this.gun = gun;
        if (this.gun && this.gun.tank) this.ignored_collision_objs.push(this.gun.tank); // Don't collide with tank before first bounce
        this.color.r = Math.round(Math.random() * 255);
        this.color.g = Math.round(Math.random() * 255);
        this.color.b = Math.round(Math.random() * 255);
        var radians = deg2rad(direction);
        this.velocity.x = this.speed * Math.cos(radians);
        this.velocity.y = this.speed * Math.sin(radians);
        this.damage_amount = damage;
        this.radius = this.width / 2;
        this.circle = true;
    }

    update() {
        super.update();
        if (Date.now() - this.spawn_time > this.max_time_to_live) {
            // This bullet has been around long enough, destroy it
            this.destroy();
        }
    }

    on_collision(obj) {
        this.remaining_bounces--;
        if (this.first_bounce && (Date.now() - this.spawn_time > this.ignore_owner_for) && this.gun && this.gun.tank) {
            // After first bounce bullet can collide with the shooting tank
            this.first_bounce = false;
            var ind = this.ignored_collision_objs.indexOf(this.gun.tank);
            if (ind > -1) delete this.ignored_collision_objs[ind];
        }

        if (this.remaining_bounces < 1) {
            this.destroy();
        }

        obj.damage(this.damage_amount);
        if (obj instanceof Tank) {
            this.destroy();
        }
    }

    destroy() {
        if (this.gun) this.gun.reload();
        super.destroy();
    }

};