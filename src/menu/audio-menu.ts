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
        this.audioMenu = <HTMLDialogElement>(
            document.getElementById("audio-menu")
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
                this.mainMenu.isSubMenuOpen = false;
                this.audioMenu.close();
            }
        );
    }
}
