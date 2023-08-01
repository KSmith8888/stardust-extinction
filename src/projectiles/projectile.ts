import Game from "../../levels/game-logic";
import { areObjectsColliding } from "../utils/collision";
import { SmallExplosion } from "../explosions/small-explosion";

export default class Projectile {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    isOffScreen: boolean;
    hasHitTarget: boolean;
    speed: number;
    image: HTMLImageElement;
    damageMultiplier: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.isOffScreen = false;
        this.hasHitTarget = false;
        this.speed = 1;
        this.image = new Image();
        this.damageMultiplier = 1;
    }
    handleCollision() {
        this.game.enemies.forEach((enemy) => {
            if (
                !this.hasHitTarget &&
                !enemy.isFree &&
                areObjectsColliding(this, enemy)
            ) {
                this.game.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.health -=
                    this.game.player.damageStat * this.damageMultiplier;
                this.hasHitTarget = true;
            }
        });
        if (this.game.hasReachedBoss) {
            this.game.bosses.forEach((boss) => {
                if (!this.hasHitTarget && areObjectsColliding(this, boss)) {
                    this.game.explosions.push(
                        new SmallExplosion(this.ctx, this.x, this.y)
                    );
                    boss.health -=
                        this.game.player.damageStat * this.damageMultiplier;
                    this.hasHitTarget = true;
                }
            });
        }
    }
}
