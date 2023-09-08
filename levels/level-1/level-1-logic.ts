/**
 *
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * @license SPDX-License-Identifier: Apache-2.0
 *
 */

import Game from "../game-logic";
import { RedMine, BlueMine } from "../../src/enemies/mines";
import { SmallFighter } from "../../src/enemies/fighters";
import { LargeBattleship } from "../../src/bosses/large-battleship";
import { EnemyLaserLarge } from "../../src/projectiles/enemy-lasers";
import { LargeShocker } from "../../src/bosses/large-shocker";
import { EnemyBolt } from "../../src/projectiles/enemy-bolt";

export default class Level1Game extends Game {
    constructor() {
        super();
        this.nextLevelUrl = "/levels/level-2/level-2.html";
        this.currentLevelNumber = 1;
        this.loadDifficultySetting();
        this.initializeEnemies();
        this.initializeBossProjectiles();
        localStorage.setItem("tutorial-completed", "true");
    }
    initializeEnemies() {
        for (let i = 0; i < this.enemyPoolSize; i++) {
            if (i < this.firstEnemyCount) {
                this.enemies.push(new RedMine(this, this.canvas, this.ctx));
            } else if (i >= this.firstEnemyCount && i < this.secondEnemyCount) {
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
                new EnemyLaserLarge(this, this.canvas, this.ctx)
            );
            this.bossProjectiles.push(
                new EnemyBolt(this, this.canvas, this.ctx)
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
            const freeRedMine = this.enemies.find((enemy) => {
                return enemy instanceof RedMine && enemy.isFree;
            });
            if (freeRedMine) {
                freeRedMine.isFree = false;
            }
        } else if (this.frameCount === this.secondEnemyInterval) {
            const freeBlueMine = this.enemies.find((enemy) => {
                return enemy instanceof BlueMine && enemy.isFree;
            });
            if (freeBlueMine) {
                freeBlueMine.isFree = false;
            }
        } else if (this.frameCount === this.thirdEnemyInterval) {
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
        if (
            !this.hasReachedBoss &&
            this.destroyedEnemies >= this.bossReleaseCount
        ) {
            this.events.audioEvents.alarmSound.play();
            this.hasReachedBoss = true;
            this.bosses.push(new LargeBattleship(this, this.canvas, this.ctx));
            setTimeout(() => {
                this.bosses.push(new LargeShocker(this, this.canvas, this.ctx));
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
                        new LargeBattleship(this, this.canvas, this.ctx)
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

const game = new Level1Game();
game.animate(0);
