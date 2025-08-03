import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { app } from "electron"

const dbPath = app.getPath("userData") + "/database.db"
const sqlite = new Database(dbPath)
export const db = drizzle({ client: sqlite })
