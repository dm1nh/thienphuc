import path from "node:path"

import { migrate } from "drizzle-orm/better-sqlite3/migrator"

import { db } from "."

const inDevelopment = process.env.NODE_ENV === "development"

const resourcesPath = process.resourcesPath
const migrationsFolder = inDevelopment ? path.resolve(
  __dirname,
  "..",
  "..",
  "src/extraResources/db/migrations",
) : path.join(resourcesPath, "db", "migrations")

export function applyMigrations() {
  try {
  migrate(db, {
    migrationsFolder,
  })
  console.log("Migration applied successfully")
} catch(err) {
  console.log("Migration failed: ", err)
}
}
