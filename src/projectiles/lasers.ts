import smallLaserUrl from "../../assets/images/laser-small.png";

export class LaserSmall {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    #width: number;
    #height: number;
    #image: HTMLImageElement;
    isOffScreen: boolean;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.#width = 8;
        this.#height = 14;
        this.#image = new Image();
        this.#image.src = smallLaserUrl;
        this.isOffScreen = false;
    }
    render() {
        if (this.y > 0) {
            this.y -= 1;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(
            this.#image,
            this.x,
            this.y,
            this.#width,
            this.#height
        );
    }
}
