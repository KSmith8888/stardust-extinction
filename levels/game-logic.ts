/**
 *
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { RedMine, BlueMine } from "../src/enemies/mines";
import { EnemyLaserSmall } from "../src/projectiles/enemy-lasers";
import { SmallFighter } from "../src/enemies/fighters";
import { SmallRacer } from "../src/enemies/small-racer";
import { SmallExplosion } from "../src/explosions/small-explosion";
import { LargeEmp } from "../src/explosions/emp";
import { LargeBattleship } from "../src/bosses/large-battleship";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.ctx.strokeStyle = "gold";
        this.ctx.lineWidth = 0.5;
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
    }
}
