import type { ParentProps } from "solid-js"
import { createContext, useContext } from "solid-js"

import type { User } from "~/lib/db"

type AuthProviderProps = ParentProps<{ user: () => User | undefined }>

const AuthContext = createContext<() => User | undefined>(() => undefined)

export function AuthProvider(props: AuthProviderProps) {
  // eslint-disable-next-line solid/reactivity
  return <AuthContext.Provider value={props.user}>{props.children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
