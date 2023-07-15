import redMineUrl from "../../assets/images/enemies/red-mine.png";
import blueMineUrl from "../../assets/images/enemies/blue-mine.png";

export class Enemy {
    width: number;
    height: number;
    x: number;
    y: number;
    health: number;
    isDestroyed: boolean;
    isOffScreen: boolean;
    frameCount: number;
    constructor() {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.health = 40;
        this.isDestroyed = false;
        this.isOffScreen = false;
        this.frameCount = 0;
    }
}

export class RedMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 24;
        this.height = 20;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.image = new Image();
        this.image.src = redMineUrl;
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
        if (this.frameCount >= 30) {
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
        this.speed = Math.floor(Math.random() * 2) + 1;
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
        if (this.frameCount >= 30) {
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
