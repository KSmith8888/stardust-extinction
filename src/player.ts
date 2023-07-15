/*
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 */

import { LaserSmall } from "./projectiles/lasers";
import { HealthBar } from "./healthbar";
import { RedMine, BlueMine } from "./enemies/mines";

export default class Player {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    isMoving: boolean;
    idleShipImage: HTMLImageElement;
    activeShipImage: HTMLImageElement;
    enemies: Array<RedMine | BlueMine>;
    projectiles: Array<LaserSmall>;
    frameCount: number;
    laserOffsetX: number;
    laserOffsetY: number;
    healthBar: HealthBar;
    health: number;
    healthStat: number;
    isShipDisabled: boolean;
    shipDisabledFrames: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        enemies: Array<RedMine | BlueMine>
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 45;
        this.height = 45;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
        this.isMoving = false;
        this.idleShipImage = <HTMLImageElement>(
            document.getElementById("idle-ship-image")
        );
        this.activeShipImage = <HTMLImageElement>(
            document.getElementById("active-ship-image")
        );
        this.enemies = enemies;
        this.projectiles = [];
        this.frameCount = 0;
        this.laserOffsetX = this.width * 0.2;
        this.laserOffsetY = this.height * 0.35;
        this.healthBar = new HealthBar(this, this.ctx, 45, 10);
        this.health = 100;
        this.healthStat = 100;
        this.isShipDisabled = false;
        this.shipDisabledFrames = 0;
    }
    render() {
        if (this.isShipDisabled) {
            if (this.shipDisabledFrames < 100) {
                this.shipDisabledFrames += 1;
            } else {
                this.shipDisabledFrames = 0;
                this.isShipDisabled = false;
            }
        }
        const currentShipImage = this.isMoving
            ? this.activeShipImage
            : this.idleShipImage;
        this.ctx.drawImage(
            currentShipImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    handleProjectiles() {
        this.projectiles = this.projectiles.filter((laser) => {
            return !laser.isOffScreen;
        });
        if (this.isMoving && this.projectiles.length < 60) {
            if (this.frameCount >= 10) {
                this.projectiles.push(
                    new LaserSmall(
                        this.canvas,
                        this.ctx,
                        this.x,
                        this.y + this.laserOffsetY,
                        this.enemies
                    )
                );
                this.projectiles.push(
                    new LaserSmall(
                        this.canvas,
                        this.ctx,
                        this.x + (this.width - this.laserOffsetX),
                        this.y + this.laserOffsetY,
                        this.enemies
                    )
                );
                this.frameCount = 0;
            } else {
                this.frameCount += 1;
            }
        }
        this.projectiles.forEach((laser) => laser.render());
    }
}
