import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/stardust-extinction/",
    build: {
        target: "es2022",
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                intro: resolve(`${__dirname}/levels/intro/`, "intro.html"),
                tutorial: resolve(
                    `${__dirname}/levels/tutorial/`,
                    "tutorial.html"
                ),
                levelOne: resolve(
                    `${__dirname}/levels/level-1/`,
                    "level-1.html"
                ),
                levelTwo: resolve(
                    `${__dirname}/levels/level-2/`,
                    "level-2.html"
                ),
                levelThree: resolve(
                    `${__dirname}/levels/level-3/`,
                    "level-3.html"
                ),
                levelFour: resolve(
                    `${__dirname}/levels/level-4/`,
                    "level-4.html"
                ),
            },
        },
    },
});
