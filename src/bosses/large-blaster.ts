import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeBlasterUrl from "../../assets/images/bosses/large-blaster.png";

export class LargeBlaster extends Boss {
    image: HTMLImageElement;
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
        this.laserOffsetX = Math.floor(this.width * 0.25);
        this.laserOffsetY = Math.floor(this.height * 0.6);
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        if (this.y < this.targetY) {
            this.y += 1;
        }
        this.followTargetX();
        this.ctx.drawImage(this.image, this.x, this.y);
        if (this.isFiring) {
            this.activateProjectiles();
        }
    }

    activateProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x + this.laserOffsetX;
            firstLaser.y = this.y + this.laserOffsetY;
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y = this.y + this.laserOffsetY;
        }
        this.isFiring = false;
    }
}
