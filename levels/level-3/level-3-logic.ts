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
import Game from "../game-logic";
import { BlueMine } from "../../src/enemies/mines";
import { SmallTyphoon } from "../../src/enemies/typhoons";
import { SmallFighter } from "../../src/enemies/fighters";
import { LargeBlaster } from "../../src/bosses/large-blaster";
import { EnemySeeker } from "../../src/projectiles/enemy-seeker";
import { EnemyLaserMedium } from "../../src/projectiles/enemy-lasers";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../../assets/images/backgrounds/space-background-desktop.png";

export default class Level3Game extends Game {
    constructor() {
        super();
        this.enemyPoolSize = 24;
        this.racerInterval = 0.9;
        this.mobileBackground = spaceBackgroundUrl;
        this.desktopBackground = spaceBgDesktopUrl;
        this.initializeEnemies();
        this.initializeBossProjectiles();
        localStorage.setItem("current-level", "3");
    }
    initializeEnemies() {
        for (let i = 0; i < this.enemyPoolSize; i++) {
            if (i < 8) {
                this.enemies.push(
                    new SmallTyphoon(this, this.canvas, this.ctx)
                );
            } else if (i >= 5 && i < 16) {
                this.enemies.push(new BlueMine(this, this.canvas, this.ctx));
            } else {
                this.enemies.push(
                    new SmallFighter(this, this.canvas, this.ctx)
                );
            }
        }
    }
    initializeBossProjectiles() {
        for (let i = 0; i < this.bossLaserPoolSize; i++) {
            this.bossProjectiles.push(
                new EnemySeeker(this, this.canvas, this.ctx)
            );
            this.bossProjectiles.push(
                new EnemyLaserMedium(this, this.canvas, this.ctx)
            );
        }
    }
    activateNewEnemies() {
        if (!this.hasReachedBoss) {
            this.frameCount += 1;
        } else if (this.frameCount !== 0) {
            this.frameCount = 0;
        }
        if (this.frameCount === 5) {
            const freeRedMine = this.enemies.find((enemy) => {
                return enemy instanceof SmallTyphoon && enemy.isFree;
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
            this.rollToCreateRacer();
            this.frameCount = 0;
        }
    }
    checkForBossEvent() {
        if (!this.hasReachedBoss && this.destroyedEnemies >= 20) {
            this.events.audioEvents.alarmSound.play();
            this.hasReachedBoss = true;
            this.bosses.push(new LargeBlaster(this, this.canvas, this.ctx));
            setTimeout(() => {
                this.bosses.push(new LargeBlaster(this, this.canvas, this.ctx));
                this.bosses.push(new LargeBlaster(this, this.canvas, this.ctx));
            }, 800);
        }
    }
    animate(timeStamp: number) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.events.hasBeenResized) {
            this.resizeObjects();
        }
        if (this.timer > this.interval && !this.isGamePaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background.render();
            this.background.updatePosition();
            this.player.render();
            this.player.handleProjectiles();
            this.player.healthBar.render();
            this.activateNewEnemies();
            this.handleEnemies();
            this.handleEnemyProjectiles();
            this.handleExplosions();
            this.handleBosses();
            this.handleBossProjectiles();
            this.checkForBossEvent();
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

const game = new Level3Game();
game.animate(0);
