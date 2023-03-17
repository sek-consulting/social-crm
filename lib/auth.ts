import { PrismaAdapter } from "@next-auth/prisma-adapter"
import * as bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { db } from "~/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "EMail", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          return null
        }
        const user = await db.user.findUnique({ where: { email: credentials?.email } })
        if (user) {
          const match = await bcrypt.compare(credentials.password, user.password)
          if (match) {
            return user
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id
        // add needed infos here
      }
      return token
    }
  }
}
