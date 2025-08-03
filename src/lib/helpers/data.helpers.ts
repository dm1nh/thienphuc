import type { CreateQuoteInput } from "@/lib/schemas/quote.schema"

export async function createQuote(input: CreateQuoteInput) {
  await window.dataAPI.createQuote(input)
}
