import { Cell } from "./cell.js";
import { Distances } from "./distances.js";
import { Rectangle } from "./render.js";

export function getPathTo(cell: Cell, distances: Distances) {
    const path: Cell[] = [cell];
    let distance = distances.get(cell)!;
    let next = cell;
    while (distance > 0) {
        const nextStep = getNextStep(next, distance);
        if (!nextStep) return [];
        [next, distance] = nextStep;
        path.unshift(next);
    }

    return path;

    function getNextStep(cell: Cell, distance: number): [Cell, number] | undefined {
        for (const neighbour of cell.getLinks()) {
            const neighbourDistance = distances.get(neighbour);
            if (neighbourDistance === distance - 1) {
                return [neighbour, neighbourDistance];
            }
        }

        return undefined;
    }
}

export function makePathRenderer(path: Cell[]) {
    return pathRenderer;

    function pathRenderer(cell: Cell, rect: Rectangle, context: CanvasRenderingContext2D) {
        const index = path.indexOf(cell);
        if (index < 0) return;

        context.globalCompositeOperation = "difference";
        context.lineCap = "round";
        context.lineJoin = "miter";

        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "white";
        if (index > 0) {
            drawSegmentToCentreFrom(path[index - 1]);
        }

        if (index < path.length - 1) {
            drawSegmentToCentreFrom(path[index + 1]);
        }
        context.stroke();

        function drawSegmentToCentreFrom(neighbour: Cell) {
            if (cell.row === neighbour.row) {
                if (cell.column < neighbour.column) {
                    context.moveTo(rect.x + rect.w, rect.y + 0.5 * rect.h);
                    context.lineTo(rect.x + 0.5 * rect.w, rect.y + 0.5 * rect.h);
                } else if (cell.column > neighbour.column) {
                    context.moveTo(rect.x, rect.y + 0.5 * rect.h);
                    context.lineTo(rect.x + 0.5 * rect.w, rect.y + 0.5 * rect.h);
                }
            } else if (cell.column === neighbour.column) {
                if (cell.row < neighbour.row) {
                    context.moveTo(rect.x + 0.5 * rect.w, rect.y + rect.h);
                    context.lineTo(rect.x + 0.5 * rect.w, rect.y + 0.5 * rect.h);
                } else if (cell.row > neighbour.row) {
                    context.moveTo(rect.x + 0.5 * rect.w, rect.y);
                    context.lineTo(rect.x + 0.5 * rect.w, rect.y + 0.5 * rect.h);
                }
            }
        }
    }
}
