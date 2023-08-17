import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import { LargeEmp } from "../explosions/emp";
import boltUrl from "../../assets/images/projectiles/enemy-bolt.png";

export class EnemyBolt extends EnemyProjectile {
    frameCount: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 8;
        this.height = 20;
        this.speed = 0;
        this.image.src = boltUrl;
        this.frameCount = 0;
    }
    render() {
        /* Boolean to tell each bolt when firing is complete, then bolts move towards the bottom. Set speed */
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    collidedWithPlayer() {
        this.game.explosions.push(new LargeEmp(this.ctx, this.x, this.y));
        this.game.player.isShipDisabled = true;
    }
}
