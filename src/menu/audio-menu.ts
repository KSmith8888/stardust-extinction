import Game from "../../levels/game-logic";
import MainMenu from "./main-menu";

export default class AudioMenu {
    game: Game;
    mainMenu: MainMenu;
    audioMenu: HTMLDialogElement;
    muteButton: HTMLButtonElement;
    changeMuteSetting: void;
    volumeControl: HTMLInputElement;
    changeVolume: void;
    closeAudioButton: HTMLButtonElement;
    closeAudio: void;
    constructor(game: Game, mainMenu: MainMenu) {
        this.game = game;
        this.mainMenu = mainMenu;
        this.audioMenu = document.createElement("dialog");
        this.muteButton = document.createElement("button");
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
        this.volumeControl = document.createElement("input");
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
        this.closeAudioButton = document.createElement("button");
        this.closeAudio = this.closeAudioButton.addEventListener(
            "click",
            () => {
                this.mainMenu.isSubMenuOpen = false;
                this.audioMenu.close();
            }
        );
        this.generateAudioHTML();
    }
    generateAudioHTML() {
        this.audioMenu.classList.add("modal");
        this.mainMenu.container.append(this.audioMenu);
        const mainHeading = document.createElement("h2");
        mainHeading.classList.add("menu-main-heading");
        mainHeading.textContent = "Audio Menu";
        this.audioMenu.append(mainHeading);
        this.muteButton.id = "mute-button";
        this.muteButton.classList.add("button");
        this.muteButton.type = "button";
        this.muteButton.textContent = "Mute Audio";
        this.audioMenu.append(this.muteButton);
        const controlContainer = document.createElement("div");
        controlContainer.id = "volume-control-container";
        this.audioMenu.append(controlContainer);
        const controlLabel = document.createElement("label");
        controlLabel.id = "volume-control-label";
        controlLabel.htmlFor = "volume-control";
        controlLabel.textContent = "Volume:";
        controlContainer.append(controlLabel);
        this.volumeControl.id = "volume-control";
        this.volumeControl.type = "range";
        this.volumeControl.value = "50";
        this.volumeControl.step = "50";
        this.volumeControl.min = "0";
        this.volumeControl.max = "100";
        this.volumeControl.setAttribute("list", "volume-options");
        controlContainer.append(this.volumeControl);
        const volumeOptions = document.createElement("datalist");
        volumeOptions.id = "volume-options";
        controlContainer.append(volumeOptions);
        const lowOption = document.createElement("option");
        lowOption.classList.add("volume-option");
        lowOption.value = "0";
        lowOption.label = "Low";
        volumeOptions.append(lowOption);
        const medOption = document.createElement("option");
        medOption.classList.add("volume-option");
        medOption.value = "50";
        medOption.label = "Med.";
        volumeOptions.append(medOption);
        const highOption = document.createElement("option");
        highOption.classList.add("volume-option");
        highOption.value = "100";
        highOption.label = "High";
        volumeOptions.append(highOption);
        this.closeAudioButton.classList.add("button");
        this.closeAudioButton.type = "button";
        this.closeAudioButton.textContent = "Close";
        this.audioMenu.append(this.closeAudioButton);
    }
}
