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
import Game from "../game-logic";
//Utils
import { sizeCanvas } from "../../src/utils/sizeCanvas";

export default class Level2Game extends Game {
    constructor() {
        super();
        sizeCanvas(this.canvas);
    }
}

const game = new Level2Game();
console.log(game);
