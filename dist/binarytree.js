import { sample } from "./utils.js";
export function binaryTree(grid) {
    for (const cell of grid.eachCell()) {
        const neighbours = [];
        if (cell.north)
            neighbours.push(cell.north);
        if (cell.east)
            neighbours.push(cell.east);
        if (neighbours.length) {
            cell.link(sample(neighbours));
        }
    }
}
