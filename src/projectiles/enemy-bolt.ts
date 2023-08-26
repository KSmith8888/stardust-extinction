import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import { LargeEmp } from "../explosions/emp";

export class EnemyBolt extends EnemyProjectile {
    frameCount: number;
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
    }
    render() {
        if (this.frameCount < this.firingInterval) {
            this.ctx.save();
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(
                this.x + this.width * 0.3,
                this.y,
                this.width * 0.4,
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
            new LargeEmp(this.game, this.ctx, this.x, this.y)
        );
    }
}
