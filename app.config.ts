import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
  ssr: true,
  middleware: "./src/middleware/index.ts",
  server: {
    preset: "netlify"
  }
})
