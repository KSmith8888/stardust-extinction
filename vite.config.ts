import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        target: ["es2021", "edge88", "firefox98", "chrome87", "safari15.4"],
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
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
            },
        },
    },
});
