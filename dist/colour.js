export default class Colour {
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static lerp(t, a, b) {
        const invT = 1 - t;
        return new Colour(invT * a.r + t * b.r, invT * a.g + t * b.g, invT * a.b + t * b.b, invT * a.a + t * b.a);
    }
}
Colour.white = new Colour(255, 255, 255);
Colour.green = new Colour(0, 255, 0);
