import Game from "../../levels/level-1/level-1-logic";

export default class Enemy {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    health: number;
    maxHealth: number;
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
        this.health = 40;
        this.maxHealth = 40;
        this.isFree = true;
        this.firesProjectiles = false;
        this.frameCount = 0;
    }
    destroyedByPlayer() {
        this.game.destroyedEnemies += 1;
        this.reset();
    }
    reset() {
        this.isFree = true;
        this.health = this.maxHealth;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
    }
}
