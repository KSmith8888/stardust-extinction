/*
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 */

import Player from "./player";
import { sizeCanvas } from "./utils/sizeCanvas";

export default class EventListeners {
    player: Player;
    sizeCanvas: void;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    touchstart: void;
    touchend: void;
    touchmove: void;
    keyEvent: void;
    menuButton: HTMLButtonElement;
    mainMenu: HTMLDialogElement;
    closeButton: HTMLButtonElement;
    quitButton: HTMLButtonElement;
    openMenu: void;
    closeMenu: void;
    quitGame: void;
    constructor(player: Player, canvas: HTMLCanvasElement) {
        this.player = player;
        this.sizeCanvas = window.addEventListener("resize", () => {
            sizeCanvas(canvas);
        });
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height
            ) {
                player.isMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (): void => {
            if (player.isMoving) {
                player.isMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (player.isMoving) {
                if (e.offsetX + this.player.width / 2 > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.player.width / 2;
                }
                if (e.offsetY + this.player.height / 2 > canvas.height) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.offsetY - this.player.height / 2 < 45) {
                    this.player.y = 45;
                } else {
                    this.player.y = e.offsetY - this.player.height / 2;
                }
            }
        });
        this.touchstart = canvas.addEventListener("touchstart", (e): void => {
            if (
                e.touches[0].clientX >= this.player.x &&
                e.touches[0].clientX <= this.player.x + this.player.width &&
                e.touches[0].clientY >= this.player.y &&
                e.touches[0].clientY <= this.player.y + this.player.height
            ) {
                player.isMoving = true;
            }
        });
        this.touchend = canvas.addEventListener("touchend", (): void => {
            if (player.isMoving) {
                player.isMoving = false;
            }
        });
        this.touchmove = canvas.addEventListener("touchmove", (e): void => {
            if (player.isMoving) {
                if (
                    e.touches[0].clientX + this.player.width / 2 >
                    canvas.width
                ) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.touches[0].clientX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x =
                        e.touches[0].clientX - this.player.width / 2;
                }
                if (
                    e.touches[0].clientY + this.player.height / 2 >
                    canvas.height
                ) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.touches[0].clientY - this.player.height / 2 < 45) {
                    this.player.y = 45;
                } else {
                    this.player.y =
                        e.touches[0].clientY - this.player.height / 2;
                }
            }
        });
        this.keyEvent = document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "ArrowLeft": {
                    if (this.player.x >= 5) {
                        this.player.x -= 5;
                    } else {
                        this.player.x = 0;
                    }
                    break;
                }
                case "ArrowRight": {
                    if (
                        this.player.x <=
                        canvas.width - (this.player.width + 5)
                    ) {
                        this.player.x += 5;
                    } else {
                        this.player.x = canvas.width - this.player.width;
                    }
                    break;
                }
                case "KeyM": {
                    console.log("Menu opened");
                    break;
                }
                default: {
                    console.log("No action for that key");
                }
            }
        });
        this.menuButton = <HTMLButtonElement>(
            document.getElementById("menu-button")
        );
        this.quitButton = <HTMLButtonElement>(
            document.getElementById("quit-button")
        );
        this.closeButton = <HTMLButtonElement>(
            document.getElementById("close-button")
        );
        this.mainMenu = <HTMLDialogElement>document.getElementById("main-menu");
        this.openMenu = this.menuButton.addEventListener("click", () => {
            this.mainMenu.showModal();
        });
        this.closeMenu = this.closeButton.addEventListener("click", () => {
            this.mainMenu.close();
        });
        this.quitGame = this.quitButton.addEventListener("click", () => {
            location.assign("/");
        });
    }
}
