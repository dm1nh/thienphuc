import { seed } from "drizzle-seed"

import { db, seedDb } from "."
import * as schema from "./schema"

export async function seedDatabase() {
  const result = await db.select().from(schema.quotes)
  if (result.length > 0) {
    return
  }
  await seed(seedDb, schema).refine(() => ({
    quotes: {
      columns: {},
      count: 5,
      with: {
        records: 10,
      },
    },
  }))
}
