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
import { HealthBar } from "../../src/healthbar";
import { Background } from "../../src/backgrounds/space-background";
import { RedMine, BlueMine } from "../../src/enemies/mines";
import { EnemyLaserSmall } from "../../src/projectiles/lasers";
import { SmallFighter } from "../../src/enemies/fighters";
import { SmallExplosion } from "../../src/explosions/small-explosion";
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
    enemyProjectiles: Array<EnemyLaserSmall>;
    explosions: Array<SmallExplosion>;
    player: Player;
    events: EventListeners;
    background: Background;
    frameCount: number;
    lastTime: number;
    interval: number;
    timer: number;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        sizeCanvas(this.canvas);
        this.enemies = [];
        this.enemyProjectiles = [];
        this.explosions = [];
        this.player = new Player(this, this.canvas, this.ctx);
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.events = new EventListeners(this.player, this.canvas);
        this.frameCount = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
    }
    handleEnemies() {
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.isOffScreen && !enemy.isDestroyed;
        });
        if (this.enemies.length < 20 && this.frameCount >= 100) {
            console.log(this.enemyProjectiles.length);
            this.enemies.push(new RedMine(this.canvas, this.ctx, this.player));

            this.enemies.push(new BlueMine(this.canvas, this.ctx));
            this.enemies.push(new SmallFighter(this.canvas, this.ctx, this));
            this.frameCount = 0;
        } else {
            this.frameCount += 1;
        }
        this.enemies.forEach((enemy) => {
            enemy.render();
            const didEnemyCollide = areObjectsColliding(this.player, enemy);
            if (didEnemyCollide) {
                this.explosions.push(
                    new SmallExplosion(this.ctx, enemy.x, enemy.y)
                );
                enemy.isDestroyed = true;
                if (enemy instanceof RedMine && this.player.health > 0) {
                    this.player.health -= 20;
                } else if (enemy instanceof BlueMine) {
                    this.player.isShipDisabled = true;
                }
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
    animate(timeStamp: number) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
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
            this.timer -= deltaTime;
        } else {
            this.timer += deltaTime;
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

const game = new Game();
game.animate(0);
