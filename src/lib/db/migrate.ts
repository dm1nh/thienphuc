import path from "node:path"

import { migrate } from "drizzle-orm/better-sqlite3/migrator"

import { db } from "."

const migrationsFolder = path.resolve(
  __dirname,
  "..",
  "..",
  "src/lib/db/migrations",
)

export function runMigrations() {
  migrate(db, {
    migrationsFolder,
  })
}
