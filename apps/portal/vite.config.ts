import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  root: "apps/portal",

  build: {
    outDir: "../../dist/apps/portal",
    emptyOutDir: true,
  },
});