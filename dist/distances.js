export class Distances {
    constructor(root) {
        this.cells = new Map();
        this.cells.set(root, 0);
    }
    get(cell) {
        return this.cells.get(cell);
    }
    set(cell, distance) {
        this.cells.set(cell, distance);
    }
    contains(cell) {
        return this.cells.has(cell);
    }
    getCells() {
        return this.cells.keys();
    }
}
