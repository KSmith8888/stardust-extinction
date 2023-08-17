import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeShockerUrl from "../../assets/images/bosses/large-shocker.png";

export class LargeShocker extends Boss {
    image: HTMLImageElement;
    laserOffsetY: number;
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
        this.laserOffsetY = Math.floor(this.height * 0.3);
        this.firingFrames = 0;
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        if (this.isFiring) {
            if (this.firingFrames < 12) {
                this.firingFrames += 1;
            } else {
                this.activateProjectiles();
                this.firingFrames = 0;
            }
        } else {
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
            firstLaser.y = this.y + (this.height - this.laserOffsetY);
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - secondLaser.width);
            secondLaser.y = this.y + (this.height - this.laserOffsetY);
        }
        const rando = Math.random();
        if (rando > 0.8) {
            this.isFiring = false;
        }
    }
}
