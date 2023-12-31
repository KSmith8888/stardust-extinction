import Explosion from "./explosion";
import Game from "../../levels/game-logic";
import largeExplosionUrl from "../../assets/images/explosions/large-explosion.png";
import { areObjectsColliding } from "../utils/collision";

export class LargeExplosion extends Explosion {
    game: Game;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    damage: number;
    damagedPlayer: boolean;
    constructor(
        game: Game,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        super();
        this.game = game;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 65;
        this.image = new Image();
        this.image.src = largeExplosionUrl;
        this.damage = 40;
        this.damagedPlayer = false;
        this.game.events.audioEvents.playExplosionSound();
    }
    checkForCollision() {
        if (
            !this.damagedPlayer &&
            areObjectsColliding(this, this.game.player)
        ) {
            this.game.player.health -= this.damage;
            this.damagedPlayer = true;
        }
        this.game.enemies.forEach((enemy) => {
            if (!enemy.isFree && areObjectsColliding(this, enemy)) {
                enemy.health -= this.damage;
            }
        });
    }
    render() {
        this.checkForCollision();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
