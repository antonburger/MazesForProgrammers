export class Cell {
    north: Cell;
    south: Cell;
    west: Cell;
    east: Cell;
    private readonly links = new Map<Cell, boolean>();

    constructor(readonly row: number, readonly column: number) {
    }

    link(cell: Cell, bidi = true) {
        this.links.set(cell, true);
        if (bidi) {
            cell.link(this, false);
        }
    }

    unlink(cell: Cell, bidi = true) {
        this.links.delete(cell);
        if (bidi) {
            cell.unlink(this, false);
        }
    }

    getLinks() {
        return this.links.keys();
    }

    areLinked(cell: Cell) {
        return this.links.has(cell);
    }

    getNeighbours() {
        const neighbours = [] as Cell[];
        if (this.north) neighbours.push(this.north);
        if (this.south) neighbours.push(this.south);
        if (this.west) neighbours.push(this.west);
        if (this.east) neighbours.push(this.east);

        return neighbours;
    }
}
