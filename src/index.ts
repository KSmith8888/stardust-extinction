/**
 * Stardust Extinction
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
