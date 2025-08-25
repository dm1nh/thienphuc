import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./resources/db/migrations",
  dbCredentials: {
    url: "./database.db",
  },
})
