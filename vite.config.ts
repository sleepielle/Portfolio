import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devtoolsJson from "vite-plugin-devtools-json";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [
    svgr(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    devtoolsJson(),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        sourcemap: false,
      },
      onwarn(warning, warn) {
        // Suppress sourcemap warnings
        if (warning.message?.includes("sourcemap for reporting an error")) {
          return;
        }
        warn(warning);
      },
    },
  },
  esbuild: {
    sourcemap: false,
  },
  logLevel: "warn",
});
