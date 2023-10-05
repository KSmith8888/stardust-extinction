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
        this.controlsMenu = document.createElement("dialog");
        this.keyboardControlsButton = document.createElement("button");
        this.useKeyboardControls = this.keyboardControlsButton.addEventListener(
            "click",
            () => {
                if (
                    window.confirm(
                        "Changing the controls setting will restart the current level, are you sure that you want to change it?"
                    )
                ) {
                    localStorage.setItem("controls-setting", "Keyboard");
                    location.reload();
                }
            }
        );
        this.mouseControlsButton = document.createElement("button");
        this.useMouseControls = this.mouseControlsButton.addEventListener(
            "click",
            () => {
                if (
                    window.confirm(
                        "Changing the controls setting will restart the current level, are you sure that you want to change it?"
                    )
                ) {
                    localStorage.setItem("controls-setting", "Mouse");
                    location.reload();
                }
            }
        );
        this.loadControlsSetting();
        this.currentRebindKey = null;
        this.controlsKeyEvent = document.addEventListener("keydown", (e) => {
            if (this.currentRebindKey && this.game.events.keyEvents) {
                if (this.currentRebindKey === "Menu") {
                    this.game.events.keyEvents.menuKey = e.code;
                    this.menuKeyText.textContent = `MENU: ${e.code}`;
                } else if (this.currentRebindKey === "Up") {
                    this.game.events.keyEvents.upKey = e.code;
                    this.upKeyText.textContent = `UP: ${e.code}`;
                } else if (this.currentRebindKey === "Left") {
                    this.game.events.keyEvents.leftKey = e.code;
                    this.leftKeyText.textContent = `LEFT: ${e.code}`;
                } else if (this.currentRebindKey === "Down") {
                    this.game.events.keyEvents.downKey = e.code;
                    this.downKeyText.textContent = `DOWN: ${e.code}`;
                } else if (this.currentRebindKey === "Right") {
                    this.game.events.keyEvents.rightKey = e.code;
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
        this.menuKeyText = document.createElement("p");
        this.changeMenuKeyButton = document.createElement("button");
        this.changeMenuKey = this.changeMenuKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Menu";
                this.menuKeyText.classList.add("light-text");
            }
        );
        this.upKeyText = document.createElement("p");
        this.changeUpKeyButton = document.createElement("button");
        this.changeUpKey = this.changeUpKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Up";
                this.upKeyText.classList.add("light-text");
            }
        );
        this.leftKeyText = document.createElement("p");
        this.changeLeftKeyButton = document.createElement("button");
        this.changeLeftKey = this.changeLeftKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Left";
                this.leftKeyText.classList.add("light-text");
            }
        );
        this.downKeyText = document.createElement("p");
        this.changeDownKeyButton = document.createElement("button");
        this.changeDownKey = this.changeDownKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Down";
                this.downKeyText.classList.add("light-text");
            }
        );
        this.rightKeyText = document.createElement("p");
        this.changeRightKeyButton = document.createElement("button");
        this.changeRightKey = this.changeRightKeyButton.addEventListener(
            "click",
            () => {
                this.currentRebindKey = "Right";
                this.rightKeyText.classList.add("light-text");
            }
        );
        this.closeControlsButton = document.createElement("button");
        this.closeControls = this.closeControlsButton.addEventListener(
            "click",
            () => {
                this.mainMenu.isSubMenuOpen = false;
                this.controlsMenu.close();
            }
        );
        this.generateControlsHTML();
    }
    generateControlsHTML() {
        this.controlsMenu.classList.add("modal");
        this.mainMenu.container.append(this.controlsMenu);
        const controlsHeading = document.createElement("h2");
        controlsHeading.classList.add("menu-main-heading");
        controlsHeading.textContent = "Controls";
        this.controlsMenu.append(controlsHeading);
        const movementSubHeading = document.createElement("h3");
        movementSubHeading.classList.add("controls-sub-heading");
        movementSubHeading.textContent = "Movement Controls:";
        this.controlsMenu.append(movementSubHeading);
        const movementControls = document.createElement("div");
        movementControls.id = "movement-controls-container";
        this.controlsMenu.append(movementControls);
        this.keyboardControlsButton.type = "button";
        this.keyboardControlsButton.classList.add("button");
        this.keyboardControlsButton.textContent = "Keyboard";
        movementControls.append(this.keyboardControlsButton);
        this.mouseControlsButton.type = "button";
        this.mouseControlsButton.classList.add("button");
        this.mouseControlsButton.textContent = "Mouse/Touch";
        movementControls.append(this.mouseControlsButton);
        const rebindSubHeading = document.createElement("h3");
        rebindSubHeading.classList.add("controls-sub-heading");
        rebindSubHeading.textContent = "Key Rebinding:";
        this.controlsMenu.append(rebindSubHeading);
        const controlsMainText = document.createElement("p");
        controlsMainText.id = "controls-menu-main-text";
        controlsMainText.textContent = `Press the "Change" button next to the control you want to update, then press the key that you want to use instead.`;
        this.controlsMenu.append(controlsMainText);
        const rebindControls = document.createElement("div");
        this.controlsMenu.append(rebindControls);
        const controlsRowOne = document.createElement("div");
        controlsRowOne.classList.add("change-control-row");
        rebindControls.append(controlsRowOne);
        const changeKeyMenu = document.createElement("div");
        changeKeyMenu.classList.add("change-control-key");
        controlsRowOne.append(changeKeyMenu);
        this.menuKeyText.classList.add("control-key-text");
        this.menuKeyText.textContent = "MENU: KeyM";
        changeKeyMenu.append(this.menuKeyText);
        this.changeMenuKeyButton.type = "button";
        this.changeMenuKeyButton.classList.add("button");
        this.changeMenuKeyButton.textContent = "Change";
        changeKeyMenu.append(this.changeMenuKeyButton);
        const controlsRowTwo = document.createElement("div");
        controlsRowTwo.classList.add("change-control-row");
        rebindControls.append(controlsRowTwo);
        const changeKeyUp = document.createElement("div");
        changeKeyUp.classList.add("change-control-key");
        controlsRowTwo.append(changeKeyUp);
        this.upKeyText.classList.add("control-key-text");
        this.upKeyText.textContent = "UP: KeyW";
        changeKeyUp.append(this.upKeyText);
        this.changeUpKeyButton.type = "button";
        this.changeUpKeyButton.classList.add("button");
        this.changeUpKeyButton.textContent = "Change";
        changeKeyUp.append(this.changeUpKeyButton);
        const changeKeyDown = document.createElement("div");
        changeKeyDown.classList.add("change-control-key");
        controlsRowTwo.append(changeKeyDown);
        this.downKeyText.classList.add("control-key-text");
        this.downKeyText.textContent = "DOWN: KeyS";
        changeKeyDown.append(this.downKeyText);
        this.changeDownKeyButton.type = "button";
        this.changeDownKeyButton.classList.add("button");
        this.changeDownKeyButton.textContent = "Change";
        changeKeyDown.append(this.changeDownKeyButton);
        const controlsRowThree = document.createElement("div");
        controlsRowThree.classList.add("change-control-row");
        rebindControls.append(controlsRowThree);
        const changeKeyLeft = document.createElement("div");
        changeKeyLeft.classList.add("change-control-key");
        controlsRowThree.append(changeKeyLeft);
        this.leftKeyText.classList.add("control-key-text");
        this.leftKeyText.textContent = "LEFT: KeyA";
        changeKeyLeft.append(this.leftKeyText);
        this.changeLeftKeyButton.type = "button";
        this.changeLeftKeyButton.classList.add("button");
        this.changeLeftKeyButton.textContent = "Change";
        changeKeyLeft.append(this.changeLeftKeyButton);
        const changeKeyRight = document.createElement("div");
        changeKeyRight.classList.add("change-control-key");
        controlsRowThree.append(changeKeyRight);
        this.rightKeyText.classList.add("control-key-text");
        this.rightKeyText.textContent = "RIGHT: KeyD";
        changeKeyRight.append(this.rightKeyText);
        this.changeRightKeyButton.type = "button";
        this.changeRightKeyButton.classList.add("button");
        this.changeRightKeyButton.textContent = "Change";
        changeKeyRight.append(this.changeRightKeyButton);
        this.closeControlsButton.type = "button";
        this.closeControlsButton.classList.add("button");
        this.closeControlsButton.textContent = "Close";
        this.controlsMenu.append(this.closeControlsButton);
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
            } else if (controlsSetting === "Touch") {
                this.mouseControlsButton.disabled = true;
                this.keyboardControlsButton.disabled = true;
            }
        } else {
            if (this.game.screenMode === "Desktop") {
                localStorage.setItem("controls-setting", "Mouse");
                this.mouseControlsButton.disabled = true;
                this.keyboardControlsButton.disabled = false;
            } else {
                localStorage.setItem("controls-setting", "Touch");
                this.mouseControlsButton.disabled = true;
                this.keyboardControlsButton.disabled = true;
            }
        }
    }
}
