/*
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 */

import Game from "../../levels/level-1/level-1-logic";
import beepAudioUrl from "../../assets/audio/beep.wav";

export default class MenuEvents {
    game: Game;
    menuButton: HTMLButtonElement;
    mainMenu: HTMLDialogElement;
    isMenuOpen: boolean;
    closeButton: HTMLButtonElement;
    quitButton: HTMLButtonElement;
    openMenu: void;
    closeMenu: void;
    quitGame: void;
    beepAudio: HTMLAudioElement;
    constructor(game: Game) {
        this.game = game;
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
        this.isMenuOpen = false;
        this.openMenu = this.menuButton.addEventListener("click", () => {
            this.beepAudio.play();
            this.mainMenu.showModal();
            this.closeButton.focus();
            this.isMenuOpen = true;
            this.game.isGamePaused = true;
        });
        this.closeMenu = this.closeButton.addEventListener("click", () => {
            this.mainMenu.close();
            this.isMenuOpen = false;
            this.game.isGamePaused = false;
        });
        this.quitGame = this.quitButton.addEventListener("click", () => {
            location.assign("/");
        });
        this.beepAudio = new Audio(beepAudioUrl);
    }
}
