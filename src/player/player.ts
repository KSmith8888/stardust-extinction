import Game from "../../levels/game-logic";
import {
    LaserSmall,
    LaserMediumTwo,
    LaserMediumThree,
} from "../projectiles/lasers";
import { HealthBar } from "./healthbar";
import { SmallExplosion } from "../explosions/small-explosion";
import { Overcharge } from "../explosions/overcharge";

export default class Player {
    game: Game;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    isMoving: boolean;
    idleShipImage: HTMLImageElement;
    activeShipImage: HTMLImageElement;
    explosions: Array<SmallExplosion>;
    levelOneLasers: Array<LaserSmall>;
    levelTwoLasers: Array<LaserMediumTwo>;
    levelThreeLasers: Array<LaserMediumThree>;
    projectiles: Array<LaserSmall | LaserMediumTwo | LaserMediumThree>;
    projectilePoolSize: number;
    projectileInterval: number;
    projectileStrength: number;
    specialUses: number;
    frameCount: number;
    laserOffsetX: number;
    laserOffsetY: number;
    healthBar: HealthBar;
    health: number;
    healthStat: number;
    speed: number;
    isShipDisabled: boolean;
    disabledDuration: number;
    shipDisabledFrames: number;
    constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 44;
        this.height = 50;
        this.x = canvas.width / 2;
        this.y = canvas.height - (this.height + 60);
        this.isMoving = false;
        this.idleShipImage = <HTMLImageElement>(
            document.getElementById("idle-ship-image")
        );
        this.activeShipImage = <HTMLImageElement>(
            document.getElementById("active-ship-image")
        );
        this.explosions = [];
        this.levelOneLasers = [];
        this.levelTwoLasers = [];
        this.levelThreeLasers = [];
        this.projectiles = this.levelOneLasers;
        this.projectilePoolSize = 20;
        this.projectileInterval = 15;
        this.projectileStrength = 1;
        this.specialUses = 3;
        this.frameCount = 0;
        this.laserOffsetX = this.width * 0.3;
        this.laserOffsetY = this.height * 0.1;
        this.health = 100;
        this.healthStat = 100;
        this.speed = 10;
        this.healthBar = new HealthBar(this, this.canvas, this.ctx);
        this.isShipDisabled = false;
        this.disabledDuration = 60;
        this.shipDisabledFrames = 0;
        this.initializeProjectiles();
    }
    initializeProjectiles() {
        for (let i = 0; i < this.projectilePoolSize; i++) {
            this.levelOneLasers.push(
                new LaserSmall(this.game, this.canvas, this.ctx)
            );
            this.levelTwoLasers.push(
                new LaserMediumTwo(this.game, this.canvas, this.ctx)
            );
            this.levelThreeLasers.push(
                new LaserMediumThree(this.game, this.canvas, this.ctx)
            );
        }
    }
    render() {
        if (this.isShipDisabled) {
            if (this.shipDisabledFrames < this.disabledDuration) {
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
        const firstLaser = this.projectiles.find((laser) => {
            return laser.isFree;
        });
        if (firstLaser) {
            firstLaser.x = this.x + (this.laserOffsetX - firstLaser.width);
            firstLaser.y = this.y + this.laserOffsetY;
            firstLaser.isFree = false;
        }
        const secondLaser = this.projectiles.find((laser) => {
            return laser.isFree;
        });
        if (secondLaser) {
            secondLaser.x = this.x + (this.width - this.laserOffsetX);
            secondLaser.y = this.y + this.laserOffsetY;
            secondLaser.isFree = false;
        }
    }
    handleProjectiles() {
        if (this.isMoving && !this.isShipDisabled) {
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
    useSpecialAttack() {
        if (this.specialUses >= 1) {
            this.game.events.audioEvents.playOverchargeSound();
            this.specialUses -= 1;
            this.game.explosions.push(
                new Overcharge(this.game, this.game.ctx, this.x, this.y)
            );
            this.game.mainMenu.specialButtonText.textContent = `Uses: ${this.specialUses}`;
        }
    }
    increaseProjectileStrength() {
        if (this.projectileStrength === 1) {
            this.projectileStrength = 2;
            this.game.racerInterval = 0.95;
            this.projectiles = this.levelTwoLasers;
        } else if (this.projectileStrength === 2) {
            this.projectileStrength = 3;
            this.game.racerInterval = 1;
            this.projectiles = this.levelThreeLasers;
        }
    }
}
