import Game from "../../levels/level-1/level-1-logic";
import smallLaserUrl from "../../assets/images/laser-small.png";
import { areObjectsColliding } from "../utils/collision";
import { SmallExplosion } from "../explosions/small-explosion";

export class Projectile {
    x: number;
    y: number;
    width: number;
    height: number;
    isOffScreen: boolean;
    hasHitTarget: boolean;
    image: HTMLImageElement;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.isOffScreen = false;
        this.hasHitTarget = false;
        this.image = new Image();
    }
}

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
