import Enemy from "./enemy";
import Game from "../../levels/game-logic";
import { EnemyLaserSmall } from "../projectiles/enemy-lasers";
import smallTyphoonUrl from "../../assets/images/enemies/small-typhoon.png";
import { LargeExplosion } from "../explosions/large-explosion";

export class SmallTyphoon extends Enemy {
    projectiles: Array<EnemyLaserSmall>;
    speed: number;
    image: HTMLImageElement;
    laserOffsetX: number;
    projectileInterval: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.firesProjectiles = true;
        this.projectiles = [];
        this.width = 22;
        this.height = 30;
        this.speed = Math.floor(Math.random() * 3) + 3;
        this.image = new Image();
        this.image.src = smallTyphoonUrl;
        this.collisionDamage = 20;
        this.laserOffsetX = this.width * 0.45;
        this.projectileInterval = 15;
        this.targetX = this.game.player.x;
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
        this.followTargetX();
        this.targetX = this.game.player.x;
        this.ctx.drawImage(this.image, this.x, this.y);
        this.handleProjectiles();
    }
    handleProjectiles() {
        if (this.frameCount >= this.projectileInterval) {
            const freeLaser = this.game.enemyProjectiles.find(
                (laser) => laser.isFree
            );
            if (freeLaser) {
                freeLaser.isFree = false;
                freeLaser.x = this.x + this.laserOffsetX;
                freeLaser.y = this.y + (this.height + 5);
            }
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
    }
    collidedWithPlayer() {
        this.game.explosions.push(
            new LargeExplosion(this.game, this.ctx, this.x, this.y)
        );
        this.game.player.health -= this.collisionDamage;
    }
}
