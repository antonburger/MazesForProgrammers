import { Cell } from "./cell";

export class Distances {
    private readonly cells = new Map<Cell, number>();

    constructor(root: Cell) {
        this.cells.set(root, 0);
    }

    get(cell: Cell) {
        return this.cells.get(cell);
    }

    set(cell: Cell, distance: number) {
        this.cells.set(cell, distance);
    }

    getCells() {
        return this.cells.keys();
    }
}
