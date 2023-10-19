import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import { SmallExplosion } from "../explosions/small-explosion";
import enemySmallLaserUrl from "../../assets/images/projectiles/enemy-laser-small.png";
import enemyMediumLaserUrl from "../../assets/images/projectiles/laser-medium-green.png";
import enemyLargeLaserUrl from "../../assets/images/projectiles/enemy-laser-large.png";

export class EnemyLaserSmall extends EnemyProjectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 5;
        this.height = 12;
        this.speed = 8.75;
        this.image.src = enemySmallLaserUrl;
    }
}

export class EnemyLaserMedium extends EnemyProjectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 7;
        this.height = 18;
        this.speed = 8.25;
        this.image.src = enemyMediumLaserUrl;
        this.damage = 20;
    }
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
        this.game.player.health -= this.damage;
    }
}

export class EnemyLaserLarge extends EnemyProjectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 13;
        this.height = 26;
        this.speed = 7.75;
        this.image.src = enemyLargeLaserUrl;
        this.damage = 30;
    }
    collidedWithPlayer() {
        this.game.explosions.push(new SmallExplosion(this.ctx, this.x, this.y));
        this.game.player.health -= this.damage;
    }
}
