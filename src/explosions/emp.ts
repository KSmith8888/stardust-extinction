import largeEmpUrl from "../../assets/images/explosions/large-emp.png";

export class LargeEmp {
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
        this.width = 65;
        this.height = 65;
        this.image = new Image();
        this.image.src = largeEmpUrl;
        this.frameCount = 0;
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
