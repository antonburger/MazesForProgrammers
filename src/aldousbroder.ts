import { Grid } from "./grid.js";
import { sample, randomInt } from "./utils.js";

export function aldousBroder(grid: Grid) {
    let cell = grid.cellAt(randomInt(grid.columns), randomInt(grid.rows))!;
    let unvisited = grid.columns * grid.rows - 1;

    while (unvisited > 0) {
        const neighbour = sample(cell.getNeighbours())

        if (neighbour.getLinks().next().done) {
            cell.link(neighbour);
            unvisited -= 1;
        }

        cell = neighbour;
    }
}
