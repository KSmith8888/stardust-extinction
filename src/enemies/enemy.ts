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
    originalSpeed: number;
    health: number;
    healthStat: number;
    collisionDamage: number;
    isFree: boolean;
    isReversed: boolean;
    firesProjectiles: boolean;
    frameCount: number;
    generateExplosionOnHit: boolean;
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
        this.originalSpeed = 0;
        this.health = 40;
        this.healthStat = 40;
        this.collisionDamage = 10;
        this.isFree = true;
        this.isReversed = false;
        this.firesProjectiles = false;
        this.frameCount = 0;
        this.generateExplosionOnHit = true;
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
    reverse() {
        if (!this.isReversed) {
            this.isReversed = true;
            this.originalSpeed = this.speed;
            this.targetX =
                this.x > this.game.player.x ? this.x + 75 : this.x - 75;
            if (this.y < this.game.player.y) {
                this.speed = -4;
            } else {
                this.speed = 4;
            }
            setTimeout(() => {
                this.isReversed = false;
                this.speed = this.originalSpeed;
            }, 1250);
        }
    }
}
