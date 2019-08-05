export default class Colour {
    static readonly white = new Colour(255, 255, 255);
    static readonly green = new Colour(0, 255, 0);

    constructor(readonly r: number, readonly g: number, readonly b: number, readonly a: number = 255) {
    }

    static lerp(t: number, a: Colour, b: Colour) {
        const invT = 1 - t;
        return new Colour(invT * a.r + t * b.r,
            invT * a.g + t * b.g,
            invT * a.b + t * b.b,
            invT * a.a + t * b.a);
    }
}
