class Intro {
    mainContainer: HTMLDivElement;
    introSpaceImage: HTMLImageElement;
    introArmadaImage: HTMLImageElement;
    messageBox: HTMLDialogElement;
    firstParagraph: HTMLParagraphElement;
    secondParagraph: HTMLParagraphElement;
    currentPhase: number;
    newSceneDelay: number;
    firstLineDelay: number;
    secondLineDelay: number;
    skipIntroButton: HTMLButtonElement;
    skipIntro: void;
    constructor() {
        this.mainContainer = <HTMLDivElement>(
            document.getElementById("main-container")
        );
        this.introSpaceImage = <HTMLImageElement>(
            document.getElementById("intro-space-image")
        );
        this.introArmadaImage = <HTMLImageElement>(
            document.getElementById("intro-armada-image")
        );
        this.messageBox = <HTMLDialogElement>(
            document.getElementById("message-box")
        );
        this.firstParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-first-line")
        );
        this.secondParagraph = <HTMLParagraphElement>(
            document.getElementById("dialog-second-line")
        );
        this.currentPhase = 1;
        this.newSceneDelay = 3000;
        this.firstLineDelay = 1250;
        this.secondLineDelay = 1000;
        this.skipIntroButton = <HTMLButtonElement>(
            document.getElementById("skip-intro-button")
        );
        this.skipIntro = this.skipIntroButton.addEventListener("click", () => {
            location.assign("/levels/tutorial/tutorial.html");
        });
    }
    firstPhase() {
        this.introSpaceImage.classList.remove("no-display");
        setTimeout(() => {
            this.messageBox.showModal();
            this.generateText(
                this.firstParagraph,
                "In the year 2457, humans have spread colonies far out across known space."
            );
        }, this.newSceneDelay);
    }
    nextPhase() {
        if (this.currentPhase === 1) {
            setTimeout(() => {
                this.currentPhase = 2;
                this.generateText(
                    this.secondParagraph,
                    "They have been aided in this effort by the discovery of several wormholes that allowed for near instantaneous travel to parts of the universe with potentially habitable planets."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 2) {
            setTimeout(() => {
                this.currentPhase = 3;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "One of these planets, XR4-793, lies at the edge of the Centaurus-A Galaxy."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 3) {
            setTimeout(() => {
                this.currentPhase = 4;
                this.generateText(
                    this.secondParagraph,
                    "It quickly became the site of a major human outpost as it contained a livable atmosphere."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 4) {
            setTimeout(() => {
                this.currentPhase = 5;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "While speculation continued during this exploration that alien life may be out there, none had yet been encountered."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 5) {
            setTimeout(() => {
                this.currentPhase = 6;
                this.generateText(
                    this.secondParagraph,
                    "So, when the long-range communication system for the XR4-793 outpost went down, neither the colonists or the command back on Earth could have imagined what was starting..."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 6) {
            this.messageBox.close();
            setTimeout(() => {
                this.currentPhase = 7;
                this.introSpaceImage.classList.add("no-display");
                this.introArmadaImage.classList.remove("no-display");
                this.nextPhase();
            }, 1000);
        } else if (this.currentPhase === 7) {
            setTimeout(() => {
                this.currentPhase = 8;
                this.messageBox.showModal();
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "In the early hours of October 12th, the colonists were awakened by an armada of alien ships bombarding the outpost."
                );
            }, this.newSceneDelay);
        } else if (this.currentPhase === 8) {
            setTimeout(() => {
                this.currentPhase = 9;
                this.generateText(
                    this.secondParagraph,
                    "As the invading aliens had technology that far exceeded our own, the outpost radar systems had failed to detect their arrival and the colonists were caught completely unaware."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 9) {
            setTimeout(() => {
                this.currentPhase = 10;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "The invading force had started by knocking out the outposts long-range communication facility, located on the planets moon."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 10) {
            setTimeout(() => {
                this.currentPhase = 11;
                this.generateText(
                    this.secondParagraph,
                    "The aliens then struck with overwhelming force and quickly dispatched with the outposts limited defense forces."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 11) {
            setTimeout(() => {
                this.currentPhase = 12;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "With seemingly no hope of victory, the priority became warning Earth of the threat."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 12) {
            setTimeout(() => {
                this.currentPhase = 13;
                this.generateText(
                    this.secondParagraph,
                    "Now, having no way to contact command back on Earth from the outpost directly, the only way to warn them would be to retreat back through the wormhole which had brought them to this part of the universe."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 13) {
            setTimeout(() => {
                this.currentPhase = 14;
                this.firstParagraph.textContent = "";
                this.secondParagraph.textContent = "";
                this.generateText(
                    this.firstParagraph,
                    "In the chaos of the invasion, only one ship was able to escape the outpost intact."
                );
            }, this.firstLineDelay);
        } else if (this.currentPhase === 14) {
            setTimeout(() => {
                this.currentPhase = 15;
                this.generateText(
                    this.secondParagraph,
                    "Now that one ship would need to evade or destroy endless waves of hostile aliens and reach the wormhole if Earth were to have any hope. Good luck..."
                );
            }, this.secondLineDelay);
        } else if (this.currentPhase === 15) {
            setTimeout(() => {
                location.assign("/levels/tutorial/tutorial.html");
            }, 1500);
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
intro.firstPhase();
