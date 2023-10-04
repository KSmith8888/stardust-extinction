import Game from "../../levels/game-logic";
import Explosion from "./explosion";
import { areObjectsColliding } from "../utils/collision";
import warpDustUrl from "../../assets/images/explosions/warp-dust.png";

export class Overcharge extends Explosion {
    game: Game;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    constructor(
        game: Game,
        ctx: CanvasRenderingContext2D,
        playerX: number,
        playerY: number
    ) {
        super();
        this.game = game;
        this.ctx = ctx;
        this.width = 260;
        this.height = 260;
        this.x = playerX - this.width / 2;
        this.y = playerY - this.height / 2;
        this.image = new Image();
        this.image.src = warpDustUrl;
        this.reverseEnemies();
    }
    reverseEnemies() {
        const reversedEnemies = this.game.enemies.filter(
            (enemy) => !enemy.isFree && areObjectsColliding(this, enemy)
        );
        reversedEnemies.forEach((enem) => {
            enem.speed = enem.speed * -2;
        });
        setTimeout(() => {
            reversedEnemies.forEach((enem) => {
                enem.speed = enem.speed * -0.5;
            });
        }, 1500);
    }
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
