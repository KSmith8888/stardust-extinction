import Game from "../../levels/game-logic";
import Boss from "./boss";
import largeBattleshipUrl from "../../assets/images/bosses/large-battleship.png";
import { EnemyLaserLarge } from "../projectiles/enemy-lasers";

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
        this.speed = Math.floor(Math.random() * 4) + 2;
        this.frameCount = 0;
        this.image = new Image();
        this.image.src = largeBattleshipUrl;
        this.laserOffsetX = Math.floor(this.width * 0.2);
        this.laserOffsetY = Math.floor(this.height * 0.5);
    }
    render() {
        if (this.health <= 0) {
            this.destroyedByPlayer();
        }
        const newTargetY = Math.floor(Math.random() * (this.canvas.height / 2));
        this.followTargetY(newTargetY);
        const newTargetX = Math.floor(
            Math.random() * (this.canvas.width - this.width)
        );
        this.followTargetX(newTargetX);
        this.ctx.drawImage(this.image, this.x, this.y);
        if (this.isFiring) {
            this.activateProjectiles();
        }
    }

    activateProjectiles() {
        const firstLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyLaserLarge
        );
        if (firstLaser) {
            firstLaser.isFree = false;
            firstLaser.x = this.x;
            firstLaser.y = this.y + this.laserOffsetY;
        }
        const secondLaser = this.game.bossProjectiles.find(
            (laser) => laser.isFree && laser instanceof EnemyLaserLarge
        );
        if (secondLaser) {
            secondLaser.isFree = false;
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y = this.y + this.laserOffsetY;
        }
        this.isFiring = false;
    }
}
