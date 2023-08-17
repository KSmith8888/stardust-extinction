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
        this.speed = 7;
        this.image.src = boltUrl;
        this.frameCount = 0;
    }
    collidedWithPlayer() {
        this.game.explosions.push(new LargeEmp(this.ctx, this.x, this.y));
        this.game.player.isShipDisabled = true;
    }
}
