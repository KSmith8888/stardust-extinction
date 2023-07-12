export default class Player {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
    }
    render() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
