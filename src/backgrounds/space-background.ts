/*
 * Stardust Extinction
 * Copyright 2023 Kevyn Smith
 *
 * Licensed under the Apache License, Version 2.0
 * SPDX-License-Identifier: Apache-2.0
 */

export class Background {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    backgroundUrl: string;
    image: HTMLImageElement;
    #width: number;
    #height: number;
    x: number;
    y: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        backgroundUrl: string
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.backgroundUrl = backgroundUrl;
        this.image = new Image();
        this.image.src = backgroundUrl;
        this.#width = canvas.width;
        this.#height = canvas.height;
        this.x = 0;
        this.y = 0;
    }
    render(): void {
        this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.#width,
            this.#height
        );
        this.ctx.drawImage(
            this.image,
            this.x,
            this.y - this.#height,
            this.#width,
            this.#height
        );
    }
    updatePosition(): void {
        if (this.y < this.canvas.height) {
            this.y += 0.75;
        } else {
            this.y = 0;
        }
    }
}
