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
    damage: number;
    isFree: boolean;
    speed: number;
    image: HTMLImageElement;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = this.canvas.height + this.height;
        this.damage = 10;
        this.isFree = true;
        this.speed = 1;
        this.image = new Image();
    }
    reset() {
        this.x = 0;
        this.y = this.canvas.height + this.height;
        this.isFree = true;
    }
    handleCollision() {
        this.game.enemies.forEach((enemy) => {
            if (
                !this.isFree &&
                !enemy.isFree &&
                areObjectsColliding(this, enemy)
            ) {
                this.game.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.health -= this.damage;
                this.reset();
            }
        });
        if (this.game.hasReachedBoss) {
            this.game.bosses.forEach((boss) => {
                if (!this.isFree && areObjectsColliding(this, boss)) {
                    this.game.explosions.push(
                        new SmallExplosion(this.ctx, this.x, this.y)
                    );
                    boss.health -= this.damage;
                    this.reset();
                }
            });
        }
    }
}
