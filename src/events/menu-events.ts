import Game from "../../levels/game-logic";

export default class MenuEvents {
    game: Game;
    menuButton: HTMLButtonElement;
    mainMenu: HTMLDialogElement;
    isMenuOpen: boolean;
    closeButton: HTMLButtonElement;
    quitButton: HTMLButtonElement;
    openMenu: void;
    closeMenu: void;
    quitGame: void;
    settingsMenu: HTMLDialogElement;
    openSettingsButton: HTMLButtonElement;
    openSettingsMenu: void;
    easyButton: HTMLButtonElement;
    easyDifficulty: void;
    normalButton: HTMLButtonElement;
    normalDifficulty: void;
    hardButton: HTMLButtonElement;
    hardDifficulty: void;
    deleteSaveButton: HTMLButtonElement;
    deleteSaveData: void;
    closeSettingsButton: HTMLButtonElement;
    closeSettings: void;
    audioMenu: HTMLDialogElement;
    openAudioButton: HTMLButtonElement;
    openAudioMenu: void;
    muteButton: HTMLButtonElement;
    changeMuteSetting: void;
    volumeControl: HTMLInputElement;
    changeVolume: void;
    closeAudioButton: HTMLButtonElement;
    closeAudio: void;
    tutorialModal: HTMLDialogElement;
    closeTutorialButton: HTMLButtonElement;
    closeTutorial: void;
    constructor(game: Game) {
        this.game = game;
        this.menuButton = <HTMLButtonElement>(
            document.getElementById("menu-button")
        );
        this.quitButton = <HTMLButtonElement>(
            document.getElementById("quit-button")
        );
        this.closeButton = <HTMLButtonElement>(
            document.getElementById("close-button")
        );
        this.mainMenu = <HTMLDialogElement>document.getElementById("main-menu");
        this.isMenuOpen = false;
        this.openMenu = this.menuButton.addEventListener("click", () => {
            this.game.events.audioEvents.beepAudio.play();
            this.game.player.isMoving = false;
            this.mainMenu.showModal();
            this.closeButton.focus();
            this.isMenuOpen = true;
            this.game.isGamePaused = true;
        });
        this.closeMenu = this.closeButton.addEventListener("click", () => {
            this.game.events.audioEvents.beepAudio.play();
            this.mainMenu.close();
            this.isMenuOpen = false;
            this.game.isGamePaused = false;
        });
        this.quitGame = this.quitButton.addEventListener("click", () => {
            location.assign("/");
        });
        this.settingsMenu = <HTMLDialogElement>(
            document.getElementById("settings-menu")
        );
        this.openSettingsButton = <HTMLButtonElement>(
            document.getElementById("open-settings-button")
        );
        this.openSettingsMenu = this.openSettingsButton.addEventListener(
            "click",
            () => {
                this.settingsMenu.showModal();
                this.closeSettingsButton.focus();
            }
        );
        this.easyButton = <HTMLButtonElement>(
            document.getElementById("easy-button")
        );
        this.easyDifficulty = this.easyButton.addEventListener("click", () => {
            this.changeDifficulty("Easy");
        });
        this.normalButton = <HTMLButtonElement>(
            document.getElementById("normal-button")
        );
        this.normalDifficulty = this.normalButton.addEventListener(
            "click",
            () => {
                this.changeDifficulty("Normal");
            }
        );
        this.hardButton = <HTMLButtonElement>(
            document.getElementById("hard-button")
        );
        this.hardDifficulty = this.hardButton.addEventListener("click", () => {
            this.changeDifficulty("Hard");
        });
        this.deleteSaveButton = <HTMLButtonElement>(
            document.getElementById("delete-save-button")
        );
        this.deleteSaveData = this.deleteSaveButton.addEventListener(
            "click",
            () => {
                if (
                    window.confirm(
                        "This will delete saved game progress and all other data and return you to the title screen. Are you sure?"
                    )
                ) {
                    localStorage.clear();
                    location.assign("/");
                }
            }
        );
        this.closeSettingsButton = <HTMLButtonElement>(
            document.getElementById("close-settings-menu-button")
        );
        this.closeSettings = this.closeSettingsButton.addEventListener(
            "click",
            () => {
                this.settingsMenu.close();
            }
        );
        this.audioMenu = <HTMLDialogElement>(
            document.getElementById("audio-menu")
        );
        this.openAudioButton = <HTMLButtonElement>(
            document.getElementById("open-audio-menu-button")
        );
        this.openAudioMenu = this.openAudioButton.addEventListener(
            "click",
            () => {
                this.audioMenu.showModal();
                this.closeAudioButton.focus();
            }
        );
        this.muteButton = <HTMLButtonElement>(
            document.getElementById("mute-button")
        );
        this.changeMuteSetting = this.muteButton.addEventListener(
            "click",
            () => {
                if (this.game.events.audioEvents.audioSettings.mute) {
                    this.muteButton.textContent = "Mute Audio";
                    this.volumeControl.disabled = false;
                } else {
                    this.muteButton.textContent = "Unmute Audio";
                    this.volumeControl.disabled = true;
                }
                this.game.events.audioEvents.changeMuteSetting();
            }
        );
        this.volumeControl = <HTMLInputElement>(
            document.getElementById("volume-control")
        );
        this.changeVolume = this.volumeControl.addEventListener(
            "change",
            () => {
                const newVolume = this.volumeControl.value;
                if (parseInt(newVolume) === 0) {
                    this.game.events.audioEvents.audioSettings.volume = 0.5;
                } else if (parseInt(newVolume) === 50) {
                    this.game.events.audioEvents.audioSettings.volume = 1;
                } else if (parseInt(newVolume) === 100) {
                    this.game.events.audioEvents.audioSettings.volume = 2;
                }
                this.game.events.audioEvents.changeVolumeSetting();
            }
        );
        this.closeAudioButton = <HTMLButtonElement>(
            document.getElementById("close-audio-menu-button")
        );
        this.closeAudio = this.closeAudioButton.addEventListener(
            "click",
            () => {
                this.audioMenu.close();
            }
        );
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
    changeDifficulty(newDifficulty: string) {
        if (
            window.confirm(
                "Changing the difficulty will restart the current level, are you sure that you want to change it?"
            )
        ) {
            if (newDifficulty === "Easy") {
                localStorage.setItem("difficulty-setting", "Easy");
            } else if (newDifficulty === "Normal") {
                localStorage.setItem("difficulty-setting", "Normal");
            } else if (newDifficulty === "Hard") {
                localStorage.setItem("difficulty-setting", "Hard");
            }
            location.reload();
        }
    }
}
