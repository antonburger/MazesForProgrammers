import { Distances } from "./distances.js";
import { Cell } from "./cell.js";
import { Rectangle } from "./render.js";
import Gradient from "./gradient.js";
import Colour from "./colour.js";

export interface DistanceRenderConfig {
    distances?: boolean;
    colours?: boolean;
    gradient?: Gradient
}

export function makeDistanceRenderer(distances: Distances, config?: DistanceRenderConfig) {
    const options = { distances: true, colours: true, gradient: new Gradient(Colour.white, Colour.green), ...config };
    const allDistances = Array.from(distances.getCells(), c => distances.get(c)!);
    const maxDistance = Math.max(...allDistances);
    return renderDistances;

    function renderDistances(cell: Cell, rect: Rectangle, context: CanvasRenderingContext2D) {
        const distance = distances.get(cell)!;

        if (options.colours) {
            const t = distance / maxDistance;
            const colour = options.gradient.lerp(t);
            context.fillStyle = `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
            context.fillRect(rect.x, rect.y, rect.w, rect.h);
        }

        if (options.distances) {
            context.beginPath();
            context.lineCap = "round";
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.strokeText(distance.toString(), rect.x + 0.5 * rect.w, rect.y + 0.5 * rect.h, rect.w);
        }
    }
}
