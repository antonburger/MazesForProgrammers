export class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.north = null;
        this.south = null;
        this.west = null;
        this.east = null;
        this.links = new Map();
    }
    link(cell, bidi = true) {
        this.links.set(cell, true);
        if (bidi) {
            cell.link(this, false);
        }
    }
    unlink(cell, bidi = true) {
        this.links.delete(cell);
        if (bidi) {
            cell.unlink(this, false);
        }
    }
    getLinks() {
        return this.links.keys();
    }
    areLinked(cell) {
        return this.links.has(cell);
    }
    getNeighbours() {
        const neighbours = [];
        if (this.north)
            neighbours.push(this.north);
        if (this.south)
            neighbours.push(this.south);
        if (this.west)
            neighbours.push(this.west);
        if (this.east)
            neighbours.push(this.east);
        return neighbours;
    }
}
