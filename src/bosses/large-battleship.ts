import Game from "../../levels/level-1/level-1-logic";
import Boss from "./boss";
import largeBattleshipUrl from "../../assets/images/bosses/large-battleship.png";

export class LargeBattleship extends Boss {
    image: HTMLImageElement;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 48;
        this.height = 58;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.health = 40;
        this.healthStat = 40;
        this.damageStat = 10;
        this.frameCount = 0;
        this.image = new Image();
        this.image.src = largeBattleshipUrl;
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        if (this.y < this.height * 2) {
            this.y += 1.5;
        }
        this.followTargetX();
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
