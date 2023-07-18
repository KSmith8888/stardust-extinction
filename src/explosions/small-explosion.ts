import smallExplosionUrl from "../../assets/images/explosions/small-explosion.png";

export class SmallExplosion {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    frameCount: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 18;
        this.image = new Image();
        this.image.src = smallExplosionUrl;
        this.frameCount = 0;
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
