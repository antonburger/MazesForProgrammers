import Colour from "./colour.js";
export default class Gradient {
    constructor(start, end) {
        this.stops = [];
        this.stops.push({ stop: 0, colour: start }, { stop: 1, colour: end }, { stop: 2, colour: end });
    }
    addStop(stop, colour) {
        stop = this.clamp(stop);
        const index = this.findStopIndex(stop);
        this.stops.splice(index + 1, 0, { stop: stop, colour: colour });
    }
    lerp(t) {
        t = this.clamp(t);
        const startIndex = this.findStopIndex(t);
        const start = this.stops[startIndex];
        const end = this.stops[startIndex + 1];
        const rescaledT = (t - start.stop) / (end.stop - start.stop);
        return Colour.lerp(rescaledT, start.colour, end.colour);
    }
    clamp(n) {
        return n < 0 ? 0 : n > 1 ? 1 : n;
    }
    findStopIndex(stop) {
        let lastIndex = -1;
        for (const sc of this.stops) {
            if (stop < sc.stop)
                return lastIndex;
            lastIndex++;
        }
        return this.stops.length - 2;
    }
}
