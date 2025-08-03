import type {
  CreateQuoteInput,
  DeleteQuoteInput,
  GetQuoteByIdInput,
  UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"

// Preload types
interface DataAPIContext {
  createQuote: (input: CreateQuoteInput) => Promise<void>
  updateQuote: (input: UpdateQuoteInput) => Promise<void>
  getQuotes: () => Promise<void>
  getQuoteById: (input: GetQuoteByIdInput) => Promise<void>
  deleteQuote: (input: DeleteQuoteInput) => Promise<void>
}

interface ElectronWindowContext {
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
}

declare global {
  interface Window {
    dataAPI: DataAPIContext
    electronWindow: ElectronWindowContext
  }
  const MAIN_WINDOW_VITE_DEV_SERVER_URL: string
  const MAIN_WINDOW_VITE_NAME: string
}
