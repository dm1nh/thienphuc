import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import type {
  CreateQuoteInput,
  DeleteQuoteInput,
  GetQuoteByIdInput,
  UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"

import { quotes } from "../db/schema"

export const quoteRepository = {
  createQuote: async (input: CreateQuoteInput) => {
    const [quote] = await db
      .insert(quotes)
      .values(input)
      .returning({ id: quotes.id })
    return quote.id
  },
  updateQuote: async (input: UpdateQuoteInput) => {
    const [quote] = await db
      .update(quotes)
      .set(input.data)
      .where(eq(quotes.id, input.id))
      .returning({ id: quotes.id })
    return quote.id
  },
  getQuotes: async () => {
    const result = await db.select().from(quotes)
    return result
  },
  getQuoteById: async (input: GetQuoteByIdInput) => {
    const quote = await db.query.quotes.findFirst({
      where: eq(quotes.id, input),
      with: {
        records: true,
      },
    })
    return quote
  },
  deleteQuote: async (input: DeleteQuoteInput) => {
    const [quote] = await db
      .delete(quotes)
      .where(eq(quotes.id, input))
      .returning({ id: quotes.id })
    return quote.id
  },
}
