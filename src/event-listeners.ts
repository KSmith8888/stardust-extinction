import Player from "./player";
import { sizeCanvas } from "./utils/sizeCanvas";

export default class EventListeners {
    player: Player;
    isPlayerMoving: boolean;
    sizeCanvas: void;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    touchstart: void;
    touchend: void;
    touchmove: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.isPlayerMoving = false;
        this.sizeCanvas = window.addEventListener("resize", () => {
            sizeCanvas(canvas);
        });
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height
            ) {
                this.isPlayerMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (): void => {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (this.isPlayerMoving) {
                if (e.offsetX + this.player.width / 2 > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.player.width / 2;
                }
                if (e.offsetY + this.player.height / 2 > canvas.height) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.offsetY - this.player.height / 2 < 45) {
                    this.player.y = 45;
                } else {
                    this.player.y = e.offsetY - this.player.height / 2;
                }
            }
        });
        this.touchstart = canvas.addEventListener("touchstart", (e): void => {
            if (
                e.touches[0].clientX >= this.player.x &&
                e.touches[0].clientX <= this.player.x + this.player.width &&
                e.touches[0].clientY >= this.player.y &&
                e.touches[0].clientY <= this.player.y + this.player.height
            ) {
                this.isPlayerMoving = true;
            }
        });
        this.touchend = canvas.addEventListener("touchend", (): void => {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
            }
        });
        this.touchmove = canvas.addEventListener("touchmove", (e): void => {
            if (this.isPlayerMoving) {
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
                    canvas.height
                ) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.touches[0].clientY - this.player.height / 2 < 45) {
                    this.player.y = 45;
                } else {
                    this.player.y =
                        e.touches[0].clientY - this.player.height / 2;
                }
            }
        });
    }
}
