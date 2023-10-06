//Modules
import Player from "../src/player/player";
import MainMenu from "../src/menu/main-menu";
import EventListeners from "../src/events/event-listeners";
import { Background } from "../src/backgrounds/space-background";
import { HealthBar } from "../src/player/healthbar";
import { SmallGrabber } from "../src/enemies/small-grabber";
import { RedMine, BlueMine } from "../src/enemies/mines";
import {
    EnemyLaserSmall,
    EnemyLaserMedium,
    EnemyLaserLarge,
} from "../src/projectiles/enemy-lasers";
import { EnemyBolt } from "../src/projectiles/enemy-bolt";
import { EnemySeeker } from "../src/projectiles/enemy-seeker";
import { SmallFighter } from "../src/enemies/fighters";
import { SmallRacer } from "../src/enemies/small-racer";
import { SmallExplosion } from "../src/explosions/small-explosion";
import { LargeEmp } from "../src/explosions/emp";
import { LargeExplosion } from "../src/explosions/large-explosion";
import { WarpDust } from "../src/explosions/warp-dust";
import { Overcharge } from "../src/explosions/overcharge";
import { LargeBattleship } from "../src/bosses/large-battleship";
import { LargeBlaster } from "../src/bosses/large-blaster";
import { LargeShocker } from "../src/bosses/large-shocker";
//Utils
import { areObjectsColliding } from "../src/utils/collision";
import { sizeCanvas } from "../src/utils/sizeCanvas";
//Assets
import spaceBackgroundUrl from "../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../assets/images/backgrounds/space-background-desktop.png";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screenMode: string;
    mainMenu: MainMenu;
    events: EventListeners;
    background: Background;
    player: Player;
    enemies: Array<
        RedMine | BlueMine | SmallFighter | SmallRacer | SmallGrabber
    >;
    enemyPoolSize: number;
    firstEnemyCount: number;
    secondEnemyCount: number;
    thirdEnemyCount: number;
    firstEnemyInterval: number;
    secondEnemyInterval: number;
    thirdEnemyInterval: number;
    bossReleaseCount: number;
    enemyProjectiles: Array<EnemyLaserSmall>;
    enemyLaserPoolSize: number;
    destroyedEnemies: number;
    hasReachedBoss: boolean;
    explosions: Array<
        SmallExplosion | LargeEmp | LargeExplosion | WarpDust | Overcharge
    >;
    bosses: Array<LargeBattleship | LargeBlaster | LargeShocker>;
    bossProjectiles: Array<
        EnemyLaserMedium | EnemyLaserLarge | EnemySeeker | EnemyBolt
    >;
    bossLaserPoolSize: number;
    isGamePaused: boolean;
    frameCount: number;
    lastTime: number;
    interval: number;
    timer: number;
    racerInterval: number;
    mobileBackground: string;
    desktopBackground: string;
    nextLevelUrl: string;
    currentLevelNumber: number;
    difficultySetting: string;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        sizeCanvas(this.canvas);
        this.screenMode = navigator.maxTouchPoints > 0 ? "Mobile" : "Desktop";
        this.player = new Player(this, this.canvas, this.ctx);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 0.5;
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.mainMenu = new MainMenu(this);
        this.events = new EventListeners(this, this.canvas);
        this.enemies = [];
        this.enemyPoolSize = 15;
        this.firstEnemyCount = 5;
        this.secondEnemyCount = 10;
        this.thirdEnemyCount = 15;
        this.firstEnemyInterval = 5;
        this.secondEnemyInterval = 75;
        this.thirdEnemyInterval = 150;
        this.bossReleaseCount = 20;
        this.enemyProjectiles = [];
        this.enemyLaserPoolSize = 30;
        this.destroyedEnemies = 0;
        this.hasReachedBoss = false;
        this.explosions = [];
        this.bosses = [];
        this.bossProjectiles = [];
        this.bossLaserPoolSize = 12;
        this.isGamePaused = true;
        this.frameCount = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.racerInterval = 0.7;
        this.mobileBackground = spaceBackgroundUrl;
        this.desktopBackground = spaceBgDesktopUrl;
        this.nextLevelUrl = "/";
        this.currentLevelNumber = 0;
        this.difficultySetting = "Normal";
        this.mainMenu.tutorialModal.showModal();
        this.initializeEnemyLasers();
    }
    loadDifficultySetting() {
        const savedDifficulty = localStorage.getItem("difficulty-setting");
        if (savedDifficulty) {
            if (savedDifficulty === "Easy") {
                this.difficultySetting = "Easy";
                this.mainMenu.settings.easyButton.disabled = true;
                this.enemyPoolSize = Math.floor(this.enemyPoolSize / 2);
                this.firstEnemyCount = Math.floor(this.enemyPoolSize / 3);
                this.secondEnemyCount = this.firstEnemyCount * 2;
                this.secondEnemyInterval = 90;
                this.thirdEnemyInterval = 190;
                this.bossReleaseCount = Math.floor(this.bossReleaseCount * 0.7);
            } else if (savedDifficulty === "Hard") {
                this.difficultySetting = "Hard";
                this.mainMenu.settings.hardButton.disabled = true;
                this.enemyPoolSize = Math.floor(this.enemyPoolSize * 1.5);
                this.firstEnemyCount = Math.floor(this.enemyPoolSize / 3);
                this.secondEnemyCount = this.firstEnemyCount * 2;
                this.secondEnemyInterval = 60;
                this.thirdEnemyInterval = 110;
                this.bossReleaseCount = Math.floor(this.bossReleaseCount * 1.3);
                this.player.healthBar.displayHealthbar = false;
            } else if (savedDifficulty === "Normal") {
                this.mainMenu.settings.normalButton.disabled = true;
            }
        } else {
            localStorage.setItem("difficulty-setting", "Normal");
            this.difficultySetting = "Normal";
            this.mainMenu.settings.normalButton.disabled = true;
        }
    }
    initializeEnemyLasers() {
        for (let i = 0; i < this.enemyLaserPoolSize; i++) {
            this.enemyProjectiles.push(
                new EnemyLaserSmall(this, this.canvas, this.ctx)
            );
        }
    }
    rollToCreateRacer() {
        const randomNum = Math.random();
        if (randomNum > this.racerInterval) {
            const newRacer = new SmallRacer(this, this.canvas, this.ctx);
            newRacer.isFree = false;
            this.enemies.push(newRacer);
        }
    }
    handleEnemies() {
        const activeEnemies = this.enemies.filter((enemy) => {
            return !enemy.isFree;
        });
        activeEnemies.forEach((enemy) => {
            enemy.render();
            const didEnemyCollide = areObjectsColliding(this.player, enemy);
            if (didEnemyCollide) {
                if (enemy instanceof SmallGrabber) {
                    enemy.attachedToPlayer();
                } else {
                    enemy.collidedWithPlayer();
                    enemy.reset();
                }
            }
        });
    }
    handleEnemyProjectiles() {
        const activeEnemyLasers = this.enemyProjectiles.filter((laser) => {
            return !laser.isFree;
        });
        activeEnemyLasers.forEach((laser) => {
            laser.render();
            const didLaserCollide = areObjectsColliding(laser, this.player);
            if (didLaserCollide) {
                this.player.health -= laser.damage;
                laser.reset();
            }
        });
    }
    handleExplosions() {
        this.explosions = this.explosions.filter((explosion) => {
            return explosion.frameCount < 5;
        });
        this.explosions.forEach((exp) => {
            exp.frameCount += 1;
            exp.render();
        });
    }
    resizeObjects() {
        const newBgImage =
            this.canvas.width < 900
                ? this.mobileBackground
                : this.desktopBackground;
        this.background = new Background(this.canvas, this.ctx, newBgImage);
        this.ctx.strokeStyle = "gold";
        this.ctx.lineWidth = 0.5;
        this.player.healthBar = new HealthBar(
            this.player,
            this.canvas,
            this.ctx
        );
        this.events.hasBeenResized = false;
    }
    checkForGameOver() {
        if (this.player.health <= 0) {
            this.isGamePaused = true;
            this.events.gameOverModal.showModal();
        }
    }
    handleBosses() {
        if (this.hasReachedBoss) {
            this.bosses = this.bosses.filter((boss) => !boss.isDestroyed);
            if (this.bosses.length > 0) {
                this.bosses.forEach((boss) => {
                    boss.render();
                });
            } else {
                setTimeout(() => {
                    this.isGamePaused = true;
                    this.events.statsTextEnemies.textContent = `Enemies Destroyed: ${this.destroyedEnemies}`;
                    const healthRemaining =
                        (this.player.health / this.player.healthStat) * 100;
                    this.events.statsTextHealth.textContent = `Health Remaining: ${healthRemaining}%`;
                    if (this.currentLevelNumber > 0) {
                        localStorage.setItem(
                            "current-level",
                            (this.currentLevelNumber + 1).toString()
                        );
                    }
                    this.events.levelCompleteModal.showModal();
                }, 1000);
            }
        }
    }
    handleBossProjectiles() {
        const activeBossProjectiles = this.bossProjectiles.filter((laser) => {
            return !laser.isFree;
        });
        activeBossProjectiles.forEach((laser) => {
            laser.render();
            const didEnemyCollide = areObjectsColliding(this.player, laser);
            if (didEnemyCollide) {
                laser.collidedWithPlayer();
                laser.reset();
            }
        });
    }
}
