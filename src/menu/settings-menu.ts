import MainMenu from "./main-menu";

export default class SettingsMenu {
    mainMenu: MainMenu;
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
        this.settingsMenu = <HTMLDialogElement>(
            document.getElementById("settings-menu")
        );
        this.easyButton = <HTMLButtonElement>(
            document.getElementById("easy-button")
        );
        this.easyDifficulty = this.easyButton.addEventListener("click", () => {
            this.changeDifficulty("Easy");
        });
        this.normalButton = <HTMLButtonElement>(
            document.getElementById("normal-button")
        );
        this.normalDifficulty = this.normalButton.addEventListener(
            "click",
            () => {
                this.changeDifficulty("Normal");
            }
        );
        this.hardButton = <HTMLButtonElement>(
            document.getElementById("hard-button")
        );
        this.hardDifficulty = this.hardButton.addEventListener("click", () => {
            this.changeDifficulty("Hard");
        });
        this.deleteSaveButton = <HTMLButtonElement>(
            document.getElementById("delete-save-button")
        );
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
        this.replayTutorialButton = <HTMLButtonElement>(
            document.getElementById("replay-tutorial-button")
        );
        this.replayTutorial = this.replayTutorialButton.addEventListener(
            "click",
            () => {
                location.assign("/levels/tutorial/tutorial.html");
            }
        );
        this.closeSettingsButton = <HTMLButtonElement>(
            document.getElementById("close-settings-menu-button")
        );
        this.closeSettings = this.closeSettingsButton.addEventListener(
            "click",
            () => {
                this.mainMenu.isSubMenuOpen = false;
                this.settingsMenu.close();
            }
        );
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
