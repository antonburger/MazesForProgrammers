import { Cell } from "./cell.js";
import { Distances } from "./distances.js";

export default function simplifiedDijkstra(root: Cell): Distances {
    const distances = new Distances(root);
    const frontier = [root];

    while (frontier.length) {
        const current = frontier.shift()!;
        const currentDistance = distances.get(current)!;
        for (const neighbour of current.getLinks()) {
            if (distances.contains(neighbour)) continue;
            distances.set(neighbour, currentDistance + 1);
            frontier.push(neighbour);
        }
    }

    return distances;
}
