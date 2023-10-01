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
import { SmallGrabber } from "../../src/enemies/small-grabber";
import { SmallFighter } from "../../src/enemies/fighters";
import { RedMine } from "../../src/enemies/mines";
import { PhaseGlider } from "../../src/enemies/phase-glider";
import { LargeBattleship } from "../../src/bosses/large-battleship";
import { LargeShocker } from "../../src/bosses/large-shocker";
import { LargeBlaster } from "../../src/bosses/large-blaster";
import { EnemyLaserLarge } from "../../src/projectiles/enemy-lasers";
import { EnemyBolt } from "../../src/projectiles/enemy-bolt";
import { EnemySeeker } from "../../src/projectiles/enemy-seeker";
import { EnemyLaserMedium } from "../../src/projectiles/enemy-lasers";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../../assets/images/backgrounds/space-background-desktop.png";

export default class Level4Game extends Game {
    fourthEnemyInterval: number;
    constructor() {
        super();
        this.enemyPoolSize = 24;
        this.bossLaserPoolSize = 60;
        this.racerInterval = 0.9;
        this.firstEnemyCount = 7;
        this.secondEnemyCount = 16;
        this.thirdEnemyCount = 20;
        this.firstEnemyInterval = 5;
        this.secondEnemyInterval = 60;
        this.thirdEnemyInterval = 110;
        this.fourthEnemyInterval = 150;
        this.mobileBackground = spaceBackgroundUrl;
        this.desktopBackground = spaceBgDesktopUrl;
        this.currentLevelNumber = 4;
        this.events.nextLevelButton.classList.add("no-display");
        this.loadDifficultySetting();
        this.initializeEnemies();
        this.initializeBossProjectiles();
    }
    initializeEnemies() {
        for (let i = 0; i < this.enemyPoolSize; i++) {
            if (i < this.firstEnemyCount) {
                this.enemies.push(
                    new SmallGrabber(this, this.canvas, this.ctx, this.player)
                );
            } else if (i >= this.firstEnemyCount && i < this.secondEnemyCount) {
                this.enemies.push(
                    new SmallFighter(this, this.canvas, this.ctx)
                );
            } else if (i >= this.secondEnemyCount && i < this.thirdEnemyCount) {
                this.enemies.push(new RedMine(this, this.canvas, this.ctx));
            } else {
                this.enemies.push(new PhaseGlider(this, this.canvas, this.ctx));
            }
        }
    }
    initializeBossProjectiles() {
        for (let i = 0; i < this.bossLaserPoolSize; i++) {
            this.bossProjectiles.push(
                new EnemyBolt(this, this.canvas, this.ctx)
            );
            this.bossProjectiles.push(
                new EnemySeeker(this, this.canvas, this.ctx)
            );
            this.bossProjectiles.push(
                new EnemyLaserMedium(this, this.canvas, this.ctx)
            );
            this.bossProjectiles.push(
                new EnemyLaserLarge(this, this.canvas, this.ctx)
            );
        }
    }
    activateNewEnemies() {
        if (!this.hasReachedBoss) {
            this.frameCount += 1;
        } else if (this.frameCount !== 0) {
            this.frameCount = 0;
        }
        if (this.frameCount === this.firstEnemyInterval) {
            const freeGrabber = this.enemies.find((enemy) => {
                return enemy instanceof SmallGrabber && enemy.isFree;
            });
            if (freeGrabber) {
                freeGrabber.isFree = false;
            }
        } else if (this.frameCount === this.secondEnemyInterval) {
            const freeFighter = this.enemies.find((enemy) => {
                return enemy instanceof SmallFighter && enemy.isFree;
            });
            if (freeFighter) {
                freeFighter.isFree = false;
            }
        } else if (this.frameCount === this.thirdEnemyInterval) {
            const freeGlider = this.enemies.find((enemy) => {
                return enemy instanceof PhaseGlider && enemy.isFree;
            });
            if (freeGlider) {
                freeGlider.isFree = false;
            }
        } else if (this.frameCount === this.fourthEnemyInterval) {
            const freeTyphoon = this.enemies.find((enemy) => {
                return enemy instanceof RedMine && enemy.isFree;
            });
            if (freeTyphoon) {
                freeTyphoon.isFree = false;
            }
            this.rollToCreateRacer();
            this.frameCount = 0;
        }
    }
    checkForBossEvent() {
        if (
            !this.hasReachedBoss &&
            this.destroyedEnemies >= this.bossReleaseCount
        ) {
            this.events.audioEvents.alarmSound.play();
            this.hasReachedBoss = true;
            this.bosses.push(new LargeShocker(this, this.canvas, this.ctx));
            setTimeout(() => {
                this.bosses.push(new LargeBlaster(this, this.canvas, this.ctx));
                this.bosses.push(new LargeBlaster(this, this.canvas, this.ctx));
                if (
                    this.difficultySetting === "Normal" ||
                    this.difficultySetting === "Hard"
                ) {
                    this.bosses.push(
                        new LargeBattleship(this, this.canvas, this.ctx)
                    );
                }
                if (this.difficultySetting === "Hard") {
                    this.bosses.push(
                        new LargeShocker(this, this.canvas, this.ctx)
                    );
                }
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

const game = new Level4Game();
game.animate(0);
