import { Cell } from "./cell";
export class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.prepareGrid();
        this.configureCells();
    }
    prepareGrid() {
        return Array.from(Array(this.rows).keys(), r => Array.from(Array(this.columns).keys(), c => new Cell(r, c)));
    }
    configureCells() {
        for (const cell of this.eachCell()) {
            const [row, col] = [cell.row, cell.column];
            cell.north = this.cellAt(row - 1, col);
            cell.south = this.cellAt(row + 1, col);
            cell.west = this.cellAt(row, col - 1);
            cell.east = this.cellAt(row, col + 1);
        }
    }
    cellAt(row, column) {
        if (row < 0 || row >= this.rows)
            return null;
        if (column < 0 || column >= this.columns)
            return null;
        return this.grid[row][column];
    }
    *eachRow() {
        for (const row of this.grid) {
            yield row;
        }
    }
    *eachCell() {
        for (const row of this.grid) {
            for (const cell of row) {
                yield cell;
            }
        }
    }
}
