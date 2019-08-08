const defaultCellSize = 20;
export function render(grid, context, cellSize = defaultCellSize, contentsRenderer, decorators) {
    if (contentsRenderer) {
        for (const cell of grid.eachCell()) {
            context.save();
            const rect = { x: cell.column * cellSize, y: cell.row * cellSize, w: cellSize, h: cellSize };
            contentsRenderer(cell, rect, context);
            context.restore();
        }
    }
    if (decorators) {
        for (const decorator of decorators) {
            context.save();
            const cell = decorator.cell;
            const rect = { x: cell.column * cellSize, y: cell.row * cellSize, w: cellSize, h: cellSize };
            decorator.render(rect, context);
            context.restore();
        }
    }
    context.lineCap = "square";
    context.lineJoin = "miter";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    for (const cell of grid.eachCell()) {
        const rect = { x: cell.column * cellSize, y: cell.row * cellSize, w: cellSize, h: cellSize };
        if (!cell.south || !cell.areLinked(cell.south)) {
            context.moveTo(rect.x, rect.y + rect.h);
            context.lineTo(rect.x + rect.w, rect.y + rect.h);
        }
        if (!cell.east || !cell.areLinked(cell.east)) {
            context.moveTo(rect.x + rect.w, rect.y);
            context.lineTo(rect.x + rect.w, rect.y + rect.h);
        }
    }
    context.moveTo(0, 0);
    context.lineTo(0, grid.rows * cellSize);
    context.moveTo(0, 0);
    context.lineTo(grid.columns * cellSize, 0);
    context.stroke();
}
export function makeCombinedRenderer(...renderers) {
    return function (cell, rect, context) {
        for (const renderer of renderers) {
            context.save();
            renderer(cell, rect, context);
            context.restore();
        }
    };
}
