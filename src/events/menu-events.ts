/*
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 */

import beepAudioUrl from "../../assets/audio/beep.wav";

export default class MenuEvents {
    menuButton: HTMLButtonElement;
    mainMenu: HTMLDialogElement;
    isMenuOpen: boolean;
    closeButton: HTMLButtonElement;
    quitButton: HTMLButtonElement;
    openMenu: void;
    closeMenu: void;
    quitGame: void;
    beepAudio: HTMLAudioElement;
    constructor() {
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
            this.isMenuOpen = true;
        });
        this.closeMenu = this.closeButton.addEventListener("click", () => {
            this.mainMenu.close();
            this.isMenuOpen = false;
        });
        this.quitGame = this.quitButton.addEventListener("click", () => {
            location.assign("/");
        });
        this.beepAudio = new Audio(beepAudioUrl);
    }
}
