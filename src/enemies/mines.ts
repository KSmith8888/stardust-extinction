import Enemy from "./enemy";
import redMineUrl from "../../assets/images/enemies/red-mine.png";
import blueMineUrl from "../../assets/images/enemies/blue-mine.png";
import Player from "../player";

export class RedMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    speed: number;
    image: HTMLImageElement;
    playerX: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        player: Player
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.width = 24;
        this.height = 20;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 5) + 1;
        this.image = new Image();
        this.image.src = redMineUrl;
        this.playerX = this.player.x;
    }
    render() {
        if (this.health <= 0) {
            this.isDestroyed = true;
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        if (this.x > this.playerX) {
            this.x -= 1.5;
        } else {
            this.x += 1.5;
        }
        this.playerX = this.player.x;
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class BlueMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 36;
        this.height = 24;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.image = new Image();
        this.image.src = blueMineUrl;
        this.randomTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
    }
    render() {
        if (this.health <= 0) {
            this.isDestroyed = true;
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        if (this.x >= this.randomTargetX) {
            this.x -= 2;
        } else {
            this.x += 2;
        }
        if (this.frameCount >= 10) {
            this.randomTargetX = Math.floor(
                Math.random() * (this.canvas.width - this.width)
            );
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
