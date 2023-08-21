import beepAudioUrl from "../../assets/audio/beep.wav";
import explosionSoundUrl from "../../assets/audio/explosion.wav";
import alarmSoundUrl from "../../assets/audio/alarm.wav";

export default class AudioEvents {
    muteSetting: boolean;
    volumeMultiplier: number;
    beepAudio: HTMLAudioElement;
    explosionSound: HTMLAudioElement;
    alarmSound: HTMLAudioElement;
    constructor() {
        this.muteSetting = false;
        this.volumeMultiplier = 1;
        this.beepAudio = new Audio(beepAudioUrl);
        this.beepAudio.volume = 0.4 * this.volumeMultiplier;
        this.explosionSound = new Audio(explosionSoundUrl);
        this.explosionSound.volume = 0.1 * this.volumeMultiplier;
        this.alarmSound = new Audio(alarmSoundUrl);
        this.alarmSound.volume = 0.3 * this.volumeMultiplier;
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
