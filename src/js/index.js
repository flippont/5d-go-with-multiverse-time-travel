let can = document.getElementById('canvas');
can.width = innerWidth;
can.height = innerHeight;

let CANVAS_HEIGHT,
    CANVAS_WIDTH

ctx = can.getContext('2d');


canvasPrototype = CanvasRenderingContext2D.prototype;

canvasPrototype.wrap = function (f) {
    const { resolveColor } = this;
    this.save();
    f();
    this.restore();
    this.resolveColor = resolveColor || (x => x);
};

onload = () => {
    onresize()
    init();
    frame();
}

onresize = () => {
    CANVAS_WIDTH = innerWidth;
    CANVAS_HEIGHT = innerHeight;
    can.width = CANVAS_WIDTH;
    can.height = CANVAS_HEIGHT;
}

init = () => {
    for(let i=0; i<boardSize; i++) {
        checkBoard.push([])
        backup.push([])
    }
    entities.push(new Board(0,0))
}

let lastFrame = performance.now();

frame = () => {
    const current = performance.now();
    const elapsed = (current - lastFrame) / 1000;
    lastFrame = current;

    // Game update

    // Rendering
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for(let i=0; i<entities.length; i++) {
        ctx.wrap(() => {
            ctx.translate(-offsetX, -offsetY)
            entities[i].draw()
        });
    }


    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.font = '14pt Courier';
    ctx.lineWidth = 3;

    let y = CANVAS_HEIGHT - 10;
    for (const line of [
        'FPS: ' + ~~(1 / elapsed),
        'Boards: ' + entities.length,
    ].reverse()) {
        ctx.fillText(line, 10, y);
        y -= 20;
    }

    requestAnimationFrame(frame);
}