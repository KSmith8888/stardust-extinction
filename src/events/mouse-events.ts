import Player from "../player/player";

export default class MouseEvents {
    player: Player;
    canvas: HTMLCanvasElement;
    halfWidth: number;
    halfHeight: number;
    lowerBound: number;
    upperBound: number;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.canvas = canvas;
        this.halfWidth = this.player.width / 2;
        this.halfHeight = this.player.height / 2;
        this.lowerBound = canvas.height - 60 - this.player.height;
        this.upperBound = 60;
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (e.button === 2) {
                this.player.useSpecialAttack();
            } else if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height &&
                e.offsetY < this.lowerBound + this.player.height &&
                !this.player.isShipDisabled
            ) {
                this.player.isMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (e): void => {
            if (e.button !== 2 && this.player.isMoving) {
                this.player.isMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (this.player.isMoving && !this.player.isShipDisabled) {
                if (e.offsetX + this.halfWidth > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.halfWidth < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.halfWidth;
                }
                if (e.offsetY - this.halfHeight > this.lowerBound) {
                    this.player.y = this.lowerBound;
                } else if (e.offsetY - this.halfHeight < this.upperBound) {
                    this.player.y = this.upperBound;
                } else {
                    this.player.y = e.offsetY - this.halfHeight;
                }
            }
        });
    }
}
