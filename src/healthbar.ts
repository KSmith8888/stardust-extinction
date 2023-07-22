import Player from "./player";

export class HealthBar {
    user: Player;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: number;
    constructor(
        user: Player,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        this.user = user;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = 15;
        this.width = this.user.healthStat * 1.8 - 5;
        this.fill = this.user.health * 1.8 - 5;
    }
    render() {
        this.width = this.user.healthStat * 1.8 - 5;
        this.fill = this.user.health * 1.8 - 5;
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
        this.ctx.fillStyle = "rgb(184, 29, 9)";
        this.ctx.fillRect(this.x + 2, this.y + 2, this.fill, this.height - 4);
    }
}
