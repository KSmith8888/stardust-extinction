import Enemy from "./enemy";
import Game from "../../levels/game-logic";
import Player from "../player/player";
import { SmallExplosion } from "../explosions/small-explosion";
import smallGrabberUrl from "../../assets/images/enemies/small-grabber.png";

export class SmallGrabber extends Enemy {
    player: Player;
    speed: number;
    image: HTMLImageElement;
    attachedRight: boolean;
    attachedLeft: boolean;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        player: Player
    ) {
        super(game, canvas, ctx);
        this.player = player;
        this.firesProjectiles = true;
        this.width = 24;
        this.height = 21;
        this.speed = Math.floor(Math.random() * 4) + 3;
        this.healthStat = 200;
        this.health = 200;
        this.generateExplosionOnHit = false;
        this.image = new Image();
        this.image.src = smallGrabberUrl;
        this.attachedRight = false;
        this.attachedLeft = false;
    }
    render() {
        if (this.health <= 0) {
            this.attachedLeft = false;
            this.attachedRight = false;
            this.game.explosions.push(
                new SmallExplosion(this.ctx, this.x, this.y)
            );
            this.destroyedByPlayer();
        }
        if (this.attachedLeft) {
            this.x = this.player.x - (this.width - 13);
            this.y = this.player.y + 7;
        } else if (this.attachedRight) {
            this.x = this.player.x + (this.player.width - 13);
            this.y = this.player.y + 7;
        } else {
            if (this.y < this.canvas.height) {
                this.y += this.speed;
            } else {
                this.reset();
            }
            this.followTargetX();
            if (!this.isReversed) {
                this.targetX = this.player.x;
            }
        }
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    attachedToPlayer() {
        if (!this.attachedRight && !this.attachedLeft) {
            if (this.x < this.player.x + this.player.width / 2) {
                this.attachedLeft = true;
            } else {
                this.attachedRight = true;
            }
        }
    }
}
