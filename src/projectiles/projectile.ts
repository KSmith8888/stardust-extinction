export default class Projectile {
    x: number;
    y: number;
    width: number;
    height: number;
    isOffScreen: boolean;
    hasHitTarget: boolean;
    image: HTMLImageElement;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.isOffScreen = false;
        this.hasHitTarget = false;
        this.image = new Image();
    }
}
