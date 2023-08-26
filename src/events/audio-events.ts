import MenuEvents from "./menu-events";
import beepAudioUrl from "../../assets/audio/beep.wav";
import explosionSoundUrl from "../../assets/audio/explosion.wav";
import alarmSoundUrl from "../../assets/audio/alarm.wav";
import empSoundUrl from "../../assets/audio/emp-explosion.wav";

interface savedAudio {
    volume: number;
    mute: boolean;
}

export default class AudioEvents {
    menuEvents: MenuEvents;
    audioSettings: savedAudio;
    beepAudio: HTMLAudioElement;
    explosionSound: HTMLAudioElement;
    alarmSound: HTMLAudioElement;
    empSound: HTMLAudioElement;
    allAudio: Array<HTMLAudioElement>;
    constructor(menuEvents: MenuEvents) {
        this.menuEvents = menuEvents;
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
    }
    loadAudioSettings() {
        const audioSettings = localStorage.getItem("audio-settings");
        if (audioSettings) {
            const savedSettings = JSON.parse(audioSettings);
            if (savedSettings.volume === 0.5) {
                this.menuEvents.volumeControl.value = "0";
            } else if (savedSettings.volume === 1) {
                this.menuEvents.volumeControl.value = "50";
            } else if (savedSettings.volume === 2) {
                this.menuEvents.volumeControl.value = "100";
            }
            if (savedSettings.mute) {
                this.menuEvents.muteButton.textContent = "Unmute Audio";
                this.menuEvents.volumeControl.disabled = true;
            } else {
                this.menuEvents.muteButton.textContent = "Mute Audio";
                this.menuEvents.volumeControl.disabled = false;
            }
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
    playExplosionSound() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }
    playEmpSound() {
        this.empSound.currentTime = 0;
        this.empSound.play();
    }
    changeMuteSetting() {
        if (!this.audioSettings.mute) {
            this.allAudio.forEach((sound) => {
                sound.muted = true;
            });
            this.audioSettings.mute = true;
        } else {
            this.allAudio.forEach((sound) => {
                sound.muted = false;
            });
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
