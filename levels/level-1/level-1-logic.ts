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

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    enemies: Array<RedMine | BlueMine>;
    player: Player;
    events: EventListeners;
    background: Background;
    frameCount: number;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        sizeCanvas(this.canvas);
        this.enemies = [];
        this.player = new Player(this.canvas, this.ctx);
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.events = new EventListeners(this.player, this.canvas);
        this.frameCount = 0;
    }
    handleEnemies() {
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.isOffScreen && !enemy.isDestroyed;
        });
        if (this.enemies.length < 20 && this.frameCount >= 100) {
            this.enemies.push(new RedMine(this.canvas, this.ctx));
            this.enemies.push(new BlueMine(this.canvas, this.ctx));
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
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.render();
        this.background.updatePosition();
        if (this.events.hasBeenResized) {
            this.background = new Background(
                this.canvas,
                this.ctx,
                spaceBackgroundUrl
            );
            this.events.hasBeenResized = false;
        }
        this.player.render();
        this.player.handleProjectiles();
        this.player.healthBar.render();
        this.handleEnemies();
        requestAnimationFrame(this.animate.bind(this));
    }
}

const game = new Game();
game.animate();
