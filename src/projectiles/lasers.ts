import Projectile from "./projectile";
import Game from "../../levels/level-1/level-1-logic";
import smallLaserUrl from "../../assets/images/projectiles/laser-small.png";
import medLaserPurpleUrl from "../../assets/images/projectiles/laser-medium-purple.png";

export class LaserSmall extends Projectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        super(game, canvas, ctx, x, y);
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 14;
        this.speed = 2.25;
        this.image.src = smallLaserUrl;
        this.game = game;
    }
    render() {
        this.handleCollision();
        if (this.y > 0) {
            this.y -= this.speed;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}

export class LaserMediumTwo extends Projectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        super(game, canvas, ctx, x, y);
        this.x = x;
        this.y = y;
        this.width = 9;
        this.height = 20;
        this.speed = 2.75;
        this.image.src = medLaserPurpleUrl;
        this.damageMultiplier = 2;
    }
    render() {
        this.handleCollision();
        if (this.y > 0) {
            this.y -= this.speed;
        } else {
            this.isOffScreen = true;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
