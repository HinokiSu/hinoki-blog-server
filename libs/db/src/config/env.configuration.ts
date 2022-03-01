import { existsSync } from 'fs'
import { resolve } from 'path'

export function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV

  if (!env) {
    throw new Error(`No export Node env. for example: [cross-env NODE_ENV=development]`)
  } else {
    const filename: string = env === 'development' ? `env.dev.env` : 'env.prod.env'

    const filePath: string = resolve(`${filename}`)

    if (!existsSync(filePath)) {
      throw new Error(
        `No connection string has been provided in the .env file.
        file name: [env.prod.env] or [env.dev.env]`,
      )
    }
    return filePath
  }
}
