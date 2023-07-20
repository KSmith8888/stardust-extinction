export default class Enemy {
    width: number;
    height: number;
    x: number;
    y: number;
    health: number;
    isDestroyed: boolean;
    isOffScreen: boolean;
    firesProjectiles: boolean;
    frameCount: number;
    constructor() {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.health = 40;
        this.isDestroyed = false;
        this.isOffScreen = false;
        this.firesProjectiles = false;
        this.frameCount = 0;
    }
}
