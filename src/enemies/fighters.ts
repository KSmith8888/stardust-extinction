import Enemy from "./enemy";
import Game from "../../levels/level-1/level-1-logic";
import { EnemyLaserSmall } from "../projectiles/lasers";
import smallFighterUrl from "../../assets/images/enemies/small-fighter.png";

export class SmallFighter extends Enemy {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    game: Game;
    projectiles: Array<EnemyLaserSmall>;
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    laserOffsetX: number;
    laserOffsetY: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        game: Game
    ) {
        super();
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.firesProjectiles = true;
        this.projectiles = [];
        this.width = 24;
        this.height = 24;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.image = new Image();
        this.image.src = smallFighterUrl;
        this.randomTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
    }
    render() {
        if (this.health <= 0) {
            this.isDestroyed = true;
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
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.handleProjectiles();
    }
    handleProjectiles() {
        if (this.frameCount >= 35) {
            this.game.enemyProjectiles.push(
                new EnemyLaserSmall(
                    this.canvas,
                    this.ctx,
                    this.game.player,
                    this.x,
                    this.y + this.laserOffsetY
                )
            );
            this.game.enemyProjectiles.push(
                new EnemyLaserSmall(
                    this.canvas,
                    this.ctx,
                    this.game.player,
                    this.x + (this.width - this.laserOffsetX),
                    this.y + this.laserOffsetY
                )
            );
            this.randomTargetX = Math.floor(
                Math.random() * (this.canvas.width - this.width)
            );
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
    }
}
