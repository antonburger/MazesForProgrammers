import { Grid } from "./Grid";
import { Cell } from "./Cell";
import { sample } from "./Utils";

export function binaryTree(grid: Grid) {
    for (const cell of grid.eachCell()) {
        const neighbours: Cell[] = [];
        if (cell.north) neighbours.push(cell.north);
        if (cell.east) neighbours.push(cell.east);

        cell.link(sample(neighbours));
    }
}