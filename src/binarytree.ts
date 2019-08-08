import { Grid } from "./grid.js";
import { Cell } from "./cell.js";
import { sample } from "./utils.js";
import { CellDecorator } from "./render.js";

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

export function* binaryTreeGenerator(grid: Grid) {
    for (const cell of grid.eachCell()) {
        const neighbours: Cell[] = [];
        if (cell.north) neighbours.push(cell.north);
        if (cell.east) neighbours.push(cell.east);

        if (neighbours.length) {
            yield explain("Visit the next cell and consider neighbour(s) to the east and north.", cell, "tentative", neighbours);
            const chosenCell = sample(neighbours);
            cell.link(chosenCell);
            const carveText = neighbours.length === 1 ? "Have to" : "Decide to";
            yield explain(`${carveText} carve to the ${chosenCell === cell.north ? "north" : "east"}.`, cell, "confirmed", [chosenCell]);
        } else {
            yield explain("Visit the northeast corner. No neighbours to carve to.", cell);
        }
    }

    const openCells =
        Array.from(Array(grid.columns), (_, n) => grid.cellAt(0, n)!)
        .concat(Array.from(Array(grid.rows - 1), (_, n) => grid.cellAt(n + 1, grid.columns - 1)!));
    yield {
        explanation: "Notice the open passageways along the north and east sides of the maze.",
        decorators: openCells.map(c => ({
            cell: c,
            render: (rect, context) => {
                context.fillStyle = "lightgray";
                context.fillRect(rect.x, rect.y, rect.w, rect.h);
            }
        }) as CellDecorator)
    };

    function explain(explanation: string, visited?: Cell, neighbourStyle?: "tentative" | "confirmed", neighbours?: Cell[]) {
        let decorators = [] as CellDecorator[];
        if (visited) {
            decorators.push({
                cell: visited, render: (rect, context) => {
                    context.fillStyle = "red";
                    context.fillRect(rect.x, rect.y, rect.w, rect.h);
                }
            });
        }

        if (neighbours) {
            decorators = decorators.concat(neighbours.map(c => ({
                cell: c,
                render: (rect, context) => {
                    context.fillStyle = neighbourStyle === "tentative" ? "lightgray" : "cyan";
                    context.fillRect(rect.x, rect.y, rect.w, rect.h);
                }
            })));
        }

        return {
            explanation: explanation,
            decorators: decorators
        };
    }
}
