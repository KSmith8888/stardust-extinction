class Intro {
    mainContainer: HTMLElement;
    messageBox: HTMLDivElement;
    firstParagraph: HTMLParagraphElement;
    secondParagraph: HTMLParagraphElement;
    currentPhase: number;
    firstLineDelay: number;
    secondLineDelay: number;
    skipIntroButton: HTMLButtonElement;
    skipIntro: void;
    constructor() {
        this.mainContainer = <HTMLElement>(
            document.getElementById("main-container")
        );
        this.messageBox = <HTMLDivElement>(
            document.getElementById("message-box")
        );
        this.firstParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-first-line")
        );
        this.secondParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-second-line")
        );
        this.currentPhase = 1;
        this.firstLineDelay = 1250;
        this.secondLineDelay = 1000;
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
            }, this.secondLineDelay);
        } else if (this.currentPhase === 2) {
            setTimeout(() => {
                this.currentPhase = 3;
                this.skipIntroButton.classList.add("fade-out-element");
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "While speculation continued that alien life may be out there, none had yet been encountered."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 3) {
            setTimeout(() => {
                this.currentPhase = 4;
                this.generateText(
                    this.secondParagraph,
                    "So, when the long-range communication system for XR4-793 went down, it was assumed to just be a technical issue. Neither the colonists or the command back on Earth could have imagined what was starting..."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 4) {
            this.messageBox.classList.add("fade-out-element");
            setTimeout(() => {
                this.currentPhase = 5;
                this.mainContainer.classList.add("city-phase");
                this.nextPhase();
            }, 2500);
        } else if (this.currentPhase === 5) {
            setTimeout(() => {
                this.currentPhase = 6;
                this.messageBox.classList.remove("fade-out-element");
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "The invasion struck with overwhelming force. As the invading aliens had technology that prevented their detection by radar systems, the colonists were caught completely off-guard."
                );
            }, this.firstLineDelay * 2);
        } else if (this.currentPhase === 6) {
            setTimeout(() => {
                this.currentPhase = 7;
                this.generateText(
                    this.secondParagraph,
                    "With no hope of victory, the priority became warning Earth of the threat. After taking the colony, the aliens would surely learn of Earth..."
                );
            }, this.secondLineDelay);
        }
    }
    generateText(paragraphEl: HTMLParagraphElement, text: string) {
        const textArray = text.split("");
        const delay = 100;
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
