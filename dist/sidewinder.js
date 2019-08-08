import { randomInt, sample } from "./utils.js";
export function sidewinder(grid) {
    for (const row of grid.eachRow()) {
        const run = [];
        for (const cell of row) {
            run.push(cell);
            const atEasternBoundary = !cell.east;
            const atNorthernBoundary = !cell.north;
            const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && randomInt(2) === 0);
            if (shouldCloseOut) {
                const runNorthFrom = sample(run);
                if (runNorthFrom.north) {
                    runNorthFrom.link(runNorthFrom.north);
                }
                run.length = 0;
            }
            else {
                cell.link(cell.east);
            }
        }
    }
}
export function* sidewinderGenerator(grid) {
    for (const row of grid.eachRow()) {
        const run = [];
        for (const cell of row) {
            run.push(cell);
            if (run.length === 1) {
                yield explain("Start a new run.", run);
            }
            const atEasternBoundary = !cell.east;
            const atNorthernBoundary = !cell.north;
            const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && randomInt(2) === 0);
            if (shouldCloseOut) {
                const closeOutText = atEasternBoundary ? "Have to close the run at the eastern boundary" : "Decide to close the run";
                const runNorthFrom = sample(run);
                yield explain(`${closeOutText}.`, run);
                if (runNorthFrom.north) {
                    runNorthFrom.link(runNorthFrom.north);
                    yield explain("Carve to the north, linking the run to the maze so far.", run, runNorthFrom, runNorthFrom.north);
                }
                run.length = 0;
            }
            else {
                cell.link(cell.east);
                yield explain("Carve to the east, growing the run.", run, undefined, cell.east);
            }
        }
    }
    const openCells = Array.from(Array(grid.columns), (_, n) => grid.cellAt(0, n));
    yield {
        explanation: "Notice the open passageway along the north side of the maze.",
        decorators: openCells.map(c => ({
            cell: c,
            render: (rect, context) => {
                context.fillStyle = "lightgray";
                context.fillRect(rect.x, rect.y, rect.w, rect.h);
            }
        }))
    };
    function explain(explanation, run, carveFrom, carveTo) {
        const decorators = [];
        if (carveTo) {
            decorators.push({
                cell: carveTo,
                render: (rect, context) => {
                    context.fillStyle = "cyan";
                    context.fillRect(rect.x, rect.y, rect.w, rect.h);
                }
            });
        }
        return {
            explanation: explanation,
            decorators: decorators.concat(run.map(c => ({
                cell: c,
                render: (rect, context) => {
                    context.fillStyle = c === carveFrom ? "red" : "darkred";
                    context.fillRect(rect.x, rect.y, rect.w, rect.h);
                }
            })))
        };
    }
}
