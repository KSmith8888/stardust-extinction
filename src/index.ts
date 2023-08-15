/**
 *
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * @license SPDX-License-Identifier: Apache-2.0
 *
 */

import "../assets/styles/title-screen.css";
import beepAudioUrl from "../assets/audio/beep.wav";

const startButton = <HTMLButtonElement>document.getElementById("start-button");
const continueButton = <HTMLButtonElement>(
    document.getElementById("continue-button")
);
const gameInfoButton = <HTMLButtonElement>(
    document.getElementById("game-info-button")
);
const beepAudio = new Audio();
beepAudio.src = beepAudioUrl;
const hasCompletedTutorial = localStorage.getItem("tutorial-completed");
const continueLevel = localStorage.getItem("current-level");

async function startLevel1() {
    try {
        await beepAudio.play();
        setTimeout(() => {
            if (hasCompletedTutorial) {
                location.assign("/levels/level-1/level-1.html");
            } else {
                location.assign("/levels/tutorial/tutorial.html");
            }
        }, 800);
    } catch (error) {
        console.error(error);
    }
}

async function continueGame() {
    try {
        await beepAudio.play();
        if (continueLevel && !isNaN(parseInt(continueLevel))) {
            const levelNumber = parseInt(continueLevel);
            location.assign(
                `/levels/level-${levelNumber}/level-${levelNumber}.html`
            );
        } else {
            alert("No save data found, please start a new game.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function gameInfo() {
    try {
        await beepAudio.play();
        console.log("Game Info");
    } catch (error) {
        console.error(error);
    }
}

startButton.addEventListener("click", startLevel1);
continueButton.addEventListener("click", continueGame);
gameInfoButton.addEventListener("click", gameInfo);
