import Enemy from "./enemy";
import redMineUrl from "../../assets/images/enemies/red-mine.png";
import blueMineUrl from "../../assets/images/enemies/blue-mine.png";
import Game from "../../levels/level-1/level-1-logic";
import { LargeEmp } from "../explosions/emp";
import { LargeExplosion } from "../explosions/large-explosion";

export class RedMine extends Enemy {
    speed: number;
    image: HTMLImageElement;
    playerX: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 24;
        this.height = 20;
        this.speed = Math.floor(Math.random() * 5) + 1;
        this.image = new Image();
        this.image.src = redMineUrl;
        this.playerX = this.game.player.x;
    }
    resetTargetX() {
        if (this.x > this.playerX) {
            this.x -= 1.5;
        } else {
            this.x += 1.5;
        }
    }
    render() {
        if (this.health <= 0) {
            this.game.explosions.push(
                new LargeExplosion(
                    this.game,
                    this.ctx,
                    this.x - this.width / 2,
                    this.y - this.height / 2
                )
            );
            this.destroyedByPlayer();
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.resetTargetX();
        this.playerX = this.game.player.x;
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    collidedWithPlayer() {
        this.game.explosions.push(
            new LargeExplosion(this.game, this.ctx, this.x, this.y)
        );
        this.game.player.health -= 10;
    }
}

export class BlueMine extends Enemy {
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 36;
        this.height = 24;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.image = new Image();
        this.image.src = blueMineUrl;
        this.randomTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
    }
    resetTargetX() {
        if (this.x >= this.randomTargetX) {
            this.x -= 2;
        } else {
            this.x += 2;
        }
    }
    render() {
        if (this.health <= 0) {
            this.game.explosions.push(
                new LargeEmp(
                    this.ctx,
                    this.x - this.width / 2,
                    this.y - this.height / 2
                )
            );
            this.destroyedByPlayer();
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.resetTargetX();
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
    collidedWithPlayer() {
        this.game.explosions.push(new LargeEmp(this.ctx, this.x, this.y));
        this.game.player.isShipDisabled = true;
    }
}
