import Explosion from "./explosion";
import largeEmpUrl from "../../assets/images/explosions/large-emp.png";

export class LargeEmp extends Explosion {
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super();
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 65;
        this.image = new Image();
        this.image.src = largeEmpUrl;
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
