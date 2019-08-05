export function makeDistanceRenderer(distances, config) {
    const options = Object.assign({ distances: true, colours: true }, config);
    const allDistances = Array.from(distances.getCells(), c => distances.get(c));
    const maxDistance = Math.max(...allDistances);
    return renderDistances;
    function renderDistances(cell, rect, context) {
        const distance = distances.get(cell);
        if (options.colours) {
            const lerp = distance / maxDistance;
            const col = Math.floor(lerp * 255);
            context.fillStyle = `rgb(${255 - col}, ${255 - lerp * 100}, ${255 - col})`;
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
