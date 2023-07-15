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
import EventListeners from "../../src/event-listeners";
import { Background } from "../../src/backgrounds/space-background";
import { RedMine, BlueMine } from "../../src/enemies/mines";
//Utils
import { sizeCanvas } from "../../src/utils/sizeCanvas";
import { areObjectsColliding } from "../../src/utils/collision";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
sizeCanvas(canvas);

class Game {
    player: Player;
    events: EventListeners;
    background: Background;
    enemies: Array<RedMine | BlueMine>;
    frameCount: number;
    constructor() {
        this.enemies = [];
        this.player = new Player(canvas, ctx, this.enemies);
        this.events = new EventListeners(this.player, canvas);
        this.background = new Background(canvas, ctx, spaceBackgroundUrl);
        this.frameCount = 0;
    }
    handleEnemies() {
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.isOffScreen && !enemy.isDestroyed;
        });
        if (this.enemies.length < 20 && this.frameCount >= 100) {
            this.enemies.push(new RedMine(canvas, ctx));
            this.enemies.push(new BlueMine(canvas, ctx));
            this.frameCount = 0;
            this.player.enemies = this.enemies;
        } else {
            this.frameCount += 1;
        }
        this.enemies.forEach((enemy) => {
            enemy.render();
            const didEnemyCollide = areObjectsColliding(this.player, enemy);
            if (didEnemyCollide) {
                enemy.isDestroyed = true;
                if (enemy instanceof RedMine && this.player.health > 0) {
                    this.player.health -= 20;
                } else if (enemy instanceof BlueMine) {
                    this.player.isShipDisabled = true;
                }
            }
        });
    }
}

const game = new Game();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.background.render();
    game.background.updatePosition();
    game.player.render();
    game.player.handleProjectiles();
    game.player.healthBar.render();
    game.handleEnemies();
    requestAnimationFrame(animate);
}

animate();
