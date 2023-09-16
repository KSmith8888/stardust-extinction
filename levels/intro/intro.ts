class Intro {
    mainContainer: HTMLElement;
    dialogBox: HTMLDivElement;
    firstParagraph: HTMLParagraphElement;
    secondParagraph: HTMLParagraphElement;
    currentPhase: number;
    skipIntroButton: HTMLButtonElement;
    skipIntro: void;
    constructor() {
        this.mainContainer = <HTMLElement>(
            document.getElementById("main-container")
        );
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
        if (this.currentPhase === 1) {
            setTimeout(() => {
                this.currentPhase = 2;
                this.generateText(
                    this.secondParagraph,
                    "One of these colonies, XR4-793, lies at the edge of the Milky Way Galaxy."
                );
            }, 750);
        } else if (this.currentPhase === 2) {
            setTimeout(() => {
                this.currentPhase = 3;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                intro.generateText(
                    intro.firstParagraph,
                    "While speculation continued that alien life may be out there, none had yet been encountered."
                );
            }, 1000);
        } else if (this.currentPhase === 3) {
            setTimeout(() => {
                this.currentPhase = 4;
                this.generateText(
                    this.secondParagraph,
                    "So, when the long-range communication system for XR4-793 went down, it was assumed to just be a technical issue. Neither the colonists or the command back on Earth could have imagined what was starting..."
                );
            }, 750);
        } else if (this.currentPhase === 4) {
            setTimeout(() => {
                this.mainContainer.classList.add("fade-out-element");
            }, 500);
        }
    }
    generateText(paragraphEl: HTMLParagraphElement, text: string) {
        const textArray = text.split("");
        const delay = 150;
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
