import Game from "../../levels/game-logic";
import Player from "../player/player";
import { sizeCanvas } from "../utils/sizeCanvas";
import AudioEvents from "./audio-events";
import { Overcharge } from "../explosions/overcharge";

export default class EventListeners {
    game: Game;
    player: Player;
    canvas: HTMLCanvasElement;
    hasBeenResized: boolean;
    sizeCanvas: void;
    controlsSetting: string;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    touchstart: void;
    touchend: void;
    touchmove: void;
    leftKey: string;
    rightKey: string;
    upKey: string;
    downKey: string;
    menuKey: string;
    specialKey: string;
    keyEvent: void;
    audioEvents: AudioEvents;
    gameOverModal: HTMLDialogElement;
    gameOverCloseBtn: HTMLButtonElement;
    levelCompleteModal: HTMLDialogElement;
    exitOnGameOver: void;
    startNextLevel: void;
    nextLevelButton: HTMLButtonElement;
    exitGameButton: HTMLButtonElement;
    backToTitleScreen: void;
    statsTextEnemies: HTMLParagraphElement;
    statsTextHealth: HTMLParagraphElement;
    loadingText: HTMLParagraphElement;
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
        this.controlsSetting =
            localStorage.getItem("controls-setting") || "Mouse";
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                this.controlsSetting === "Mouse" &&
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
            if (this.controlsSetting === "Mouse" && this.player.isMoving) {
                this.player.isMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (
                this.controlsSetting === "Mouse" &&
                this.player.isMoving &&
                !this.player.isShipDisabled
            ) {
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
                this.controlsSetting === "Mouse" &&
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
            if (this.controlsSetting === "Mouse" && this.player.isMoving) {
                this.player.isMoving = false;
            }
        });
        this.touchmove = canvas.addEventListener("touchmove", (e): void => {
            if (
                this.controlsSetting === "Mouse" &&
                this.player.isMoving &&
                !this.player.isShipDisabled
            ) {
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
        this.leftKey = "KeyA";
        this.rightKey = "KeyD";
        this.upKey = "KeyW";
        this.downKey = "KeyS";
        this.menuKey = "KeyM";
        this.specialKey = "KeyO";
        this.keyEvent = document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case this.leftKey: {
                    if (this.controlsSetting === "Keyboard") {
                        if (
                            this.player.x >= this.player.speed &&
                            !this.player.isShipDisabled
                        ) {
                            this.player.isMoving = true;
                            this.player.x -= this.player.speed;
                        } else {
                            this.player.isMoving = false;
                        }
                    }
                    break;
                }
                case this.rightKey: {
                    if (this.controlsSetting === "Keyboard") {
                        if (
                            this.player.x <=
                                canvas.width -
                                    (this.player.width + this.player.speed) &&
                            !this.player.isShipDisabled
                        ) {
                            this.player.isMoving = true;
                            this.player.x += this.player.speed;
                        } else {
                            this.player.isMoving = false;
                        }
                    }
                    break;
                }
                case this.upKey: {
                    if (this.controlsSetting === "Keyboard") {
                        if (
                            this.player.y >= this.player.speed &&
                            !this.player.isShipDisabled
                        ) {
                            this.player.isMoving = true;
                            this.player.y -= this.player.speed;
                        } else {
                            this.player.isMoving = false;
                        }
                    }
                    break;
                }
                case this.downKey: {
                    if (this.controlsSetting === "Keyboard") {
                        if (
                            this.player.y <
                                canvas.height - (40 + this.player.height) &&
                            !this.player.isShipDisabled
                        ) {
                            this.player.isMoving = true;
                            this.player.y += this.player.speed;
                        } else {
                            this.player.isMoving = false;
                        }
                    }
                    break;
                }
                case this.menuKey: {
                    if (
                        !this.game.mainMenu.isMenuOpen &&
                        !this.game.mainMenu.isSubMenuOpen
                    ) {
                        this.audioEvents.beepAudio.play();
                        this.player.isMoving = false;
                        this.game.mainMenu.mainMenu.showModal();
                        this.game.mainMenu.openSettingsButton.focus();
                        this.game.mainMenu.isMenuOpen = true;
                        this.game.isGamePaused = true;
                    } else {
                        if (!this.game.mainMenu.isSubMenuOpen) {
                            this.audioEvents.beepAudio.play();
                            this.game.mainMenu.mainMenu.close();
                            this.game.mainMenu.isMenuOpen = false;
                            this.game.isGamePaused = false;
                        }
                    }
                    break;
                }
                case this.specialKey: {
                    this.game.explosions.push(
                        new Overcharge(
                            this.game,
                            this.game.ctx,
                            this.player.x,
                            this.player.y
                        )
                    );
                    break;
                }
                default: {
                    console.log("No action for that key");
                }
            }
        });
        this.audioEvents = new AudioEvents(this.game.mainMenu);
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
        this.exitGameButton = <HTMLButtonElement>(
            document.getElementById("exit-game-button")
        );
        this.backToTitleScreen = this.exitGameButton.addEventListener(
            "click",
            () => {
                location.assign("/");
            }
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
        this.loadingText = <HTMLParagraphElement>(
            document.getElementById("loading-text")
        );
        this.loadingText.classList.add("no-display");
    }
}
