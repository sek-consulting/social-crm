import path from "path"

import prpc from "@prpc/vite"
import solid from "solid-start/vite"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    plugins: [prpc(), solid({ ssr: true })],
    ssr: { external: ["@prisma/client"] },
    resolve: {
      alias: {
        rpc: path.join(__dirname, "src", "server", "api")
      }
    }
  }
})
