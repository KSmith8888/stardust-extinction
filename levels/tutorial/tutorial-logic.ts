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
import { RedMine } from "../../src/enemies/mines";
import { SmallFighter } from "../../src/enemies/fighters";
import { LargeBattleship } from "../../src/bosses/large-battleship";

export default class TutorialGame extends Game {
    hasSeenMovementTutorial: boolean;
    hasSeenBossTutorial: boolean;
    hasBossBeenReleased: boolean;
    constructor() {
        super();
        this.hasSeenMovementTutorial = false;
        this.hasSeenBossTutorial = false;
        this.hasBossBeenReleased = false;
        this.nextLevelUrl = "/levels/level-1/level-1.html";
        this.enemyPoolSize = 10;
        this.initializeEnemies();
    }
    initializeEnemies() {
        for (let i = 0; i < this.enemyPoolSize; i++) {
            if (i < 3) {
                this.enemies.push(new RedMine(this, this.canvas, this.ctx));
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
        if (this.frameCount === 40 && !this.hasSeenMovementTutorial) {
            this.isGamePaused = true;
            this.hasSeenMovementTutorial = true;
            this.createMovementTutorial();
            this.events.menuEvents.tutorialModal.showModal();
        }
        if (this.frameCount === 50) {
            const freeFighter = this.enemies.find((enemy) => {
                return enemy instanceof SmallFighter && enemy.isFree;
            });
            if (freeFighter) {
                freeFighter.isFree = false;
            }
        } else if (this.frameCount === 150) {
            const freeRedMine = this.enemies.find((enemy) => {
                return enemy instanceof RedMine && enemy.isFree;
            });
            if (freeRedMine) {
                freeRedMine.isFree = false;
            }
            this.frameCount = 0;
        }
    }
    createMovementTutorial() {
        const tutorialRow = <HTMLParagraphElement>(
            document.getElementById("tutorial-row-initial")
        );
        tutorialRow.replaceChildren();
        const tutorialHeading = <HTMLParagraphElement>(
            document.getElementById("tutorial-modal-heading")
        );
        tutorialHeading.textContent = "Movement and Firing";
        const firstParagraph = <HTMLParagraphElement>(
            document.getElementById("tutorial-first")
        );
        firstParagraph.textContent =
            "Movement controls are very simple. Just click or touch your ship, located at the bottom of the screen, and drag it to the desired location. Your ship will fire lasers automatically.";
        const secondParagraph = <HTMLParagraphElement>(
            document.getElementById("tutorial-second")
        );
        secondParagraph.textContent =
            "Watch out for enemies appearing from the top of the screen. They may try to fire projectiles at your ship or collide with it directly.";
        const closeTutorialBtn = <HTMLParagraphElement>(
            document.getElementById("close-tutorial-button")
        );
        closeTutorialBtn.textContent = "Close";
    }
    createBossTutorial() {
        const tutorialHeading = <HTMLParagraphElement>(
            document.getElementById("tutorial-modal-heading")
        );
        tutorialHeading.textContent = "Reaching the Boss";
        const firstParagraph = <HTMLParagraphElement>(
            document.getElementById("tutorial-first")
        );
        firstParagraph.textContent =
            "After defeating a certain number of enemies, you will hear an alarm. This means that you have reached the boss for that level.";
        const secondParagraph = <HTMLParagraphElement>(
            document.getElementById("tutorial-second")
        );
        secondParagraph.textContent =
            "Defeat the boss (or bosses) to complete the level. Good luck!";
    }
    checkForBossEvent() {
        if (this.hasSeenBossTutorial && !this.hasBossBeenReleased) {
            this.hasBossBeenReleased = true;
            this.events.audioEvents.alarmSound.play();
            this.hasReachedBoss = true;
            this.bosses.push(new LargeBattleship(this, this.canvas, this.ctx));
        }
        if (!this.hasReachedBoss && this.destroyedEnemies >= 10) {
            this.isGamePaused = true;
            this.hasSeenBossTutorial = true;
            this.createBossTutorial();
            this.events.menuEvents.tutorialModal.showModal();
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

const game = new TutorialGame();
game.animate(0);
