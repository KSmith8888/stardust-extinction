import Game from "../../levels/game-logic";
import { LaserSmall, LaserMediumTwo } from "../projectiles/lasers";
import { HealthBar } from "./healthbar";
import { SmallExplosion } from "../explosions/small-explosion";

export default class Player {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    isMoving: boolean;
    idleShipImage: HTMLImageElement;
    activeShipImage: HTMLImageElement;
    explosions: Array<SmallExplosion>;
    projectiles: Array<LaserSmall | LaserMediumTwo>;
    projectilePoolSize: number;
    projectileInterval: number;
    projectileStrength: number;
    frameCount: number;
    laserOffsetX: number;
    laserOffsetY: number;
    healthBar: HealthBar;
    health: number;
    healthStat: number;
    isShipDisabled: boolean;
    shipDisabledFrames: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 45;
        this.height = 45;
        this.x = canvas.width / 2;
        this.y = canvas.height - (this.height + 35);
        this.isMoving = false;
        this.idleShipImage = <HTMLImageElement>(
            document.getElementById("idle-ship-image")
        );
        this.activeShipImage = <HTMLImageElement>(
            document.getElementById("active-ship-image")
        );
        this.explosions = [];
        this.projectiles = [];
        this.projectilePoolSize = 20;
        this.projectileInterval = 15;
        this.projectileStrength = 1;
        this.frameCount = 0;
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
        this.healthBar = new HealthBar(
            this,
            this.ctx,
            10,
            this.canvas.height - 25
        );
        this.health = 100;
        this.healthStat = 100;
        this.isShipDisabled = false;
        this.shipDisabledFrames = 0;
        this.initializeProjectiles();
    }
    initializeProjectiles() {
        for (let i = 0; i < this.projectilePoolSize; i++) {
            this.projectiles.push(
                new LaserSmall(this.game, this.canvas, this.ctx)
            );
            this.projectiles.push(
                new LaserMediumTwo(this.game, this.canvas, this.ctx)
            );
        }
    }
    render() {
        if (this.isShipDisabled) {
            if (this.shipDisabledFrames < 100) {
                this.shipDisabledFrames += 1;
            } else {
                this.shipDisabledFrames = 0;
                this.isShipDisabled = false;
            }
        }
        const currentShipImage = this.isMoving
            ? this.activeShipImage
            : this.idleShipImage;
        this.ctx.drawImage(
            currentShipImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    activateProjectiles() {
        let currentLaser = LaserSmall;
        if (this.projectileStrength === 2) {
            currentLaser = LaserMediumTwo;
        }
        const firstLaser = this.projectiles.find((laser) => {
            return laser instanceof currentLaser && laser.isFree;
        });
        if (firstLaser) {
            firstLaser.x = this.x;
            firstLaser.y = this.y + this.laserOffsetY;
            firstLaser.isFree = false;
        }
        const secondLaser = this.projectiles.find((laser) => {
            return laser instanceof currentLaser && laser.isFree;
        });
        if (secondLaser) {
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y = this.y + this.laserOffsetY;
            secondLaser.isFree = false;
        }
    }
    handleProjectiles() {
        if (!this.isShipDisabled) {
            if (this.frameCount >= this.projectileInterval) {
                this.activateProjectiles();
                this.frameCount = 0;
            } else {
                this.frameCount += 1;
            }
        }
        const activeProjectiles = this.projectiles.filter((laser) => {
            return !laser.isFree;
        });
        activeProjectiles.forEach((laser) => laser.render());
    }
}
