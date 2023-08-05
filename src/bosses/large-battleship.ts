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
        this.game.bossProjectiles.push(
            new EnemyLaserLarge(
                this.game,
                this.canvas,
                this.ctx,
                this.x,
                this.y + this.laserOffsetY,
                this.damageStat
            )
        );
        this.game.bossProjectiles.push(
            new EnemyLaserLarge(
                this.game,
                this.canvas,
                this.ctx,
                this.x + (this.width - this.laserOffsetX),
                this.y + this.laserOffsetY,
                this.damageStat
            )
        );
        this.isFiring = false;
    }
}
