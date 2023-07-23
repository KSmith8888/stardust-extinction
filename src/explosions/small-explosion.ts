import Explosion from "./explosion";
import smallExplosionUrl from "../../assets/images/explosions/small-explosion.png";

export class SmallExplosion extends Explosion {
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super();
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 18;
        this.image = new Image();
        this.image.src = smallExplosionUrl;
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
