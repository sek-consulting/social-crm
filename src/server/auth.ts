import Credentials from "@auth/core/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type SolidAuthConfig } from "@solid-auth/base"

import { prisma } from "~/server/db"
import * as scrypt from "~/server/scrypt"

interface UserInfo {
  id?: string
}

declare module "@auth/core/types" {
  export interface Session {
    user?: DefaultSession["user"] & UserInfo
  }
}
declare module "@auth/core/jwt" {
  export interface JWT extends DefaultJWT, UserInfo {}
}

export const authOptions: SolidAuthConfig = {
  // @ts-expect-error - this is a valid adapter
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "EMail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          return null
        }
        const { email, password } = credentials as { email: string; password: string }

        const user = await prisma.user.findUnique({ where: { email: email } })
        if (user) {
          const match = await scrypt.compare(password, user.password)
          if (match) {
            return user
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  debug: true
}
