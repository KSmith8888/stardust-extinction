import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import { LargeEmp } from "../explosions/emp";

export class EnemyBolt extends EnemyProjectile {
    frameCount: number;
    innerWidth: number;
    innerX: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 8;
        this.height = this.game.canvas.height - this.y;
        this.speed = 0;
        this.frameCount = 0;
        this.innerWidth = this.width * 0.4;
        this.innerX = this.width * 0.3;
    }
    render() {
        if (this.frameCount < this.firingInterval) {
            this.ctx.save();
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(
                this.x + this.innerX,
                this.y,
                this.innerWidth,
                this.height
            );
            this.ctx.restore();
            this.frameCount += 1;
        } else {
            this.reset();
            this.frameCount = 0;
        }
    }
    collidedWithPlayer() {
        this.game.explosions.push(
            new LargeEmp(
                this.game,
                this.ctx,
                this.game.player.x,
                this.game.player.y
            )
        );
    }
}
