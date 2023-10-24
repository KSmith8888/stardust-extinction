import Enemy from "./enemy";
import Game from "../../levels/game-logic";
import phaseGliderUrl from "../../assets/images/enemies/phase-glider.png";
import { SmallExplosion } from "../explosions/small-explosion";
import { WarpDust } from "../explosions/warp-dust";

export class PhaseGlider extends Enemy {
    speed: number;
    image: HTMLImageElement;
    laserOffsetX: number;
    projectileInterval: number;
    warpInterval: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.firesProjectiles = true;
        this.width = 20;
        this.height = 28;
        this.x = this.game.player.x;
        this.speed = Math.floor(Math.random() * 2) + 2;
        this.image = new Image();
        this.image.src = phaseGliderUrl;
        this.collisionDamage = 20;
        this.laserOffsetX = this.width * 0.45;
        this.projectileInterval = 30;
        this.warpInterval = Math.floor(Math.random() * 150) + 50;
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
        if (this.y > 0) {
            if (!this.isReversed) {
                this.handleProjectiles();
            } else {
                this.followTargetX();
            }
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    warp() {
        this.warpInterval = Math.floor(Math.random() * 150) + 50;
        this.y = Math.floor(Math.random() * (this.canvas.height * 0.4));
        this.x = this.game.player.x;
    }
    handleProjectiles() {
        if (this.frameCount >= this.warpInterval) {
            this.frameCount = 0;
            this.game.explosions.push(new WarpDust(this.ctx, this.x, this.y));
            this.warp();
        } else {
            if (
                this.frameCount >= this.projectileInterval &&
                this.frameCount % 15 === 0
            ) {
                const freeLaser = this.game.enemyProjectiles.find(
                    (laser) => laser.isFree
                );
                if (freeLaser) {
                    freeLaser.isFree = false;
                    freeLaser.x = this.x + this.laserOffsetX;
                    freeLaser.y = this.y + (this.height + 5);
                }
            }
            this.frameCount += 1;
        }
    }
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
        this.game.player.health -= this.collisionDamage;
    }
}
