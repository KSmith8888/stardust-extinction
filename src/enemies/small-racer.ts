import Enemy from "./enemy";
import Game from "../../levels/game-logic";
import { EnemyLaserSmall } from "../projectiles/enemy-lasers";
import smallRacerUrl from "../../assets/images/enemies/small-racer.png";
import { SmallExplosion } from "../explosions/small-explosion";

export class SmallRacer extends Enemy {
    projectiles: Array<EnemyLaserSmall>;
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
        this.projectiles = [];
        this.width = 16;
        this.height = 28;
        this.speed = Math.floor(Math.random() * 3) + 3;
        this.image = new Image();
        this.image.src = smallRacerUrl;
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
        this.projectileInterval = 35;
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
            if (this.game.player.projectileStrength < 3) {
                this.game.player.projectileStrength += 1;
            }
        }
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.reset();
        }
        this.resetTargetX();
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
        this.game.player.health -= 10;
    }
}
