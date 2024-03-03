import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        target: ["es2021", "edge88", "firefox98", "chrome87", "safari15.4"],
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                intro: resolve(
                    `${__dirname}/stardust-extinction/levels/intro/`,
                    "intro.html"
                ),
                tutorial: resolve(
                    `${__dirname}/stardust-extinction/levels/tutorial/`,
                    "tutorial.html"
                ),
                levelOne: resolve(
                    `${__dirname}/stardust-extinction/levels/level-1/`,
                    "level-1.html"
                ),
                levelTwo: resolve(
                    `${__dirname}/stardust-extinction/levels/level-2/`,
                    "level-2.html"
                ),
                levelThree: resolve(
                    `${__dirname}/stardust-extinction/levels/level-3/`,
                    "level-3.html"
                ),
                levelFour: resolve(
                    `${__dirname}/stardust-extinction/levels/level-4/`,
                    "level-4.html"
                ),
            },
        },
    },
});
