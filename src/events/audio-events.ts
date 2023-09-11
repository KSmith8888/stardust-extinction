import MainMenu from "../menu/main-menu";
import beepAudioUrl from "../../assets/audio/beep.wav";
import explosionSoundUrl from "../../assets/audio/explosion.wav";
import alarmSoundUrl from "../../assets/audio/alarm.wav";
import empSoundUrl from "../../assets/audio/emp-explosion.wav";

interface savedAudio {
    volume: number;
    mute: boolean;
}

export default class AudioEvents {
    mainMenu: MainMenu;
    audioSettings: savedAudio;
    beepAudio: HTMLAudioElement;
    explosionSound: HTMLAudioElement;
    alarmSound: HTMLAudioElement;
    empSound: HTMLAudioElement;
    allAudio: Array<HTMLAudioElement>;
    constructor(mainMenu: MainMenu) {
        this.mainMenu = mainMenu;
        this.audioSettings = this.loadAudioSettings();
        this.beepAudio = new Audio(beepAudioUrl);
        this.beepAudio.volume = 0.4 * this.audioSettings.volume;
        this.explosionSound = new Audio(explosionSoundUrl);
        this.explosionSound.volume = 0.1 * this.audioSettings.volume;
        this.alarmSound = new Audio(alarmSoundUrl);
        this.alarmSound.volume = 0.3 * this.audioSettings.volume;
        this.empSound = new Audio(empSoundUrl);
        this.empSound.volume = 0.3 * this.audioSettings.volume;
        this.allAudio = [
            this.beepAudio,
            this.explosionSound,
            this.alarmSound,
            this.empSound,
        ];
        this.applyAudioSettings();
    }
    loadAudioSettings() {
        const audioSettings = localStorage.getItem("audio-settings");
        if (audioSettings) {
            const savedSettings = JSON.parse(audioSettings);
            return savedSettings;
        } else {
            return {
                mute: false,
                volume: 1,
            };
        }
    }
    saveAudioSettings() {
        localStorage.setItem(
            "audio-settings",
            JSON.stringify(this.audioSettings)
        );
    }
    applyAudioSettings() {
        if (this.audioSettings.volume === 0.5) {
            this.mainMenu.audio.volumeControl.value = "0";
        } else if (this.audioSettings.volume === 1) {
            this.mainMenu.audio.volumeControl.value = "50";
        } else if (this.audioSettings.volume === 2) {
            this.mainMenu.audio.volumeControl.value = "100";
        }
        if (this.audioSettings.mute) {
            this.muteAudio();
            this.mainMenu.audio.muteButton.textContent = "Unmute Audio";
            this.mainMenu.audio.volumeControl.disabled = true;
        } else {
            this.unmuteAudio();
            this.mainMenu.audio.muteButton.textContent = "Mute Audio";
            this.mainMenu.audio.volumeControl.disabled = false;
        }
    }
    playExplosionSound() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }
    playEmpSound() {
        this.empSound.currentTime = 0;
        this.empSound.play();
    }
    muteAudio() {
        this.allAudio.forEach((sound) => {
            sound.muted = true;
        });
    }
    unmuteAudio() {
        this.allAudio.forEach((sound) => {
            sound.muted = false;
        });
    }
    changeMuteSetting() {
        if (!this.audioSettings.mute) {
            this.muteAudio();
            this.audioSettings.mute = true;
        } else {
            this.unmuteAudio();
            this.audioSettings.mute = false;
        }
        this.saveAudioSettings();
    }
    changeVolumeSetting() {
        this.beepAudio.volume = 0.4 * this.audioSettings.volume;
        this.explosionSound.volume = 0.1 * this.audioSettings.volume;
        this.alarmSound.volume = 0.3 * this.audioSettings.volume;
        this.empSound.volume = 0.3 * this.audioSettings.volume;
        this.saveAudioSettings();
    }
}
