import Game from "../../levels/game-logic";

export default class Enemy {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    targetX: number;
    speed: number;
    health: number;
    healthStat: number;
    damageStat: number;
    collisionDamage: number;
    isFree: boolean;
    firesProjectiles: boolean;
    frameCount: number;
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
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.health = 40;
        this.healthStat = 40;
        this.damageStat = 10;
        this.collisionDamage = 10;
        this.isFree = true;
        this.firesProjectiles = false;
        this.frameCount = 0;
    }
    followTargetX() {
        if (this.x >= this.targetX + 5) {
            this.x -= this.speed;
        } else if (this.x <= this.targetX - 5) {
            this.x += this.speed;
        }
    }
    destroyedByPlayer() {
        this.game.destroyedEnemies += 1;
        this.reset();
    }
    reset() {
        this.isFree = true;
        this.health = this.healthStat;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
    }
}
