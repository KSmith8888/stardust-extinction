import Game from "../../levels/game-logic";
import Player from "../player/player";
import MenuEvents from "./menu-events";
import { sizeCanvas } from "../utils/sizeCanvas";
import AudioEvents from "./audio-events";

export default class EventListeners {
    game: Game;
    player: Player;
    canvas: HTMLCanvasElement;
    hasBeenResized: boolean;
    sizeCanvas: void;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    touchstart: void;
    touchend: void;
    touchmove: void;
    keyEvent: void;
    menuEvents: MenuEvents;
    audioEvents: AudioEvents;
    gameOverModal: HTMLDialogElement;
    gameOverCloseBtn: HTMLButtonElement;
    levelCompleteModal: HTMLDialogElement;
    exitOnGameOver: void;
    startNextLevel: void;
    nextLevelButton: HTMLButtonElement;
    statsTextEnemies: HTMLParagraphElement;
    statsTextHealth: HTMLParagraphElement;
    constructor(game: Game, canvas: HTMLCanvasElement) {
        this.game = game;
        this.player = this.game.player;
        this.canvas = canvas;
        this.hasBeenResized = false;
        this.sizeCanvas = window.addEventListener("resize", () => {
            sizeCanvas(canvas);
            this.player.x = canvas.width / 2;
            this.player.y = canvas.height - (this.player.height + 35);
            this.hasBeenResized = true;
        });
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
        this.keyEvent = document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "ArrowLeft": {
                    if (this.player.x >= 5 && !this.player.isShipDisabled) {
                        this.player.isMoving = true;
                        this.player.x -= 5;
                    } else {
                        this.player.isMoving = false;
                    }
                    break;
                }
                case "ArrowRight": {
                    if (
                        this.player.x <=
                            canvas.width - (this.player.width + 5) &&
                        !this.player.isShipDisabled
                    ) {
                        this.player.isMoving = true;
                        this.player.x += 5;
                    } else {
                        this.player.isMoving = false;
                    }
                    break;
                }
                case "ArrowUp": {
                    if (this.player.y >= 5 && !this.player.isShipDisabled) {
                        this.player.isMoving = true;
                        this.player.y -= 5;
                    } else {
                        this.player.isMoving = false;
                    }
                    break;
                }
                case "ArrowDown": {
                    if (
                        this.player.y <
                            canvas.height - (40 + this.player.height) &&
                        !this.player.isShipDisabled
                    ) {
                        this.player.isMoving = true;
                        this.player.y += 5;
                    } else {
                        this.player.isMoving = false;
                    }
                    break;
                }
                case "KeyM": {
                    this.audioEvents.beepAudio.play();
                    if (!this.menuEvents.isMenuOpen) {
                        this.menuEvents.mainMenu.showModal();
                        this.menuEvents.closeButton.focus();
                        this.menuEvents.isMenuOpen = true;
                        this.game.isGamePaused = true;
                    } else {
                        this.menuEvents.mainMenu.close();
                        this.menuEvents.isMenuOpen = false;
                        this.game.isGamePaused = false;
                    }
                    break;
                }
                default: {
                    console.log("No action for that key");
                }
            }
        });
        this.audioEvents = new AudioEvents();
        this.menuEvents = new MenuEvents(this.game);
        this.gameOverModal = <HTMLDialogElement>(
            document.getElementById("game-over-modal")
        );
        this.gameOverCloseBtn = <HTMLButtonElement>(
            document.getElementById("game-over-close-button")
        );
        this.levelCompleteModal = <HTMLDialogElement>(
            document.getElementById("level-complete-modal")
        );
        this.exitOnGameOver = this.gameOverCloseBtn.addEventListener(
            "click",
            () => {
                location.assign("/");
            }
        );
        this.nextLevelButton = <HTMLButtonElement>(
            document.getElementById("next-level-button")
        );
        this.statsTextEnemies = <HTMLParagraphElement>(
            document.getElementById("stats-text-enemies")
        );
        this.statsTextHealth = <HTMLParagraphElement>(
            document.getElementById("stats-text-health")
        );
        this.startNextLevel = this.nextLevelButton.addEventListener(
            "click",
            () => {
                location.assign(this.game.nextLevelUrl);
            }
        );
    }
}
