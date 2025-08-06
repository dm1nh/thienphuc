import { quoteRepository } from "@/lib/repositories/quote.repository"
import type {
  CreateQuoteInput,
  DeleteQuoteInput,
  GetQuoteByIdInput,
  UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"
import { quoteValidation } from "@/lib/validations/quote.validation"

export const quoteUseCase = {
  createQuote: (input: CreateQuoteInput) => {
    quoteValidation.createQuote(input)
    return quoteRepository.createQuote(input)
  },
  updateQuote: (input: UpdateQuoteInput) => {
    quoteValidation.updateQuote(input)
    return quoteRepository.updateQuote(input)
  },
  getQuotes: () => {
    return quoteRepository.getQuotes()
  },
  getQuoteById: (input: GetQuoteByIdInput) => {
    quoteValidation.getQuoteById(input)
    return quoteRepository.getQuoteById(input)
  },
  deleteQuote: (input: DeleteQuoteInput) => {
    quoteValidation.deleteQuote(input)
    return quoteRepository.deleteQuote(input)
  },
}
