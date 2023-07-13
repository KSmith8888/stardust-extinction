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

const startButton = <HTMLAnchorElement>document.getElementById("start-button");
const beepAudio = new Audio();
beepAudio.src = beepAudioUrl;

async function startLevel1() {
    try {
        await beepAudio.play();
        setTimeout(() => {
            location.assign("/levels/level-1/level-1.html");
        }, 1000);
    } catch (error) {
        console.error(error);
    }
}

startButton.addEventListener("click", startLevel1);
