import { Suspense } from "solid-js"
import { isServer } from "solid-js/web"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"

import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core"
import { getCookie } from "vinxi/http"

import { Toaster } from "~/components/ui/toast"

import "@fontsource/inter/latin.css"
import "./app.css"

function getServerCookies() {
  "use server"
  const colorMode = getCookie("kb-color-mode")
  return colorMode ? `kb-color-mode=${colorMode}` : ""
}

export default function App() {
  const storageManager = cookieStorageManagerSSR(isServer ? getServerCookies() : document.cookie)
  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <Suspense>{props.children}</Suspense>
          </ColorModeProvider>
          <Toaster />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
