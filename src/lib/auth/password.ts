import { hash, verify } from "@node-rs/argon2"

const ARGON_SETTINGS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, ARGON_SETTINGS)
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
  return await verify(hash, password, ARGON_SETTINGS)
}
