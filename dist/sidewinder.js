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
