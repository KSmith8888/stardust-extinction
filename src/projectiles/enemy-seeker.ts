import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import { LargeExplosion } from "../explosions/large-explosion";
import seekerSmallUrl from "../../assets/images/projectiles/seeker-small.png";

export class EnemySeeker extends EnemyProjectile {
    targetX: number;
    frameCount: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 11;
        this.height = 26;
        this.speed = 6.25;
        this.damage = 20;
        this.image.src = seekerSmallUrl;
        this.targetX = this.game.player.x;
        this.frameCount = 0;
    }
    followTargetX() {
        if (this.x >= this.targetX + 5) {
            this.x -= this.speed;
        } else if (this.x <= this.targetX - 5) {
            this.x += this.speed;
        }
        this.targetX = this.game.player.x;
    }

    render() {
        this.followTargetX();
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    collidedWithPlayer() {
        this.game.explosions.push(
            new LargeExplosion(this.game, this.ctx, this.x, this.y)
        );
        this.game.player.health -= this.damage;
    }
}
