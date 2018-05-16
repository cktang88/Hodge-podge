var PowerupType = {
    'machinegun': 1,
    'heavy': 2,
    'speed': 3,
    'get_random_type': function get_random_type() {
        return Math.ceil(Math.random() * 3);
    }
};

class Powerup extends GameObject {
    constructor(x, y, type) {
        super(x, y, 10, 10, true);
        this.type = type;
        this.max_hp = 20;
        this.hp = this.max_hp;
        this.last_damage_tick = Date.now(); // Cause damage to self every second
        this.turn_speed = 5;
        this.re_color();
    }

    re_color() {
        switch (this.type) {
            case PowerupType.machinegun:
                this.color = {
                    "r": 0,
                    "g": 200,
                    "b": 200
                };
                break;
            case PowerupType.heavy:
                this.color = {
                    "r": 0,
                    "g": 50,
                    "b": 120
                };
                break;
            case PowerupType.speed:
                this.color = {
                    "r": 0,
                    "g": 255,
                    "b": 255
                };
                break;
            default:
                console.log("Powerup has invalid type!");
                this.color = {
                    "r": 0,
                    "g": 10,
                    "b": 10
                };
        }
    }

    update() {
        this.rotate(this.turn_speed);
        if (Date.now() - this.last_damage_tick > 1000) {
            this.last_damage_tick = Date.now();
            this.damage(1); // Max time to live is 20 seconds;
        }
        super.update();
    }

    on_collision(obj) {
        if (obj instanceof Tank) {
            switch (this.type) {
                case PowerupType.machinegun:
                    obj.set_gun(GunTypes.machinegun);
                    break;
                case PowerupType.heavy:
                    obj.set_gun(GunTypes.heavy);
                    break;
                case PowerupType.speed:
                    obj.speed++;
                    break;
                default:
                    console.log("Powerup has invalid type!");
            }
            this.destroy();
        }
    }
};