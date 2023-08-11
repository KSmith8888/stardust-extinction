export function sizeCanvas(canvas: HTMLCanvasElement) {
    if (window.innerWidth < 900) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = 900;
        canvas.height = 600;
    }
}
