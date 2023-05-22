import path from "path"

import vercel from "solid-start-vercel"

import prpc from "@prpc/vite"
import solid from "solid-start/vite"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    plugins: [prpc(), solid({ ssr: true, adapter: vercel({}) })],
    ssr: { external: ["@prisma/client"] },
    resolve: {
      alias: {
        rpc: path.join(__dirname, "src", "server", "api")
      }
    }
  }
})
