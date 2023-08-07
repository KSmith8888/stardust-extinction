import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeBattleshipUrl from "../../assets/images/bosses/large-battleship.png";

export class LargeBattleship extends Boss {
    image: HTMLImageElement;
    laserOffsetX: number;
    laserOffsetY: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 48;
        this.height = 58;
        this.y = 0 - this.height;
        this.speed = Math.floor(Math.random() * 3) + 1;
        this.damageStat = 30;
        this.frameCount = 0;
        this.image = new Image();
        this.image.src = largeBattleshipUrl;
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.5;
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
            this.handleProjectiles();
        }
    }

    handleProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x;
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
