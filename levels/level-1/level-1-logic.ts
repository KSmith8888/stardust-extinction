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
//Utils
import { sizeCanvas } from "../../src/utils/sizeCanvas";
//Assets
import spaceBackgroundUrl from "../../assets/images/backgrounds/space-background.png";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
sizeCanvas(canvas);

class Game {
    player: Player;
    events: EventListeners;
    background: Background;
    constructor() {
        this.player = new Player(canvas, ctx);
        this.events = new EventListeners(this.player, canvas);
        this.background = new Background(canvas, ctx, spaceBackgroundUrl);
    }
}

const game = new Game();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.background.render();
    game.background.updatePosition();
    game.player.render();
    game.player.handleProjectiles();
    requestAnimationFrame(animate);
}

animate();
