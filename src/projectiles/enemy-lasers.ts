import Projectile from "./projectile";
import Player from "../player";
import enemySmallLaserUrl from "../../assets/images/projectiles/enemy-laser-small.png";
import { areObjectsColliding } from "../utils/collision";

export class EnemyLaserSmall extends Projectile {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    damage: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        player: Player,
        x: number,
        y: number,
        damage: number
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.width = 5;
        this.height = 12;
        this.image.src = enemySmallLaserUrl;
    }
    render() {
        if (!this.hasHitTarget && areObjectsColliding(this, this.player)) {
            this.player.health -= this.damage;
            this.hasHitTarget = true;
        }
        if (this.y < this.canvas.height) {
            this.y += 2.75;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
