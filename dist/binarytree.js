import { sample } from "./utils";
export function binaryTree(grid) {
    for (const cell of grid.eachCell()) {
        const neighbours = [];
        if (cell.north)
            neighbours.push(cell.north);
        if (cell.east)
            neighbours.push(cell.east);
        cell.link(sample(neighbours));
    }
}
