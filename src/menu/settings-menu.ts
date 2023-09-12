import MainMenu from "./main-menu";

export default class SettingsMenu {
    mainMenu: MainMenu;
    container: HTMLDivElement;
    settingsMenu: HTMLDialogElement;
    easyButton: HTMLButtonElement;
    easyDifficulty: void;
    normalButton: HTMLButtonElement;
    normalDifficulty: void;
    hardButton: HTMLButtonElement;
    hardDifficulty: void;
    deleteSaveButton: HTMLButtonElement;
    deleteSaveData: void;
    replayTutorialButton: HTMLButtonElement;
    replayTutorial: void;
    closeSettingsButton: HTMLButtonElement;
    closeSettings: void;
    constructor(mainMenu: MainMenu) {
        this.mainMenu = mainMenu;
        this.container = <HTMLDivElement>document.getElementById("container");
        this.settingsMenu = document.createElement("dialog");
        this.easyButton = document.createElement("button");
        this.easyDifficulty = this.easyButton.addEventListener("click", () => {
            this.changeDifficulty("Easy");
        });
        this.normalButton = document.createElement("button");
        this.normalDifficulty = this.normalButton.addEventListener(
            "click",
            () => {
                this.changeDifficulty("Normal");
            }
        );
        this.hardButton = document.createElement("button");
        this.hardDifficulty = this.hardButton.addEventListener("click", () => {
            this.changeDifficulty("Hard");
        });
        this.deleteSaveButton = document.createElement("button");
        this.deleteSaveData = this.deleteSaveButton.addEventListener(
            "click",
            () => {
                if (
                    window.confirm(
                        "This will delete saved game progress and all other data and return you to the title screen. Are you sure?"
                    )
                ) {
                    localStorage.clear();
                    location.assign("/");
                }
            }
        );
        this.replayTutorialButton = document.createElement("button");
        this.replayTutorial = this.replayTutorialButton.addEventListener(
            "click",
            () => {
                location.assign("/levels/tutorial/tutorial.html");
            }
        );
        this.closeSettingsButton = document.createElement("button");
        this.closeSettings = this.closeSettingsButton.addEventListener(
            "click",
            () => {
                this.mainMenu.isSubMenuOpen = false;
                this.settingsMenu.close();
            }
        );
        this.generateControlsHTML();
    }
    generateControlsHTML() {
        this.settingsMenu.id = "settings-menu";
        this.settingsMenu.classList.add("modal");
        this.container.append(this.settingsMenu);
        const mainHeading = document.createElement("h2");
        mainHeading.classList.add("menu-main-heading");
        mainHeading.textContent = "Settings";
        this.settingsMenu.append(mainHeading);
        const difficultyCon = document.createElement("div");
        difficultyCon.id = "difficulty-container";
        this.settingsMenu.append(difficultyCon);
        const subHeading = document.createElement("div");
        subHeading.id = "difficulty-heading";
        subHeading.classList.add("menu-sub-heading");
        subHeading.textContent = "Difficulty:";
        difficultyCon.append(subHeading);
        const buttonRow = document.createElement("div");
        buttonRow.classList.add("button-row");
        difficultyCon.append(buttonRow);
        this.easyButton.id = "easy-button";
        this.easyButton.classList.add("button");
        this.easyButton.type = "button";
        this.easyButton.textContent = "Easy";
        buttonRow.append(this.easyButton);
        this.normalButton.id = "normal-button";
        this.normalButton.classList.add("button");
        this.normalButton.type = "button";
        this.normalButton.textContent = "Normal";
        buttonRow.append(this.normalButton);
        this.hardButton.id = "hard-button";
        this.hardButton.classList.add("button");
        this.hardButton.type = "button";
        this.hardButton.textContent = "Hard";
        buttonRow.append(this.hardButton);
        this.deleteSaveButton.classList.add("button");
        this.deleteSaveButton.type = "button";
        this.deleteSaveButton.textContent = "Delete Data";
        this.settingsMenu.append(this.deleteSaveButton);
        this.replayTutorialButton.classList.add("button");
        this.replayTutorialButton.type = "button";
        this.replayTutorialButton.textContent = "Replay Tutorial";
        this.settingsMenu.append(this.replayTutorialButton);
        this.closeSettingsButton.classList.add("button");
        this.closeSettingsButton.type = "button";
        this.closeSettingsButton.textContent = "Close";
        this.settingsMenu.append(this.closeSettingsButton);
    }
    changeDifficulty(newDifficulty: string) {
        if (
            window.confirm(
                "Changing the difficulty will restart the current level, are you sure that you want to change it?"
            )
        ) {
            if (newDifficulty === "Easy") {
                localStorage.setItem("difficulty-setting", "Easy");
            } else if (newDifficulty === "Normal") {
                localStorage.setItem("difficulty-setting", "Normal");
            } else if (newDifficulty === "Hard") {
                localStorage.setItem("difficulty-setting", "Hard");
            }
            location.reload();
        }
    }
}
