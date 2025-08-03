import path from "node:path"

import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { app } from "electron"

import * as schema from "./schema"

const inDevelopment = process.env.NODE_ENV == "development"

const dbPath = inDevelopment
  ? app.getPath("userData") + "/database.db"
  : path.resolve(__dirname, "../../../database.db")
const sqlite = new Database(dbPath)
export const db = drizzle({ client: sqlite, schema })
export const seedDb = drizzle({ client: sqlite })
