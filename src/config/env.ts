import dotenv from 'dotenv'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'development'

const envFileMap: Record<string, string> = {
  development: '.env.development',
  production: '.env.production',
  test: '.env.test',
}

dotenv.config({
  path: path.join(process.cwd(), envFileMap[NODE_ENV] || '.env'),
})

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  APP_PORT: number

  DATABASE_URL: string
  DB_HOST: string
  DB_USER: string
  DB_PORT: number
  DB_PASSWORD: string
  DB_NAME: string

  JWT_SECRET: string
  JWT_EXPIRE: string
  LOG_LEVEL: string
}

function required(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`ENV ${key} is required`)
  }
  return value
}

export const config: EnvConfig = {
  NODE_ENV: NODE_ENV as EnvConfig['NODE_ENV'],
  APP_PORT: Number(process.env.APP_PORT || 3000),

  DATABASE_URL: required('DATABASE_URL'),
  DB_HOST: required("DB_HOST"),
  DB_USER: required("DB_USER"),
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: required("DB_NAME"),

  JWT_SECRET:
    NODE_ENV === 'production'
      ? required('JWT_SECRET')
      : process.env.JWT_SECRET || 'dev-secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
}
