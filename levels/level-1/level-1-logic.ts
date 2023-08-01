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

export default class Level1Game extends Game {
    constructor() {
        super();
        this.nextLevelUrl = "/levels/level-2/level-2.html";
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
    activateNewEnemies() {
        if (!this.hasReachedBoss) {
            this.frameCount += 1;
        } else if (this.frameCount !== 0) {
            this.frameCount = 0;
        }
        if (this.frameCount === 5) {
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
            this.rollToCreateRacer();
            this.frameCount = 0;
        }
    }
    checkForBossEvent() {
        if (!this.hasReachedBoss && this.destroyedEnemies >= 20) {
            this.hasReachedBoss = true;
            this.bosses.push(new LargeBattleship(this, this.canvas, this.ctx));
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
