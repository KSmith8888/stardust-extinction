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
import { EnemyLaserLarge } from "../../src/projectiles/enemy-lasers";

export default class TutorialGame extends Game {
    hasSeenMovementTutorial: boolean;
    hasSeenMenuTutorial: boolean;
    hasSeenBossTutorial: boolean;
    hasBossBeenReleased: boolean;
    tutorialHeading: HTMLParagraphElement;
    tutorialFirstPara: HTMLParagraphElement;
    tutorialSecondPara: HTMLParagraphElement;
    constructor() {
        super();
        this.hasSeenMovementTutorial = false;
        this.hasSeenMenuTutorial = false;
        this.hasSeenBossTutorial = false;
        this.hasBossBeenReleased = false;
        this.tutorialHeading = <HTMLParagraphElement>(
            document.getElementById("tutorial-modal-heading")
        );
        this.tutorialFirstPara = <HTMLParagraphElement>(
            document.getElementById("tutorial-first")
        );
        this.tutorialSecondPara = <HTMLParagraphElement>(
            document.getElementById("tutorial-second")
        );
        this.nextLevelUrl = "/levels/level-1/level-1.html";
        this.enemyPoolSize = 10;
        this.initializeEnemies();
        this.initializeBossProjectiles();
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
    initializeBossProjectiles() {
        for (let i = 0; i < this.bossLaserPoolSize; i++) {
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
        if (!this.hasSeenMovementTutorial && this.frameCount === 40) {
            this.isGamePaused = true;
            this.hasSeenMovementTutorial = true;
            this.player.isMoving = false;
            this.createMovementTutorial();
            this.events.menuEvents.tutorialModal.showModal();
        } else if (this.frameCount === 50) {
            const freeFighter = this.enemies.find((enemy) => {
                return enemy instanceof SmallFighter && enemy.isFree;
            });
            if (freeFighter) {
                freeFighter.isFree = false;
            }
        } else if (!this.hasSeenMenuTutorial && this.frameCount === 140) {
            this.isGamePaused = true;
            this.hasSeenMenuTutorial = true;
            this.player.isMoving = false;
            this.createMenuTutorial();
            this.events.menuEvents.tutorialModal.showModal();
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
        this.tutorialHeading.textContent = "Movement and Firing";
        this.tutorialFirstPara.textContent =
            "Movement controls are very simple. Just click or touch your ship, located at the bottom of the screen, and drag it to the desired location. Your ship will fire lasers automatically.";
        this.tutorialSecondPara.textContent =
            "Watch out for new enemies appearing from the top of the screen.";
        const closeTutorialBtn = <HTMLParagraphElement>(
            document.getElementById("close-tutorial-button")
        );
        closeTutorialBtn.textContent = "Close";
    }
    createMenuTutorial() {
        this.tutorialHeading.textContent = "The Healthbar and Menu";
        this.tutorialFirstPara.textContent =
            "The healthbar located at the bottom left of the screen shows how much armor your ship has remaining.";
        this.tutorialSecondPara.textContent =
            "Click the Game Menu button on the top left or press the 'M' key to open the main menu.";
    }
    createBossTutorial() {
        this.tutorialHeading.textContent = "Reaching the Boss";
        this.tutorialFirstPara.textContent =
            "After defeating a certain number of enemies, you will hear an alarm. This means that you have reached the boss for that level.";
        this.tutorialSecondPara.textContent =
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
            this.player.isMoving = false;
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
