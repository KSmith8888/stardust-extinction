class DialogGenerator {
    dialogBox: HTMLDivElement;
    firstParagraph: HTMLParagraphElement;
    secondParagraph: HTMLParagraphElement;
    currentPhase: number;
    constructor() {
        this.dialogBox = <HTMLDivElement>document.getElementById("dialog-box");
        this.firstParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-first-line")
        );
        this.secondParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-second-line")
        );
        this.currentPhase = 1;
    }
    nextPhase() {
        setTimeout(() => {
            if (this.currentPhase === 1) {
                this.currentPhase = 2;
                this.generateText(
                    this.secondParagraph,
                    "Now this is the second"
                );
            } else if (this.currentPhase === 2) {
                location.assign("/levels/tutorial/tutorial.html");
            }
        }, 500);
    }
    generateText(paragraphEl: HTMLParagraphElement, text: string) {
        const textArray = text.split("");
        const delay = 300;
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

const dialog = new DialogGenerator();
dialog.generateText(dialog.firstParagraph, "This is the first line");
