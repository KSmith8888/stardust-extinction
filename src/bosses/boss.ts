import Game from "../../levels/game-logic";
import { LargeExplosion } from "../explosions/large-explosion";

export default class Boss {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    speed: number;
    health: number;
    healthStat: number;
    frameCount: number;
    projectileInterval: number;
    isFiring: boolean;
    isDestroyed: boolean;
    firingInterval: number;
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
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.targetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
        this.targetY = Math.floor(Math.random() * (this.canvas.height / 2));
        this.speed = 6;
        this.health = 200;
        this.healthStat = 200;
        this.frameCount = 0;
        this.projectileInterval = 40;
        this.isFiring = false;
        this.isDestroyed = false;
        this.firingInterval = 40;
    }
    followTargetY(newTargetY: number) {
        if (this.y >= this.targetY + 5) {
            this.y -= this.speed / 2;
        } else if (this.y <= this.targetY - 5) {
            this.y += this.speed / 2;
        }
        if (this.frameCount === 20) {
            this.targetY = newTargetY;
        }
    }
    followTargetX(newTargetX: number) {
        if (this.x >= this.targetX + 5) {
            this.x -= this.speed;
        } else if (this.x <= this.targetX - 5) {
            this.x += this.speed;
        }
        if (this.frameCount < this.firingInterval) {
            this.frameCount += 1;
        } else {
            this.isFiring = true;
            this.targetX = newTargetX;
            this.frameCount = 0;
        }
    }
    destroyedByPlayer() {
        this.game.explosions.push(
            new LargeExplosion(this.game, this.ctx, this.x, this.y)
        );
        this.game.destroyedEnemies += 1;
        this.isDestroyed = true;
    }
}
