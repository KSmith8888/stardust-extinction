import Game from "../../levels/game-logic";
import Player from "../player/player";
import EventListeners from "./event-listeners";

export default class KeyboardEvents {
    game: Game;
    events: EventListeners;
    player: Player;
    canvas: HTMLCanvasElement;
    leftKey: string;
    rightKey: string;
    upKey: string;
    downKey: string;
    menuKey: string;
    specialKey: string;
    lowerBound: number;
    upperBound: number;
    rightBound: number;
    keyEvent: void;
    constructor(
        game: Game,
        events: EventListeners,
        player: Player,
        canvas: HTMLCanvasElement
    ) {
        this.game = game;
        this.events = events;
        this.player = player;
        this.canvas = canvas;
        this.leftKey = localStorage.getItem("left-key") || "KeyA";
        this.rightKey = localStorage.getItem("right-key") || "KeyD";
        this.upKey = localStorage.getItem("up-key") || "KeyW";
        this.downKey = localStorage.getItem("down-key") || "KeyS";
        this.menuKey = localStorage.getItem("menu-key") || "KeyM";
        this.specialKey = localStorage.getItem("special-key") || "KeyO";
        this.lowerBound = canvas.height - 60 - this.player.height;
        this.upperBound = 60 + this.player.speed;
        this.rightBound =
            canvas.width - (this.player.width + this.player.speed);
        this.keyEvent = document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case this.leftKey: {
                    if (events.controlsSetting === "Keyboard") {
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
                    if (events.controlsSetting === "Keyboard") {
                        if (
                            this.player.x <= this.rightBound &&
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
                    if (events.controlsSetting === "Keyboard") {
                        if (
                            this.player.y >= this.upperBound &&
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
                    if (events.controlsSetting === "Keyboard") {
                        if (
                            this.player.y < this.lowerBound &&
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
                    if (this.game.mainMenu.isSubMenuOpen) {
                        if (
                            this.game.mainMenu.settings &&
                            this.game.mainMenu.settings.settingsMenu.open
                        ) {
                            this.game.mainMenu.settings.settingsMenu.close();
                        } else if (
                            this.game.mainMenu.audio &&
                            this.game.mainMenu.audio.audioMenu.open
                        ) {
                            this.game.mainMenu.audio.audioMenu.close();
                        } else if (
                            this.game.mainMenu.controls &&
                            this.game.mainMenu.controls.controlsMenu.open
                        ) {
                            this.game.mainMenu.controls.controlsMenu.close();
                        }
                        this.game.mainMenu.isSubMenuOpen = false;
                    } else {
                        events.audioEvents.beepAudio.play();
                        if (!this.game.mainMenu.isMenuOpen) {
                            this.player.isMoving = false;
                            this.game.mainMenu.mainMenu.showModal();
                            this.game.mainMenu.openSettingsButton.focus();
                            this.game.mainMenu.isMenuOpen = true;
                            this.game.isGamePaused = true;
                        } else {
                            this.game.mainMenu.mainMenu.close();
                            this.game.mainMenu.isMenuOpen = false;
                            this.game.isGamePaused = false;
                        }
                    }
                    break;
                }
                case this.specialKey: {
                    this.player.useSpecialAttack();
                    break;
                }
            }
        });
    }
}
