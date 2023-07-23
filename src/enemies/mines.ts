import Enemy from "./enemy";
import redMineUrl from "../../assets/images/enemies/red-mine.png";
import blueMineUrl from "../../assets/images/enemies/blue-mine.png";
import Game from "../../levels/level-1/level-1-logic";
import { LargeEmp } from "../explosions/emp";
import { LargeExplosion } from "../explosions/large-explosion";

export class RedMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    game: Game;
    speed: number;
    image: HTMLImageElement;
    playerX: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        game: Game
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.width = 24;
        this.height = 20;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 5) + 1;
        this.image = new Image();
        this.image.src = redMineUrl;
        this.playerX = this.game.player.x;
    }
    render() {
        if (this.health <= 0) {
            this.isDestroyed = true;
            this.game.explosions.push(
                new LargeExplosion(this.game, this.ctx, this.x, this.y)
            );
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        if (this.x > this.playerX) {
            this.x -= 1.5;
        } else {
            this.x += 1.5;
        }
        this.playerX = this.game.player.x;
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class BlueMine extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    game: Game;
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        game: Game
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.width = 36;
        this.height = 24;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.image = new Image();
        this.image.src = blueMineUrl;
        this.randomTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
    }
    render() {
        if (this.health <= 0) {
            this.isDestroyed = true;
            this.game.explosions.push(new LargeEmp(this.ctx, this.x, this.y));
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        if (this.x >= this.randomTargetX) {
            this.x -= 2;
        } else {
            this.x += 2;
        }
        if (this.frameCount >= 10) {
            this.randomTargetX = Math.floor(
                Math.random() * (this.canvas.width - this.width)
            );
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
