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
                    if (events.controlsSetting === "Keyboard") {
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
                    if (events.controlsSetting === "Keyboard") {
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
                        events.audioEvents.beepAudio.play();
                        this.player.isMoving = false;
                        this.game.mainMenu.mainMenu.showModal();
                        this.game.mainMenu.openSettingsButton.focus();
                        this.game.mainMenu.isMenuOpen = true;
                        this.game.isGamePaused = true;
                    } else {
                        if (!this.game.mainMenu.isSubMenuOpen) {
                            events.audioEvents.beepAudio.play();
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
                default: {
                    console.log("No action for that key");
                }
            }
        });
    }
}
