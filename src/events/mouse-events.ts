import Player from "../player/player";

export default class MouseEvents {
    player: Player;
    canvas: HTMLCanvasElement;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.canvas = canvas;
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height &&
                e.offsetY < this.canvas.height - 35 &&
                !this.player.isShipDisabled
            ) {
                this.player.isMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (): void => {
            if (this.player.isMoving) {
                this.player.isMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (this.player.isMoving && !this.player.isShipDisabled) {
                if (e.offsetX + this.player.width / 2 > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.player.width / 2;
                }
                if (
                    e.offsetY - this.player.height / 2 >
                    canvas.height - (this.player.height + 30)
                ) {
                    this.player.y = canvas.height - (this.player.height + 30);
                } else if (e.offsetY - this.player.height / 2 < 40) {
                    this.player.y = 40;
                } else {
                    this.player.y = e.offsetY - this.player.height / 2;
                }
            }
        });
    }
}
