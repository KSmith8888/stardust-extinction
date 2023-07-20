import Projectile from "./projectile";
import Game from "../../levels/level-1/level-1-logic";
import Player from "../player";
import smallLaserUrl from "../../assets/images/projectiles/laser-small.png";
import enemySmallLaserUrl from "../../assets/images/projectiles/enemy-laser-small.png";
import { areObjectsColliding } from "../utils/collision";
import { SmallExplosion } from "../explosions/small-explosion";

export class LaserSmall extends Projectile {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    game: Game;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        game: Game
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 14;
        this.image.src = smallLaserUrl;
        this.game = game;
    }
    render() {
        this.game.enemies.forEach((enemy) => {
            if (
                !this.hasHitTarget &&
                !enemy.isDestroyed &&
                areObjectsColliding(this, enemy)
            ) {
                this.game.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.health -= 10;
                this.hasHitTarget = true;
            }
        });
        if (this.y > 0) {
            this.y -= 2.25;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class EnemyLaserSmall extends Projectile {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        player: Player,
        x: number,
        y: number
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 12;
        this.image.src = enemySmallLaserUrl;
    }
    render() {
        if (!this.hasHitTarget && areObjectsColliding(this, this.player)) {
            this.player.health -= 10;
            this.hasHitTarget = true;
        }
        if (this.y < this.canvas.height) {
            this.y += 2.75;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
