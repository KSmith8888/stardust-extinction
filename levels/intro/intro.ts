class Intro {
    dialogBox: HTMLDivElement;
    firstParagraph: HTMLParagraphElement;
    secondParagraph: HTMLParagraphElement;
    currentPhase: number;
    skipIntroButton: HTMLButtonElement;
    skipIntro: void;
    constructor() {
        this.dialogBox = <HTMLDivElement>document.getElementById("dialog-box");
        this.firstParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-first-line")
        );
        this.secondParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-second-line")
        );
        this.currentPhase = 1;
        this.skipIntroButton = <HTMLButtonElement>(
            document.getElementById("skip-intro-button")
        );
        this.skipIntro = this.skipIntroButton.addEventListener("click", () => {
            location.assign("/levels/tutorial/tutorial.html");
        });
    }
    nextPhase() {
        setTimeout(() => {
            if (this.currentPhase === 1) {
                this.currentPhase = 2;
                this.generateText(
                    this.secondParagraph,
                    "One of these colonies, XR4-793, lies at the edge of the Milky Way Galaxy."
                );
            } else if (this.currentPhase === 2) {
                const container = document.getElementById("container");
                if (container) {
                    container.classList.add("fadeOutElement");
                    this.dialogBox.classList.add("fadeOutElement");
                }
            }
        }, 500);
    }
    generateText(paragraphEl: HTMLParagraphElement, text: string) {
        const textArray = text.split("");
        const delay = 200;
        textArray.forEach((char, index) => {
            setTimeout(() => {
                paragraphEl.textContent += char;
                if (index === textArray.length - 1) {
                    this.nextPhase();
                }
            }, delay * index);
        });
    }
}

const intro = new Intro();
intro.generateText(
    intro.firstParagraph,
    "In the year 2157, Earth has spread colonies far out across known space."
);
