import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeShockerUrl from "../../assets/images/bosses/large-shocker.png";
import { EnemyBolt } from "../projectiles/enemy-bolt";

export class LargeShocker extends Boss {
    image: HTMLImageElement;
    laserOffsetY: number;
    firingFrames: number;
    firingInterval: number;
    hasActivatedBolts: boolean;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 36;
        this.height = 60;
        this.y = 50;
        this.speed = Math.floor(Math.random() * 4) + 2;
        this.frameCount = 0;
        this.image = new Image();
        this.image.src = largeShockerUrl;
        this.laserOffsetY = Math.floor(this.height * 0.3);
        this.firingFrames = 0;
        this.firingInterval = Math.floor(Math.random() * 30) + 10;
        this.hasActivatedBolts = false;
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        if (this.isFiring) {
            if (!this.hasActivatedBolts) {
                this.activateProjectiles();
                this.hasActivatedBolts = true;
            }
            if (this.firingFrames < this.firingInterval) {
                this.firingFrames += 1;
            } else {
                this.firingInterval = Math.floor(Math.random() * 30) + 10;
                this.firingFrames = 0;
                this.isFiring = false;
                this.hasActivatedBolts = false;
            }
        } else {
            this.followTargetX();
            this.followTargetY();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    activateProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyBolt
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x;
            firstLaser.y = this.y + (this.height - this.laserOffsetY);
            firstLaser.firingInterval = this.firingInterval;
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyBolt
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - secondLaser.width);
            secondLaser.y = this.y + (this.height - this.laserOffsetY);
            secondLaser.firingInterval = this.firingInterval;
        }
    }
}
