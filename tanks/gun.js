var GunTypes = {
    // Enumeration for different types of guns
    'normal': 1,
    'machinegun': 2,
    'heavy': 3,
}

class Gun {
    /*
      Handles the firing of tank guns.
    */
    constructor(tank) {
        this.bullet_size = 5;
        this.bullet_speed = 1.5;
        this.ammo = 1000; // Max shots for current gun
        this.clip = 5; // Max simultaenous shots
        this.fire_delay = 0.5;
        this.last_shot = Date.now();
        this.tank = tank; // Used for ignoring collisions when firing
        this.type = GunTypes.normal;
        this.damage_amount = 4;
        this.randomize_direction = false;
    }

    fire(x, y, direction) {
        var bullet;
        if (this.randomize_direction) {
            direction += Math.random() * 10 - 5; // Add a random offset of +-5 degrees
        }
        if (this.clip > 0 && this.ammo > 0) {
            if (Date.now() - this.last_shot > this.fire_delay * 1000) {
                GUI_REDRAW_NEEDED = true; // GUI has info about remaining ammo
                this.clip--;
                this.ammo--;
                this.last_shot = Date.now();
                bullet = new Bullet(x, y, direction, this.damage_amount, this, this.bullet_size, this.bullet_speed);
            }
        }
        return bullet;
    }

    reload() {
        // Adds one bullet to clip.
        this.clip++;
    }

    get_name() {
        return "40mm gun";
    }

    get_ammo_str() {
        switch (this.type) {
            case GunTypes.normal:
                return "infinite";
                break;
            default:
                return this.ammo;
        }
    }
};

class Machinegun extends Gun {
    constructor(tank) {
        super(tank);
        this.bullet_size = 2;
        this.bullet_speed = 2;
        this.ammo = 75;
        this.clip = 25;
        this.fire_delay = 0.1;
        this.damage_amount = 1;
        this.randomize_direction = true;
        this.type = GunTypes.machinegun;
    }

    get_name() {
        return ".50 caliber machine gun";
    }
};

class Heavygun extends Gun {
    constructor(tank) {
        super(tank);
        this.bullet_size = 20;
        this.bullet_speed = 1.5;
        this.ammo = 3;
        this.clip = 3;
        this.fire_delay = 1;
        this.damage_amount = 1000;
        this.randomize_direction = false;
        this.type = GunTypes.heavy;
    }

    fire(x, y, direction) {
        // Override firing to make the bullet unstoppable
        var bullet = super.fire(x, y, direction);
        if (bullet)
            bullet.set_unstoppable(true);
    }

    get_name() {
        return "155mm heavy gun";
    }
};