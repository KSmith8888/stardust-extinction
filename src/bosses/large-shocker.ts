import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeShockerUrl from "../../assets/images/bosses/large-shocker.png";
import shockerFiringUrl from "../../assets/images/bosses/shocker-firing.png";

export class LargeShocker extends Boss {
    image: HTMLImageElement;
    laserOffsetX: number;
    laserOffsetY: number;
    boltOffset: number;
    firingFrames: number;
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
        this.laserOffsetX = Math.floor(this.width * 0.2);
        this.laserOffsetY = Math.floor(this.height * 0.5);
        this.boltOffset = 0;
        this.firingFrames = 0;
    }
    updatePosition() {
        if (this.y >= this.targetY + 5) {
            this.y -= this.speed / 2;
        } else if (this.y <= this.targetY - 5) {
            this.y += this.speed / 2;
        }
        if (this.frameCount === 30) {
            this.targetY = Math.floor(Math.random() * (this.canvas.height / 2));
        }
        if (this.x >= this.targetX + 5) {
            this.x -= this.speed;
        } else if (this.x <= this.targetX - 5) {
            this.x += this.speed;
        }
        if (this.frameCount < 80) {
            this.frameCount += 1;
        } else {
            this.isFiring = true;
            this.targetX = Math.floor(
                Math.random() * (this.canvas.width - this.width)
            );
            this.frameCount = 0;
        }
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        if (this.isFiring) {
            this.image.src = shockerFiringUrl;
            this.activateProjectiles();
        } else {
            this.image.src = largeShockerUrl;
            this.followTargetX();
            this.followTargetY();
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }

    activateProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x;
            firstLaser.y =
                this.y + this.height + firstLaser.height * this.boltOffset;
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y =
                this.y + this.height + secondLaser.height * this.boltOffset;
        } else {
            this.isFiring = false;
        }
        this.boltOffset += 1;
    }
}
