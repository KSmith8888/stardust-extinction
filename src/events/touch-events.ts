import Player from "../player/player";

export default class TouchEvents {
    player: Player;
    canvas: HTMLCanvasElement;
    halfWidth: number;
    halfHeight: number;
    lowerBound: number;
    upperBound: number;
    currentTap: number;
    lastTap: number;
    dblTapInterval: number;
    touchstart: void;
    touchend: void;
    touchmove: void;
    touchcancel: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.canvas = canvas;
        this.halfWidth = this.player.width / 2;
        this.halfHeight = this.player.height / 2;
        this.lowerBound = canvas.height - 60;
        this.upperBound = 60;
        this.currentTap = 0;
        this.lastTap = 0;
        this.dblTapInterval = 500;
        this.touchstart = canvas.addEventListener(
            "touchstart",
            (e): void => {
                e.preventDefault();
                this.lastTap = this.currentTap;
                this.currentTap = new Date().getTime();
                if (this.currentTap - this.lastTap < this.dblTapInterval) {
                    this.player.useSpecialAttack();
                }
                if (
                    e.touches[0].clientX >= this.player.x &&
                    e.touches[0].clientX <= this.player.x + this.player.width &&
                    e.touches[0].clientY >= this.player.y &&
                    e.touches[0].clientY <=
                        this.player.y + this.player.height &&
                    e.touches[0].clientY < this.lowerBound &&
                    !this.player.isShipDisabled
                ) {
                    this.player.isMoving = true;
                }
            },
            { passive: false }
        );
        this.touchend = canvas.addEventListener(
            "touchend",
            (e): void => {
                e.preventDefault();
                if (this.player.isMoving) {
                    this.player.isMoving = false;
                }
            },
            { passive: false }
        );
        this.touchmove = canvas.addEventListener(
            "touchmove",
            (e): void => {
                e.preventDefault();
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
                        this.lowerBound
                    ) {
                        this.player.y = this.lowerBound - this.player.height;
                    } else if (
                        e.touches[0].clientY - this.halfHeight <
                        this.upperBound
                    ) {
                        this.player.y = this.upperBound;
                    } else {
                        this.player.y = e.touches[0].clientY - this.halfHeight;
                    }
                }
            },
            { passive: false }
        );
        this.touchcancel = canvas.addEventListener(
            "touchcancel",
            () => {
                if (this.player.isMoving) {
                    this.player.isMoving = false;
                }
            },
            { passive: true }
        );
    }
}
