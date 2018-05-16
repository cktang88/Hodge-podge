class Vector2d {
    constructor(x, y) {
        if (typeof x == 'undefined' || typeof y == 'undefined') {
            throw "Invalid arguments";
        }
        this.x = x;
        this.y = y;
    }

    rotate(radians) {
        // Rotates coordinates counterclockwise
        //radians=-radians
        if (radians != 0) {
            var x = this.x;
            var y = this.y;
            this.x = x * Math.cos(radians) - y * Math.sin(radians);
            this.y = x * Math.sin(radians) + y * Math.cos(radians);
        }
        return this;
    }

    add(vector) {
        if (vector instanceof Vector2d) {
            this.x += vector.x;
            this.y += vector.y;
        } else throw "Invalid argument";
        return this;
    }

    subtract(vector) {
        if (vector instanceof Vector2d) {
            this.x -= vector.x;
            this.y -= vector.y;
        } else throw "Invalid argument";
        return this;
    }

    multiply(value) {
        if (isNaN(value) === false) {
            this.x *= value;
            this.y *= value;
        } else throw "Invalid argument";
        return this;
    }

    get_dot_product(other) {
        // Calculates the dot product between given vector
        if (other instanceof Vector2d) return this.x * other.x + this.y * other.y;
        else throw "Invalid argument";
    }

    get_unit_vector() {
        var c = this.get_magnitude();
        var unit_vec = new Vector2d(this.x / c, this.y / c);
        return unit_vec;
    }

    get_right_normal() {
        return new Vector2d(this.y, -this.x);
    }

    get_magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    get_magnitude_squared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    get_inverted() {
        return new Vector2d(-this.x, -this.y);
    }

    clone() {
        return new Vector2d(this.x, this.y);
    }

    reflect(vector) {
        /*
          Reflects this vector around given unit vector.
          vec1 - (2*vec2*(vec2.vec1))
        */
        if (vector instanceof Vector2d) {
            var vec2 = vector.clone(); // Avoid modifying given vector
            vec2.multiply(vec2.get_dot_product(this));
            vec2.multiply(2);
            this.subtract(vec2);
            return this;
        } else throw "Invalid argument";
    }
};