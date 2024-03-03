import Game from "../../levels/game-logic";
import Player from "../player/player";
import { sizeCanvas } from "../utils/sizeCanvas";
import AudioEvents from "./audio-events";
import MouseEvents from "./mouse-events";
import TouchEvents from "./touch-events";
import KeyboardEvents from "./keyboard-events";

export default class EventListeners {
    game: Game;
    player: Player;
    canvas: HTMLCanvasElement;
    hasBeenResized: boolean;
    sizeCanvas: void;
    contextMenu: void;
    controlsSetting: string;
    mouseEvents: MouseEvents | null;
    touchEvents: TouchEvents | null;
    keyEvents: KeyboardEvents | null;
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
            this.player.y = canvas.height - (this.player.height + 60);
            this.hasBeenResized = true;
        });
        this.contextMenu = this.canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
        this.controlsSetting =
            localStorage.getItem("controls-setting") || "Touch";
        if (this.game.screenMode === "Mobile") {
            this.controlsSetting = "Touch";
        }
        this.mouseEvents =
            this.controlsSetting === "Mouse"
                ? new MouseEvents(this.player, this.canvas)
                : null;
        this.touchEvents =
            this.controlsSetting === "Touch"
                ? new TouchEvents(this.player, this.canvas)
                : null;
        this.keyEvents =
            this.game.screenMode === "Desktop"
                ? new KeyboardEvents(this.game, this, this.player, this.canvas)
                : null;
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
                location.assign(`${import.meta.env.BASE_URL}/index.html`);
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
                location.assign(`/${import.meta.env.BASE_URL}/index.html`);
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
                location.assign(
                    `${import.meta.env.BASE_URL}${this.game.nextLevelUrl}`
                );
            }
        );
        this.loadingText = <HTMLParagraphElement>(
            document.getElementById("loading-text")
        );
        this.loadingText.classList.add("no-display");
    }
}
