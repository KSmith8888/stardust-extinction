import Explosion from "./explosion";
import warpDustUrl from "../../assets/images/explosions/warp-dust.png";

export class WarpDust extends Explosion {
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super();
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.image = new Image();
        this.image.src = warpDustUrl;
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
