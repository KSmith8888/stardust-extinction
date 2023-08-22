import beepAudioUrl from "../../assets/audio/beep.wav";
import explosionSoundUrl from "../../assets/audio/explosion.wav";
import alarmSoundUrl from "../../assets/audio/alarm.wav";

export default class AudioEvents {
    volumeControl: HTMLInputElement;
    savedVolumeLevel: number | null;
    muteSetting: boolean;
    volumeMultiplier: number;
    beepAudio: HTMLAudioElement;
    explosionSound: HTMLAudioElement;
    alarmSound: HTMLAudioElement;
    constructor(volumeControl: HTMLInputElement) {
        this.volumeControl = volumeControl;
        this.savedVolumeLevel = this.getSavedVolume();
        this.muteSetting = false;
        this.setInitialVolume();
        this.volumeMultiplier = this.savedVolumeLevel || 1;
        this.beepAudio = new Audio(beepAudioUrl);
        this.beepAudio.volume = 0.4 * this.volumeMultiplier;
        this.explosionSound = new Audio(explosionSoundUrl);
        this.explosionSound.volume = 0.1 * this.volumeMultiplier;
        this.alarmSound = new Audio(alarmSoundUrl);
        this.alarmSound.volume = 0.3 * this.volumeMultiplier;
    }
    setInitialVolume() {
        console.log("bofore", this.volumeControl.value, this.savedVolumeLevel);
        if (this.savedVolumeLevel === 0) {
            this.volumeControl.value = "0";
        } else if (this.savedVolumeLevel === 1) {
            this.volumeControl.value = "50";
        } else if (this.savedVolumeLevel === 2) {
            this.volumeControl.value = "100";
        }
        console.log("after", this.volumeControl.value);
    }
    getSavedVolume() {
        const volumeLevel = localStorage.getItem("volume-setting");
        if (volumeLevel && !isNaN(parseInt(volumeLevel))) {
            return parseInt(volumeLevel);
        } else {
            return null;
        }
    }
    playExplosionSound() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }
    changeMuteSetting() {
        if (!this.muteSetting) {
            this.beepAudio.muted = true;
            this.alarmSound.muted = true;
            this.explosionSound.muted = true;
            this.muteSetting = true;
        } else {
            this.beepAudio.muted = false;
            this.alarmSound.muted = false;
            this.explosionSound.muted = false;
            this.muteSetting = false;
        }
    }
    changeVolumeSetting() {
        this.beepAudio.volume = 0.4 * this.volumeMultiplier;
        this.explosionSound.volume = 0.1 * this.volumeMultiplier;
        this.alarmSound.volume = 0.3 * this.volumeMultiplier;
    }
}
