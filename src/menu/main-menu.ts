import Game from "../../levels/game-logic";
import SettingsMenu from "./settings-menu";
import AudioMenu from "./audio-menu";
import ControlsMenu from "./controls-menu";

export default class MainMenu {
    game: Game;
    container: HTMLDivElement;
    menuButton: HTMLButtonElement;
    mainMenu: HTMLDialogElement;
    isMenuOpen: boolean;
    isSubMenuOpen: boolean;
    closeButton: HTMLButtonElement;
    quitButton: HTMLButtonElement;
    openMenu: void;
    closeMenu: void;
    quitGame: void;
    settings: SettingsMenu;
    openSettingsButton: HTMLButtonElement;
    openSettingsMenu: void;
    openAudioButton: HTMLButtonElement;
    audio: AudioMenu;
    openAudioMenu: void;
    openControlsButton: HTMLButtonElement;
    controls: ControlsMenu | null;
    openControlsMenu: void | null;
    tutorialModal: HTMLDialogElement;
    closeTutorialButton: HTMLButtonElement;
    closeTutorial: void;
    constructor(game: Game) {
        this.game = game;
        this.container = <HTMLDivElement>document.getElementById("container");
        this.menuButton = <HTMLButtonElement>(
            document.getElementById("menu-button")
        );
        this.mainMenu = <HTMLDialogElement>document.getElementById("main-menu");
        this.isMenuOpen = false;
        this.isSubMenuOpen = false;
        this.openMenu = this.menuButton.addEventListener("click", () => {
            this.game.events.audioEvents.beepAudio.play();
            this.game.player.isMoving = false;
            this.mainMenu.showModal();
            this.openSettingsButton.focus();
            this.isMenuOpen = true;
            this.game.isGamePaused = true;
        });
        this.openSettingsButton = <HTMLButtonElement>(
            document.getElementById("open-settings-button")
        );
        this.settings = new SettingsMenu(this);
        this.openSettingsMenu = this.openSettingsButton.addEventListener(
            "click",
            () => {
                this.isSubMenuOpen = true;
                this.settings.settingsMenu.showModal();
                this.settings.easyButton.focus();
            }
        );
        this.openAudioButton = <HTMLButtonElement>(
            document.getElementById("open-audio-menu-button")
        );
        this.audio = new AudioMenu(game, this);
        this.openAudioMenu = this.openAudioButton.addEventListener(
            "click",
            () => {
                this.isSubMenuOpen = true;
                this.audio.audioMenu.showModal();
                this.audio.muteButton.focus();
            }
        );
        this.openControlsButton = <HTMLButtonElement>(
            document.getElementById("open-controls-button")
        );
        this.controls = null;
        this.openControlsMenu = null;
        if (this.game.screenMode === "Desktop") {
            this.controls = new ControlsMenu(this.game, this);
            this.openControlsButton.addEventListener("click", () => {
                if (this.controls) {
                    this.isSubMenuOpen = true;
                    this.controls.controlsMenu.showModal();
                    this.controls.keyboardControlsButton.focus();
                }
            });
        } else {
            this.openControlsButton.disabled = true;
        }
        this.quitButton = <HTMLButtonElement>(
            document.getElementById("quit-button")
        );
        this.quitGame = this.quitButton.addEventListener("click", () => {
            location.assign("/");
        });
        this.closeButton = <HTMLButtonElement>(
            document.getElementById("close-button")
        );
        this.closeMenu = this.closeButton.addEventListener("click", () => {
            this.game.events.audioEvents.beepAudio.play();
            this.mainMenu.close();
            this.isMenuOpen = false;
            this.game.isGamePaused = false;
            this.game.canvas.focus();
        });
        this.tutorialModal = <HTMLDialogElement>(
            document.getElementById("tutorial-modal")
        );
        this.closeTutorialButton = <HTMLButtonElement>(
            document.getElementById("close-tutorial-button")
        );
        this.closeTutorial = this.closeTutorialButton.addEventListener(
            "click",
            () => {
                this.tutorialModal.close();
                this.menuButton.classList.remove("no-display");
                this.game.isGamePaused = false;
            }
        );
    }
}
