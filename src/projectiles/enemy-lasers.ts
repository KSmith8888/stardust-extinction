import Game from "../../levels/game-logic";
import Projectile from "./projectile";
import Player from "../player";
import enemySmallLaserUrl from "../../assets/images/projectiles/enemy-laser-small.png";
import { areObjectsColliding } from "../utils/collision";

export class EnemyLaserSmall extends Projectile {
    player: Player;
    damage: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        damage: number
    ) {
        super(game, canvas, ctx, x, y);
        this.ctx = ctx;
        this.player = this.game.player;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.width = 5;
        this.height = 12;
        this.speed = 2.75;
        this.image.src = enemySmallLaserUrl;
    }
    handleCollision() {
        if (!this.hasHitTarget && areObjectsColliding(this, this.player)) {
            this.player.health -= this.damage;
            this.hasHitTarget = true;
        }
    }
    render() {
        this.handleCollision();
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
