import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/stardust-extinction/",
    build: {
        target: ["es2021", "edge88", "firefox98", "chrome87", "safari15.4"],
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                levelOne: resolve(__dirname, "levels/level-1/level-1.html"),
            },
        },
    },
});
