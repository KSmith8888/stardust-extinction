import Projectile from "./projectile";
import Game from "../../levels/game-logic";
import smallLaserUrl from "../../assets/images/projectiles/laser-small.png";
import medLaserPurpleUrl from "../../assets/images/projectiles/laser-medium-purple.png";
import medLaserCyanUrl from "../../assets/images/projectiles/laser-medium-cyan.png";

export class LaserSmall extends Projectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 8;
        this.height = 14;
        this.speed = 5.25;
        this.image.src = smallLaserUrl;
    }
}

export class LaserMediumTwo extends Projectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 7;
        this.height = 18;
        this.speed = 4.75;
        this.image.src = medLaserPurpleUrl;
        this.damage = 15;
    }
}

export class LaserMediumThree extends Projectile {
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        super(game, canvas, ctx);
        this.width = 7;
        this.height = 18;
        this.speed = 4.75;
        this.image.src = medLaserCyanUrl;
        this.damage = 25;
    }
}
