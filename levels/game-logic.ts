/**
 *
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 *
 */

//Modules
import Player from "../src/player";
import EventListeners from "../src/events/event-listeners";
import { Background } from "../src/backgrounds/space-background";
import { HealthBar } from "../src/healthbar";
import { RedMine, BlueMine } from "../src/enemies/mines";
import { EnemyLaserSmall } from "../src/projectiles/enemy-lasers";
import { SmallFighter } from "../src/enemies/fighters";
import { SmallRacer } from "../src/enemies/small-racer";
import { SmallExplosion } from "../src/explosions/small-explosion";
import { LargeEmp } from "../src/explosions/emp";
import { LargeBattleship } from "../src/bosses/large-battleship";
//Utils
import { areObjectsColliding } from "../src/utils/collision";
import { sizeCanvas } from "../src/utils/sizeCanvas";
//Assets
import spaceBackgroundUrl from "../assets/images/backgrounds/space-background.png";
import spaceBgDesktopUrl from "../assets/images/backgrounds/space-background-desktop.png";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    events: EventListeners;
    background: Background;
    player: Player;
    enemies: Array<RedMine | BlueMine | SmallFighter | SmallRacer>;
    enemyPoolSize: number;
    enemyProjectiles: Array<EnemyLaserSmall>;
    destroyedEnemies: number;
    hasReachedBoss: boolean;
    explosions: Array<SmallExplosion | LargeEmp>;
    bosses: Array<LargeBattleship>;
    isGamePaused: boolean;
    frameCount: number;
    lastTime: number;
    interval: number;
    timer: number;
    racerInterval: number;
    mobileBackground: string;
    desktopBackground: string;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.ctx.strokeStyle = "gold";
        this.ctx.lineWidth = 0.5;
        sizeCanvas(this.canvas);
        this.player = new Player(this, this.canvas, this.ctx);
        this.background = new Background(
            this.canvas,
            this.ctx,
            spaceBackgroundUrl
        );
        this.events = new EventListeners(this, this.canvas);
        this.enemies = [];
        this.enemyPoolSize = 15;
        this.enemyProjectiles = [];
        this.destroyedEnemies = 0;
        this.hasReachedBoss = false;
        this.explosions = [];
        this.bosses = [];
        this.isGamePaused = false;
        this.frameCount = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.racerInterval = 0.7;
        this.mobileBackground = spaceBackgroundUrl;
        this.desktopBackground = spaceBgDesktopUrl;
    }
    rollToCreateRacer() {
        const randomNum = Math.random();
        if (randomNum > this.racerInterval) {
            const newRacer = new SmallRacer(this, this.canvas, this.ctx);
            newRacer.isFree = false;
            this.enemies.push(newRacer);
        }
    }
    handleEnemies() {
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
            this.canvas.width < 900
                ? this.mobileBackground
                : this.desktopBackground;
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
}