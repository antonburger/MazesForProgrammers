import { Grid } from "./grid.js";
import { Cell } from "./cell.js";
import { sample } from "./utils.js";

export function binaryTree(grid: Grid) {
    for (const cell of grid.eachCell()) {
        const neighbours: Cell[] = [];
        if (cell.north) neighbours.push(cell.north);
        if (cell.east) neighbours.push(cell.east);

        if (neighbours.length) {
            cell.link(sample(neighbours));
        }
    }
}
