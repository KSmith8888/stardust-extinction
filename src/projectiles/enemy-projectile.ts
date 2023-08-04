import Game from "../../levels/game-logic";
import { areObjectsColliding } from "../utils/collision";

export default class EnemyProjectile {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    damage: number;
    width: number;
    height: number;
    speed: number;
    image: HTMLImageElement;
    hasHitTarget: boolean;
    isOffScreen: boolean;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        damage: number
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.width = 0;
        this.height = 0;
        this.speed = 1;
        this.image = new Image();
        this.hasHitTarget = false;
        this.isOffScreen = false;
    }
    handleCollision() {
        if (!this.hasHitTarget && areObjectsColliding(this, this.game.player)) {
            this.game.player.health -= this.damage;
            this.hasHitTarget = true;
        }
    }
    render() {
        this.handleCollision();
        if (this.y < this.canvas.height) {
            this.y += this.speed;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
