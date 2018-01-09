// function Point(x, y) {
//     if (x === undefined) {
//         x = 0;
//     }
//     if (y === undefined) {
//         y = 0;
//     }
//     this.x = x;
//     this.y = y;
// }

// Point.prototype.distance = function() {
//     return Math.sqrt(this.x * this.x + this.y * this.y);
// };

// var threeFour = new Point(3, 4);

// console.log(threeFour.distance());

////////////////////////////////////////////////////////
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    distance() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

var threeFour = new Point(3, 4);

console.log(threeFour.distance());

class Circle extends Point {
    constructor(x, y, r = 1) {
        super(x, y);
        this.radius = r;
    }
    isContainingOrigin() {
        return super.distance() < this.radius;
    }
}

var near = new Circle(4, 4, 3);
console.log(near);