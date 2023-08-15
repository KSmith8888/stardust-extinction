import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeBlasterUrl from "../../assets/images/bosses/large-blaster.png";
import { EnemyLaserMedium } from "../projectiles/enemy-lasers";
import { EnemySeeker } from "../projectiles/enemy-seeker";

export class LargeBlaster extends Boss {
    image: HTMLImageElement;
    seekerChance: number;
    laserOffsetX: number;
    laserOffsetY: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 50;
        this.height = 48;
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 4) + 2;
        this.frameCount = 0;
        this.image = new Image();
        this.image.src = largeBlasterUrl;
        this.seekerChance = 0.3;
        this.laserOffsetX = Math.floor(this.width * 0.25);
        this.laserOffsetY = Math.floor(this.height * 0.6);
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        this.followTargetY();
        this.followTargetX();
        this.ctx.drawImage(this.image, this.x, this.y);
        if (this.isFiring) {
            this.activateProjectiles();
        }
    }

    activateProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyLaserMedium
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x + this.laserOffsetX;
            firstLaser.y = this.y + this.laserOffsetY;
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyLaserMedium
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y = this.y + this.laserOffsetY;
        }
        const rando = Math.random();
        if (rando < this.seekerChance) {
            const seeker = this.game.bossProjectiles.find(
                (laser) => laser.isFree && laser instanceof EnemySeeker
            );
            if (seeker) {
                seeker.isFree = false;
                seeker.x = this.x + this.width / 2;
                seeker.y = this.y + this.height;
            }
            if (this.seekerChance > 0.1) {
                this.seekerChance = 0.1;
            }
        }
        this.isFiring = false;
    }
}
