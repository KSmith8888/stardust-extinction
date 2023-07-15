import smallLaserUrl from "../../assets/images/laser-small.png";

export class Projectile {
    x: number;
    y: number;
    width: number;
    height: number;
    isOffScreen: boolean;
    image: HTMLImageElement;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.isOffScreen = false;
        this.image = new Image();
    }
}

export class LaserSmall extends Projectile {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 14;
        this.image.src = smallLaserUrl;
    }
    render() {
        if (this.y > 0) {
            this.y -= 1;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
