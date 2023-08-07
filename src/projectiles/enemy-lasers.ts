import Game from "../../levels/game-logic";
import EnemyProjectile from "./enemy-projectile";
import enemySmallLaserUrl from "../../assets/images/projectiles/enemy-laser-small.png";
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
        this.speed = 6.25;
        this.image.src = enemySmallLaserUrl;
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
        this.speed = 5.75;
        this.image.src = enemyLargeLaserUrl;
        this.damage = 30;
    }
}
