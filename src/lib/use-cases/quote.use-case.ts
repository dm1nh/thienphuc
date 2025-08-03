import { quoteRepository } from "@/lib/repositories/quote.repository"
import type {
  CreateQuoteInput,
  DeleteQuoteInput,
  GetQuoteByIdInput,
  UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"
import { quoteValidation } from "@/lib/validations/quote.validation"

export const quoteUseCase = {
  createQuote: async (input: CreateQuoteInput) => {
    quoteValidation.createQuote(input)
    return await quoteRepository.createQuote(input)
  },
  updateQuote: async (input: UpdateQuoteInput) => {
    quoteValidation.updateQuote(input)
    return await quoteRepository.updateQuote(input)
  },
  getQuotes: async () => {
    return await quoteRepository.getQuotes()
  },
  getQuoteById: async (input: GetQuoteByIdInput) => {
    quoteValidation.getQuoteById(input)
    return await quoteRepository.getQuoteById(input)
  },
  deleteQuote: async (input: DeleteQuoteInput) => {
    quoteValidation.deleteQuote(input)
    return await quoteRepository.deleteQuote(input)
  },
}
