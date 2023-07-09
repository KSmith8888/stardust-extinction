/**
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @license Apache-2.0
 */

import "./assets/styles/main.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;

class Player {
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
    }
    render() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class EventListeners {
    player: Player;
    isPlayerMoving: boolean;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    constructor(player: Player) {
        this.player = player;
        this.isPlayerMoving = false;
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height
            ) {
                this.isPlayerMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (): void => {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (this.isPlayerMoving) {
                if (e.offsetX + this.player.width / 2 > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.player.width / 2;
                }
                if (e.offsetY + this.player.height / 2 > canvas.height) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.offsetY - this.player.height / 2 < 0) {
                    this.player.y = 0;
                } else {
                    this.player.y = e.offsetY - this.player.height / 2;
                }
            }
        });
    }
}

class Game {
    player: Player;
    events: EventListeners;
    constructor() {
        this.player = new Player();
        this.events = new EventListeners(this.player);
    }
}

const game = new Game();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.player.render();
    requestAnimationFrame(animate);
}

animate();
