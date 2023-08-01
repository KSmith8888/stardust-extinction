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
import Player from "../../src/player";
import EventListeners from "../../src/events/event-listeners";
import { HealthBar } from "../../src/healthbar";
import { Background } from "../../src/backgrounds/space-background";
import { RedMine, BlueMine } from "../../src/enemies/mines";
import { SmallFighter } from "../../src/enemies/fighters";
import { SmallRacer } from "../../src/enemies/small-racer";
import { LargeBattleship } from "../../src/bosses/large-battleship";
//Utils
import { areObjectsColliding } from "../../src/utils/collision";
import { sizeCanvas } from "../../src/utils/sizeCanvas";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../../assets/images/backgrounds/space-background-desktop.png";

export default class Level1Game extends Game {
    player: Player;
    background: Background;
    events: EventListeners;
    constructor() {
        super();
        sizeCanvas(this.canvas);
        this.player = new Player(this, this.canvas, this.ctx);
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.events = new EventListeners(this, this.canvas);
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
    rollToCreateRacer() {
        const randomNum = Math.random();
        if (randomNum > 0.7) {
            const newRacer = new SmallRacer(this, this.canvas, this.ctx);
            newRacer.isFree = false;
            this.enemies.push(newRacer);
        }
    }
    handleEnemies() {
        this.activateNewEnemies();
        const activeEnemies = this.enemies.filter((enemy) => {
            return !enemy.isFree;
        });
        activeEnemies.forEach((enemy) => {
            enemy.render();
            const didEnemyCollide = areObjectsColliding(this.player, enemy);
            if (didEnemyCollide) {
                enemy.collidedWithPlayer();
                enemy.reset();
            }
        });
    }
    handleEnemyProjectiles() {
        this.enemyProjectiles = this.enemyProjectiles.filter((laser) => {
            return !laser.isOffScreen && !laser.hasHitTarget;
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
        this.ctx.strokeStyle = "gold";
        this.ctx.lineWidth = 0.5;
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
            this.isGamePaused = true;
            this.events.gameOverModal.showModal();
        }
    }
    checkForBossEvent() {
        if (!this.hasReachedBoss && this.destroyedEnemies >= 20) {
            this.hasReachedBoss = true;
            this.bosses.push(new LargeBattleship(this, this.canvas, this.ctx));
        }
    }
    handleBosses() {
        this.bosses = this.bosses.filter((boss) => boss.health > 0);
        if (this.hasReachedBoss) {
            if (this.bosses.length > 0) {
                this.bosses.forEach((boss) => {
                    boss.render();
                });
            } else {
                setTimeout(() => {
                    location.assign("/levels/level-2/level-2.html");
                }, 800);
            }
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
