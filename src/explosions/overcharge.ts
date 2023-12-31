import Game from "../../levels/game-logic";
import Explosion from "./explosion";
import { areObjectsColliding } from "../utils/collision";

export class Overcharge extends Explosion {
    game: Game;
    ctx: CanvasRenderingContext2D;
    circleWidth: number;
    circleX: number;
    circleY: number;
    arcNum: number;
    constructor(
        game: Game,
        ctx: CanvasRenderingContext2D,
        playerX: number,
        playerY: number
    ) {
        super();
        this.game = game;
        this.ctx = ctx;
        this.width = 300;
        this.height = 300;
        this.circleWidth = 120;
        this.circleX = playerX;
        this.circleY = playerY;
        this.arcNum = 2 * Math.PI;
        this.x = playerX - this.width / 2;
        this.y = playerY - this.height / 2;
    }
    reverseEnemies() {
        const reversedEnemies = this.game.enemies.filter(
            (enemy) => !enemy.isFree && areObjectsColliding(this, enemy)
        );
        reversedEnemies.forEach((revEnemy) => {
            revEnemy.reverse();
        });
        const reversedLasers = this.game.enemyProjectiles.filter(
            (laser) => !laser.isFree && areObjectsColliding(this, laser)
        );
        reversedLasers.forEach((revLaser) => revLaser.reset());
    }
    render() {
        this.circleWidth = Math.floor(this.circleWidth * 1.3);
        this.ctx.save();
        this.ctx.strokeStyle = "rgb(143, 143, 221)";
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.arc(
            this.circleX,
            this.circleY,
            this.circleWidth / 2,
            0,
            this.arcNum
        );
        this.ctx.stroke();
        this.ctx.restore();
        this.reverseEnemies();
    }
}
