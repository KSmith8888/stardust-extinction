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
        if (continueLevel) {
            if (
                window.confirm(
                    "If you start a new game your previous save data will be deleted. Are you sure you want to start a new game?"
                )
            ) {
                localStorage.removeItem("current-level");
                setTimeout(() => {
                    location.assign("/levels/level-1/level-1.html");
                }, 800);
            }
        } else {
            setTimeout(() => {
                if (hasCompletedTutorial) {
                    location.assign("/levels/level-1/level-1.html");
                } else {
                    location.assign("/levels/tutorial/tutorial.html");
                }
            }, 800);
        }
    } catch (error) {
        console.error(error);
    }
}

async function continueGame() {
    try {
        await beepAudio.play();
        setTimeout(() => {
            if (continueLevel && !isNaN(parseInt(continueLevel))) {
                const levelNumber = parseInt(continueLevel);
                location.assign(
                    `/levels/level-${levelNumber}/level-${levelNumber}.html`
                );
            } else {
                alert("No save data found, please start a new game.");
            }
        }, 800);
    } catch (error) {
        console.error(error);
    }
}

async function gameInfo() {
    try {
        await beepAudio.play();
        setTimeout(() => {
            location.assign("/game-info.html");
        }, 800);
    } catch (error) {
        console.error(error);
    }
}

startButton.addEventListener("click", startLevel1);
continueButton.addEventListener("click", continueGame);
gameInfoButton.addEventListener("click", gameInfo);
