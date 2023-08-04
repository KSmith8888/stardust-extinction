import Game from "../../levels/game-logic";
import { LaserSmall, LaserMediumTwo } from "../projectiles/lasers";
import { HealthBar } from "./healthbar";
import { RedMine, BlueMine } from "../enemies/mines";
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
    enemies: Array<RedMine | BlueMine>;
    explosions: Array<SmallExplosion>;
    projectiles: Array<LaserSmall>;
    projectileInterval: number;
    projectileStrength: number;
    frameCount: number;
    laserOffsetX: number;
    laserOffsetY: number;
    healthBar: HealthBar;
    health: number;
    healthStat: number;
    damageStat: number;
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
        this.enemies = [];
        this.explosions = [];
        this.projectiles = [];
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
        this.damageStat = 10;
        this.isShipDisabled = false;
        this.shipDisabledFrames = 0;
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
    addNewProjectiles() {
        switch (this.projectileStrength) {
            case 3: {
                this.projectiles.push(
                    new LaserSmall(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x,
                        this.y + this.laserOffsetY
                    )
                );
                this.projectiles.push(
                    new LaserSmall(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x + (this.width - this.laserOffsetX),
                        this.y + this.laserOffsetY
                    )
                );
                break;
            }
            case 2: {
                this.projectiles.push(
                    new LaserMediumTwo(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x,
                        this.y + this.laserOffsetY
                    )
                );
                this.projectiles.push(
                    new LaserMediumTwo(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x + (this.width - this.laserOffsetX),
                        this.y + this.laserOffsetY
                    )
                );
                break;
            }
            default: {
                this.projectiles.push(
                    new LaserSmall(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x,
                        this.y + this.laserOffsetY
                    )
                );
                this.projectiles.push(
                    new LaserSmall(
                        this.game,
                        this.canvas,
                        this.ctx,
                        this.x + (this.width - this.laserOffsetX),
                        this.y + this.laserOffsetY
                    )
                );
            }
        }
    }
    handleProjectiles() {
        this.projectiles = this.projectiles.filter((laser) => {
            return !laser.isOffScreen && !laser.hasHitTarget;
        });
        if (!this.isShipDisabled) {
            if (this.frameCount >= this.projectileInterval) {
                this.addNewProjectiles();
                this.frameCount = 0;
            } else {
                this.frameCount += 1;
            }
        }
        this.projectiles.forEach((laser) => laser.render());
    }
}