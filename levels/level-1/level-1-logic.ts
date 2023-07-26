/**
 *
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * @license SPDX-License-Identifier: Apache-2.0
 *
 */

//Modules
import Player from "../../src/player";
import EventListeners from "../../src/events/event-listeners";
import { HealthBar } from "../../src/healthbar";
import { Background } from "../../src/backgrounds/space-background";
import { RedMine, BlueMine } from "../../src/enemies/mines";
import { EnemyLaserSmall } from "../../src/projectiles/lasers";
import { SmallFighter } from "../../src/enemies/fighters";
import { SmallExplosion } from "../../src/explosions/small-explosion";
import { LargeEmp } from "../../src/explosions/emp";
//Utils
import { sizeCanvas } from "../../src/utils/sizeCanvas";
import { areObjectsColliding } from "../../src/utils/collision";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../../assets/images/backgrounds/space-background-desktop.png";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    enemies: Array<RedMine | BlueMine | SmallFighter>;
    enemyPoolSize: number;
    enemyProjectiles: Array<EnemyLaserSmall>;
    explosions: Array<SmallExplosion | LargeEmp>;
    player: Player;
    events: EventListeners;
    isGamePaused: boolean;
    background: Background;
    frameCount: number;
    lastTime: number;
    interval: number;
    timer: number;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        sizeCanvas(this.canvas);
        this.ctx.strokeStyle = "gold";
        this.enemies = [];
        this.enemyPoolSize = 15;
        this.enemyProjectiles = [];
        this.explosions = [];
        this.player = new Player(this, this.canvas, this.ctx);
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.events = new EventListeners(this, this.canvas);
        this.isGamePaused = false;
        this.frameCount = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.initializeEnemies();
    }
    initializeEnemies() {
        for (let i = 0; i < this.enemyPoolSize; i++) {
            if (i < 5) {
                this.enemies.push(new RedMine(this, this.canvas, this.ctx));
            } else if (i >= 5 && i < 10) {
                this.enemies.push(new BlueMine(this, this.canvas, this.ctx));
            } else {
                this.enemies.push(
                    new SmallFighter(this, this.canvas, this.ctx)
                );
            }
        }
    }
    handleEnemies() {
        if (this.frameCount === 1) {
            const freeRedMine = this.enemies.find((enemy) => {
                return enemy instanceof RedMine && enemy.isFree;
            });
            if (freeRedMine) {
                freeRedMine.isFree = false;
            }
        } else if (this.frameCount === 75) {
            const freeBlueMine = this.enemies.find((enemy) => {
                return enemy instanceof BlueMine && enemy.isFree;
            });
            if (freeBlueMine) {
                freeBlueMine.isFree = false;
            }
        } else if (this.frameCount === 150) {
            const freeFighter = this.enemies.find((enemy) => {
                return enemy instanceof SmallFighter && enemy.isFree;
            });
            if (freeFighter) {
                freeFighter.isFree = false;
            }
            this.frameCount = 0;
        }
        this.frameCount += 1;
        const activeEnemies = this.enemies.filter((enemy) => {
            return !enemy.isFree;
        });
        activeEnemies.forEach((enemy) => {
            enemy.render();
            const didEnemyCollide = areObjectsColliding(this.player, enemy);
            if (didEnemyCollide) {
                enemy.collidedWithPlayer();
                enemy.isFree = true;
            }
        });
    }
    handleEnemyProjectiles() {
        this.enemyProjectiles = this.enemyProjectiles.filter((laser) => {
            return !laser.isOffScreen;
        });
        this.enemyProjectiles.forEach((laser) => {
            laser.render();
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
            this.canvas.width < 900 ? spaceBackgroundUrl : spaceBgDesktopUrl;
        this.background = new Background(this.canvas, this.ctx, newBgImage);
        this.player.healthBar = new HealthBar(
            this.player,
            this.ctx,
            10,
            this.canvas.height - 25
        );
        this.events.hasBeenResized = false;
    }
    checkForGameOver() {
        if (this.player.health <= 0) {
            this.events.gameOverModal.showModal();
        }
    }
    animate(timeStamp: number) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval && !this.isGamePaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background.render();
            this.background.updatePosition();
            if (this.events.hasBeenResized) {
                this.resizeObjects();
            }
            this.player.render();
            this.player.handleProjectiles();
            this.player.healthBar.render();
            this.handleEnemies();
            this.handleEnemyProjectiles();
            this.handleExplosions();
            this.checkForGameOver();
            this.timer -= deltaTime;
        } else {
            if (!this.isGamePaused) {
                this.timer += deltaTime;
            }
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

const game = new Game();
game.animate(0);
