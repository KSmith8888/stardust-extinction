import Player from "./player";

export class HealthBar {
    user: Player;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: number;
    displayHealthbar: boolean;
    constructor(
        user: Player,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.user = user;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.user.healthStat * 1.6 - 5;
        this.height = 15;
        this.x = 10;
        this.y = this.canvas.height - 25;
        this.fill = this.user.health * 1.6 - 5;
        this.displayHealthbar = true;
    }
    render() {
        if (this.displayHealthbar) {
            this.width = this.user.healthStat * 1.6 - 5;
            this.fill = this.user.health * 1.6 - 5;
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.x + this.width + 3, this.y);
            this.ctx.lineTo(this.x + this.width + 3, this.y + this.height);
            this.ctx.lineTo(this.x, this.y + this.height);
            this.ctx.lineTo(this.x, this.y);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "rgb(3, 1, 121)";
            this.ctx.fillRect(
                this.x + 2,
                this.y + 2,
                this.fill,
                this.height - 4
            );
        }
    }
}
