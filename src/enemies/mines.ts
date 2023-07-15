import redMineUrl from "../../assets/images/enemies/red-mine.png";
import blueMineUrl from "../../assets/images/enemies/blue-mine.png";

export class Enemy {
    width: number;
    height: number;
    x: number;
    y: number;
    isOffScreen: boolean;
    image: HTMLImageElement;
    constructor() {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.isOffScreen = false;
        this.image = new Image();
    }
}

export class RedMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 24;
        this.height = 20;
        this.x = Math.floor(Math.random() * this.canvas.width);
        this.y = 0 - this.height;
        this.image.src = redMineUrl;
    }
    render() {
        if (this.y < this.canvas.height) {
            this.y += 1;
        } else {
            this.isOffScreen = true;
        }
    }
}

export class BlueMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 36;
        this.height = 24;
        this.x = Math.floor(Math.random() * this.canvas.width);
        this.y = 0 - this.height;
        this.image.src = blueMineUrl;
    }
    render() {
        if (this.y < this.canvas.height) {
            this.y += 1;
        } else {
            this.isOffScreen = true;
        }
    }
}
