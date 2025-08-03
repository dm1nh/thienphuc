import { ValidationInputError } from "@/lib/errors"
import {
  createQuoteInputSchema,
  deleteQuoteInputSchema,
  getQuoteByIdInputSchema,
  updateQuoteInputSchema,
  type CreateQuoteInput,
  type DeleteQuoteInput,
  type GetQuoteByIdInput,
  type UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"

export const quoteValidation = {
  createQuote: (input: CreateQuoteInput) => {
    const { error } = createQuoteInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
  updateQuote: (input: UpdateQuoteInput) => {
    const { error } = updateQuoteInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
  getQuoteById: (input: GetQuoteByIdInput) => {
    const { error } = getQuoteByIdInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
  deleteQuote: (input: DeleteQuoteInput) => {
    const { error } = deleteQuoteInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
}
