import Player from "../player/player";

export default class TouchEvents {
    player: Player;
    canvas: HTMLCanvasElement;
    touchstart: void;
    touchend: void;
    touchmove: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.canvas = canvas;
        this.touchstart = canvas.addEventListener("touchstart", (e): void => {
            if (
                e.touches[0].clientX >= this.player.x &&
                e.touches[0].clientX <= this.player.x + this.player.width &&
                e.touches[0].clientY >= this.player.y &&
                e.touches[0].clientY <= this.player.y + this.player.height &&
                e.touches[0].clientY < canvas.height - 35 &&
                !this.player.isShipDisabled
            ) {
                this.player.isMoving = true;
            }
        });
        this.touchend = canvas.addEventListener("touchend", (): void => {
            if (this.player.isMoving) {
                this.player.isMoving = false;
            }
        });
        this.touchmove = canvas.addEventListener("touchmove", (e): void => {
            if (this.player.isMoving && !this.player.isShipDisabled) {
                if (
                    e.touches[0].clientX + this.player.width / 2 >
                    canvas.width
                ) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.touches[0].clientX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x =
                        e.touches[0].clientX - this.player.width / 2;
                }
                if (
                    e.touches[0].clientY + this.player.height / 2 >
                    canvas.height - 30
                ) {
                    this.player.y = canvas.height - (this.player.height + 30);
                } else if (e.touches[0].clientY - this.player.height / 2 < 40) {
                    this.player.y = 40;
                } else {
                    this.player.y =
                        e.touches[0].clientY - this.player.height / 2;
                }
            }
        });
    }
}
