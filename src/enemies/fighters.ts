import Enemy from "./enemy";
import Game from "../../levels/game-logic";
import smallFighterUrl from "../../assets/images/enemies/small-fighter.png";
import { SmallExplosion } from "../explosions/small-explosion";

export class SmallFighter extends Enemy {
    speed: number;
    image: HTMLImageElement;
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
        this.width = 24;
        this.height = 24;
        this.speed = Math.floor(Math.random() * 2) + 1;
        this.image = new Image();
        this.image.src = smallFighterUrl;
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
        this.projectileInterval = 50;
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
        this.ctx.drawImage(this.image, this.x, this.y);
        this.handleProjectiles();
    }
    handleProjectiles() {
        if (this.frameCount >= this.projectileInterval) {
            const firstLaser = this.game.enemyProjectiles.find(
                (laser) => laser.isFree
            );
            if (firstLaser) {
                firstLaser.isFree = false;
                firstLaser.x = this.x;
                firstLaser.y = this.y + this.laserOffsetY;
            }
            const secondLaser = this.game.enemyProjectiles.find(
                (laser) => laser.isFree
            );
            if (secondLaser) {
                secondLaser.isFree = false;
                secondLaser.x = this.x + (this.width - this.laserOffsetX);
                secondLaser.y = this.y + this.laserOffsetY;
            }
            this.targetX = Math.floor(
                Math.random() * (this.canvas.width - this.width)
            );
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
    }
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
        this.game.player.health -= this.collisionDamage;
    }
}
