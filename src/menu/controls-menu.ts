import Game from "../../levels/game-logic";
import MainMenu from "./main-menu";

export default class ControlsMenu {
    game: Game;
    mainMenu: MainMenu;
    controlsMenu: HTMLDialogElement;
    keyboardControlsButton: HTMLButtonElement;
    useKeyboardControls: void;
    mouseControlsButton: HTMLButtonElement;
    useMouseControls: void;
    currentRebindKey: string | null;
    controlsKeyEvent: void;
    menuKeyText: HTMLParagraphElement;
    changeMenuKeyButton: HTMLButtonElement;
    changeMenuKey: void;
    upKeyText: HTMLParagraphElement;
    changeUpKeyButton: HTMLButtonElement;
    changeUpKey: void;
    leftKeyText: HTMLParagraphElement;
    changeLeftKeyButton: HTMLButtonElement;
    changeLeftKey: void;
    downKeyText: HTMLParagraphElement;
    changeDownKeyButton: HTMLButtonElement;
    changeDownKey: void;
    rightKeyText: HTMLParagraphElement;
    changeRightKeyButton: HTMLButtonElement;
    changeRightKey: void;
    closeControlsButton: HTMLButtonElement;
    closeControls: void;
    constructor(game: Game, mainMenu: MainMenu) {
        this.game = game;
        this.mainMenu = mainMenu;
        this.controlsMenu = <HTMLDialogElement>(
            document.getElementById("controls-menu")
        );
        this.keyboardControlsButton = <HTMLButtonElement>(
            document.getElementById("keyboard-controls-button")
        );
        this.useKeyboardControls = this.keyboardControlsButton.addEventListener(
            "click",
            () => {
                localStorage.setItem("controls-setting", "Keyboard");
                this.game.events.controlsSetting = "Keyboard";
                this.keyboardControlsButton.disabled = true;
                this.mouseControlsButton.disabled = false;
            }
        );
        this.mouseControlsButton = <HTMLButtonElement>(
            document.getElementById("mouse-controls-button")
        );
        this.useMouseControls = this.mouseControlsButton.addEventListener(
            "click",
            () => {
                localStorage.setItem("controls-setting", "Mouse");
                this.game.events.controlsSetting = "Mouse";
                this.mouseControlsButton.disabled = true;
                this.keyboardControlsButton.disabled = false;
            }
        );
        this.loadControlsSetting();
        this.currentRebindKey = null;
        this.controlsKeyEvent = document.addEventListener("keydown", (e) => {
            if (this.currentRebindKey) {
                if (this.currentRebindKey === "Menu") {
                    this.game.events.menuKey = e.code;
                    this.menuKeyText.textContent = `MENU: ${e.code}`;
                } else if (this.currentRebindKey === "Up") {
                    this.game.events.upKey = e.code;
                    this.upKeyText.textContent = `UP: ${e.code}`;
                } else if (this.currentRebindKey === "Left") {
                    this.game.events.leftKey = e.code;
                    this.leftKeyText.textContent = `LEFT: ${e.code}`;
                } else if (this.currentRebindKey === "Down") {
                    this.game.events.downKey = e.code;
                    this.downKeyText.textContent = `DOWN: ${e.code}`;
                } else if (this.currentRebindKey === "Right") {
                    this.game.events.rightKey = e.code;
                    this.rightKeyText.textContent = `RIGHT: ${e.code}`;
                }
                this.currentRebindKey = null;
                this.menuKeyText.classList.remove("light-text");
                this.upKeyText.classList.remove("light-text");
                this.leftKeyText.classList.remove("light-text");
                this.downKeyText.classList.remove("light-text");
                this.rightKeyText.classList.remove("light-text");
            }
        });
        this.menuKeyText = <HTMLParagraphElement>(
            document.getElementById("menu-key-text")
        );
        this.changeMenuKeyButton = <HTMLButtonElement>(
            document.getElementById("change-menu-key-button")
        );
        this.changeMenuKey = this.changeMenuKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Menu";
                this.menuKeyText.classList.add("light-text");
            }
        );
        this.upKeyText = <HTMLParagraphElement>(
            document.getElementById("up-key-text")
        );
        this.changeUpKeyButton = <HTMLButtonElement>(
            document.getElementById("change-up-key-button")
        );
        this.changeUpKey = this.changeUpKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Up";
                this.upKeyText.classList.add("light-text");
            }
        );
        this.leftKeyText = <HTMLParagraphElement>(
            document.getElementById("left-key-text")
        );
        this.changeLeftKeyButton = <HTMLButtonElement>(
            document.getElementById("change-left-key-button")
        );
        this.changeLeftKey = this.changeLeftKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Left";
                this.leftKeyText.classList.add("light-text");
            }
        );
        this.downKeyText = <HTMLParagraphElement>(
            document.getElementById("down-key-text")
        );
        this.changeDownKeyButton = <HTMLButtonElement>(
            document.getElementById("change-down-key-button")
        );
        this.changeDownKey = this.changeDownKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Down";
                this.downKeyText.classList.add("light-text");
            }
        );
        this.rightKeyText = <HTMLParagraphElement>(
            document.getElementById("right-key-text")
        );
        this.changeRightKeyButton = <HTMLButtonElement>(
            document.getElementById("change-right-key-button")
        );
        this.changeRightKey = this.changeRightKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Right";
                this.rightKeyText.classList.add("light-text");
            }
        );
        this.closeControlsButton = <HTMLButtonElement>(
            document.getElementById("close-controls-menu-button")
        );
        this.closeControls = this.closeControlsButton.addEventListener(
            "click",
            () => {
                this.mainMenu.isSubMenuOpen = false;
                this.controlsMenu.close();
            }
        );
    }
    loadControlsSetting() {
        const controlsSetting = localStorage.getItem("controls-setting");
        if (controlsSetting) {
            if (controlsSetting === "Keyboard") {
                this.keyboardControlsButton.disabled = true;
                this.mouseControlsButton.disabled = false;
            } else if (controlsSetting === "Mouse") {
                this.mouseControlsButton.disabled = true;
                this.keyboardControlsButton.disabled = false;
            }
        } else {
            localStorage.setItem("controls-setting", "Mouse");
            this.mouseControlsButton.disabled = true;
            this.keyboardControlsButton.disabled = false;
        }
    }
}
