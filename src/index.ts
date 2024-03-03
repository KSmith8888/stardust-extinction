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
import beepSoundUrl from "../assets/audio/beep.wav";

const startButton = <HTMLButtonElement>document.getElementById("start-button");
const continueButton = <HTMLButtonElement>(
    document.getElementById("continue-button")
);
const gameInfoButton = <HTMLButtonElement>(
    document.getElementById("game-info-button")
);
startButton.focus();
const beepSound = new Audio(beepSoundUrl);
beepSound.volume = 0.4;
const hasCompletedTutorial = localStorage.getItem("tutorial-completed");
const continueLevel = localStorage.getItem("current-level");

async function startLevel1() {
    try {
        await beepSound.play();
        if (
            continueLevel &&
            !isNaN(parseInt(continueLevel)) &&
            parseInt(continueLevel, 10) > 1
        ) {
            if (
                window.confirm(
                    "If you start a new game your previous save data will be deleted. Are you sure you want to start a new game?"
                )
            ) {
                localStorage.removeItem("current-level");
                setTimeout(() => {
                    location.assign(
                        `${import.meta.env.BASE_URL}levels/level-1/level-1.html`
                    );
                }, 800);
            }
        } else {
            setTimeout(() => {
                if (hasCompletedTutorial) {
                    location.assign(
                        `${import.meta.env.BASE_URL}levels/level-1/level-1.html`
                    );
                } else {
                    location.assign(
                        `${import.meta.env.BASE_URL}levels/intro/intro.html`
                    );
                }
            }, 600);
        }
    } catch (error) {
        console.error(error);
    }
}

async function continueGame() {
    try {
        await beepSound.play();
        setTimeout(() => {
            if (continueLevel && !isNaN(parseInt(continueLevel, 10))) {
                const levelNumber = parseInt(continueLevel, 10);
                if (levelNumber > 0 && levelNumber < 5) {
                    location.assign(
                        `${
                            import.meta.env.BASE_URL
                        }levels/level-${levelNumber}/level-${levelNumber}.html`
                    );
                } else {
                    alert(
                        "You have reached the end of the playable levels. Start a new game or check back later when the game is completed"
                    );
                }
            } else {
                alert("No save data found, please start a new game.");
            }
        }, 600);
    } catch (error) {
        console.error(error);
    }
}

async function gameInfo() {
    try {
        await beepSound.play();
        setTimeout(() => {
            location.assign(`${import.meta.env.BASE_URL}game-info.html`);
        }, 600);
    } catch (error) {
        console.error(error);
    }
}

startButton.addEventListener("click", startLevel1);
continueButton.addEventListener("click", continueGame);
gameInfoButton.addEventListener("click", gameInfo);
