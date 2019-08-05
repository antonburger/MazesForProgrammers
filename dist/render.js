const defaultCellSize = 20;
export function render(grid, context, cellSize = defaultCellSize) {
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(0, 0);
    context.lineTo(0, grid.rows * cellSize);
    context.moveTo(0, 0);
    context.lineTo(grid.columns * cellSize, 0);
    for (const cell of grid.eachCell()) {
        if (!cell.south || !cell.areLinked(cell.south)) {
            context.moveTo(cell.column * cellSize, (cell.row + 1) * cellSize);
            context.lineTo((cell.column + 1) * cellSize, (cell.row + 1) * cellSize);
        }
        if (!cell.east || !cell.areLinked(cell.east)) {
            context.moveTo((cell.column + 1) * cellSize, cell.row * cellSize);
            context.lineTo((cell.column + 1) * cellSize, (cell.row + 1) * cellSize);
        }
    }
    context.stroke();
}
export function renderDistances(distances, context, cellSize = defaultCellSize) {
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    for (const cell of distances.getCells()) {
        const distance = distances.get(cell);
        context.strokeText(distance.toString(), (cell.column + 0.5) * cellSize, (cell.row + 0.5) * cellSize, cellSize);
    }
}
