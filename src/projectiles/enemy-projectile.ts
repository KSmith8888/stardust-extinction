import Game from "../../levels/game-logic";

export default class EnemyProjectile {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    damage: number;
    width: number;
    height: number;
    speed: number;
    image: HTMLImageElement;
    isFree: boolean;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.damage = 10;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0 - this.height;
        this.speed = 1;
        this.image = new Image();
        this.isFree = true;
    }
    reset() {
        this.x = 0;
        this.y = 0 - this.height;
        this.isFree = true;
    }
    render() {
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
