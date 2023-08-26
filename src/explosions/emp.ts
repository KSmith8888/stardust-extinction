import Game from "../../levels/game-logic";
import Explosion from "./explosion";
import largeEmpUrl from "../../assets/images/explosions/large-emp.png";
import { areObjectsColliding } from "../utils/collision";

export class LargeEmp extends Explosion {
    game: Game;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement;
    hasDisabledPlayer: boolean;
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
        this.image.src = largeEmpUrl;
        this.hasDisabledPlayer = false;
        this.game.events.audioEvents.playEmpSound();
    }
    checkForCollision() {
        if (
            !this.hasDisabledPlayer &&
            areObjectsColliding(this, this.game.player)
        ) {
            this.game.player.isShipDisabled = true;
            this.hasDisabledPlayer = true;
        }
    }
    render() {
        this.checkForCollision();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
