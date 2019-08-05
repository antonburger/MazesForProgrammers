import Gradient from "./gradient.js";
import Colour from "./colour.js";
export function makeDistanceRenderer(distances, config) {
    const options = Object.assign({ distances: true, colours: true, gradient: new Gradient(Colour.white, Colour.green) }, config);
    const allDistances = Array.from(distances.getCells(), c => distances.get(c));
    const maxDistance = Math.max(...allDistances);
    return renderDistances;
    function renderDistances(cell, rect, context) {
        const distance = distances.get(cell);
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
