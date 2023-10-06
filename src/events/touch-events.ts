import Player from "../player/player";

export default class TouchEvents {
    player: Player;
    canvas: HTMLCanvasElement;
    halfWidth: number;
    halfHeight: number;
    healthbarArea: number;
    touchstart: void;
    touchend: void;
    touchmove: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.canvas = canvas;
        this.halfWidth = this.player.width / 2;
        this.halfHeight = this.player.height / 2;
        this.healthbarArea = canvas.height - 35;
        this.touchstart = canvas.addEventListener("touchstart", (e): void => {
            if (
                e.touches[0].clientX >= this.player.x &&
                e.touches[0].clientX <= this.player.x + this.player.width &&
                e.touches[0].clientY >= this.player.y &&
                e.touches[0].clientY <= this.player.y + this.player.height &&
                e.touches[0].clientY < this.healthbarArea &&
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
                if (e.touches[0].clientX + this.halfWidth > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.touches[0].clientX - this.halfWidth < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.touches[0].clientX - this.halfWidth;
                }
                if (
                    e.touches[0].clientY + this.halfHeight >
                    canvas.height - 30
                ) {
                    this.player.y = canvas.height - (this.player.height + 30);
                } else if (e.touches[0].clientY - this.halfHeight < 40) {
                    this.player.y = 40;
                } else {
                    this.player.y = e.touches[0].clientY - this.halfHeight;
                }
            }
        });
    }
}
