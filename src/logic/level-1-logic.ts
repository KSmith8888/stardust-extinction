const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
function sizeCanvas() {
    if (window.innerWidth < 900) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = 900;
        canvas.height = 600;
    }
}
sizeCanvas();
document.addEventListener("resize", sizeCanvas);

class Player {
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2;
        this.y = canvas.height - this.height;
    }
    render() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class EventListeners {
    player: Player;
    isPlayerMoving: boolean;
    mousedown: void;
    mouseup: void;
    mousemove: void;
    touchstart: void;
    touchend: void;
    touchmove: void;
    constructor(player: Player) {
        this.player = player;
        this.isPlayerMoving = false;
        this.mousedown = canvas.addEventListener("mousedown", (e): void => {
            if (
                e.offsetX >= this.player.x &&
                e.offsetX <= this.player.x + this.player.width &&
                e.offsetY >= this.player.y &&
                e.offsetY <= this.player.y + this.player.height
            ) {
                this.isPlayerMoving = true;
            }
        });
        this.mouseup = canvas.addEventListener("mouseup", (): void => {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
            }
        });
        this.mousemove = canvas.addEventListener("mousemove", (e): void => {
            if (this.isPlayerMoving) {
                if (e.offsetX + this.player.width / 2 > canvas.width) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.offsetX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x = e.offsetX - this.player.width / 2;
                }
                if (e.offsetY + this.player.height / 2 > canvas.height) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.offsetY - this.player.height / 2 < 0) {
                    this.player.y = 0;
                } else {
                    this.player.y = e.offsetY - this.player.height / 2;
                }
            }
        });
        this.touchstart = canvas.addEventListener("touchstart", (e): void => {
            if (
                e.touches[0].clientX >= this.player.x &&
                e.touches[0].clientX <= this.player.x + this.player.width &&
                e.touches[0].clientY >= this.player.y &&
                e.touches[0].clientY <= this.player.y + this.player.height
            ) {
                this.isPlayerMoving = true;
            }
        });
        this.touchend = canvas.addEventListener("touchend", (): void => {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
            }
        });
        this.touchmove = canvas.addEventListener("touchmove", (e): void => {
            if (this.isPlayerMoving) {
                if (
                    e.touches[0].clientX + this.player.width / 2 >
                    canvas.width
                ) {
                    this.player.x = canvas.width - this.player.width;
                } else if (e.touches[0].clientX - this.player.width / 2 < 0) {
                    this.player.x = 0;
                } else {
                    this.player.x =
                        e.touches[0].clientX - this.player.width / 2;
                }
                if (
                    e.touches[0].clientY + this.player.height / 2 >
                    canvas.height
                ) {
                    this.player.y = canvas.height - this.player.height;
                } else if (e.touches[0].clientY - this.player.height / 2 < 0) {
                    this.player.y = 0;
                } else {
                    this.player.y =
                        e.touches[0].clientY - this.player.height / 2;
                }
            }
        });
    }
}

class Background {
    image: HTMLImageElement;
    #width: number;
    #height: number;
    x: number;
    y: number;
    constructor() {
        this.image = new Image();
        this.image.src = "../../assets/images/SpaceBg.png";
        this.#width = canvas.width;
        this.#height = canvas.height;
        this.x = 0;
        this.y = 0;
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y, this.#width, this.#height);
        ctx.drawImage(
            this.image,
            this.x,
            this.y - this.#height,
            this.#width,
            this.#height
        );
    }
    updatePosition() {
        if (this.y < canvas.height) {
            this.y += 0.75;
        } else {
            this.y = 0;
        }
    }
}

class Game {
    player: Player;
    events: EventListeners;
    background: Background;
    constructor() {
        this.player = new Player();
        this.events = new EventListeners(this.player);
        this.background = new Background();
    }
}

const game = new Game();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.background.render();
    game.background.updatePosition();
    game.player.render();
    requestAnimationFrame(animate);
}

animate();
