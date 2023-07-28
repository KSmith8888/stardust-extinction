import Projectile from "./projectile";
import Game from "../../levels/level-1/level-1-logic";
import smallLaserUrl from "../../assets/images/projectiles/laser-small.png";
import medLaserPurpleUrl from "../../assets/images/projectiles/laser-medium-purple.png";
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
                !enemy.isFree &&
                areObjectsColliding(this, enemy)
            ) {
                this.game.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.health -= this.game.player.damageStat;
                this.hasHitTarget = true;
            }
        });
        if (this.y > 0) {
            this.y -= 2.25;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}

export class LaserMediumTwo extends Projectile {
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
        this.width = 9;
        this.height = 20;
        this.image.src = medLaserPurpleUrl;
        this.game = game;
    }
    render() {
        this.game.enemies.forEach((enemy) => {
            if (
                !this.hasHitTarget &&
                !enemy.isFree &&
                areObjectsColliding(this, enemy)
            ) {
                this.game.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.health -= this.game.player.damageStat * 2;
                this.hasHitTarget = true;
            }
        });
        if (this.y > 0) {
            this.y -= 2.25;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
