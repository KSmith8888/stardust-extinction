import Enemy from "./enemy";
import Game from "../../levels/level-1/level-1-logic";
import { EnemyLaserSmall } from "../projectiles/lasers";
import smallFighterUrl from "../../assets/images/enemies/small-fighter.png";
import { SmallExplosion } from "../explosions/small-explosion";

export class SmallFighter extends Enemy {
    projectiles: Array<EnemyLaserSmall>;
    speed: number;
    image: HTMLImageElement;
    randomTargetX: number;
    laserOffsetX: number;
    laserOffsetY: number;
    projectileInterval: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.firesProjectiles = true;
        this.projectiles = [];
        this.width = 24;
        this.height = 24;
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.image = new Image();
        this.image.src = smallFighterUrl;
        this.randomTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
        this.projectileInterval = 35;
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
            this.destroyedByPlayer();
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.resetTargetX();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.handleProjectiles();
    }
    handleProjectiles() {
        if (this.frameCount >= this.projectileInterval) {
            this.game.enemyProjectiles.push(
                new EnemyLaserSmall(
                    this.canvas,
                    this.ctx,
                    this.game.player,
                    this.x,
                    this.y + this.laserOffsetY,
                    this.damageStat
                )
            );
            this.game.enemyProjectiles.push(
                new EnemyLaserSmall(
                    this.canvas,
                    this.ctx,
                    this.game.player,
                    this.x + (this.width - this.laserOffsetX),
                    this.y + this.laserOffsetY,
                    this.damageStat
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
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
    }
}
