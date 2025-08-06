import { createRoute } from "@tanstack/react-router"

import { getQuoteById, getQuotes } from "@/lib/helpers/data.helpers"
import { EditQuotePage } from "@/pages/edit-quote"
import { HomePage } from "@/pages/home"
import { NewQuotePage } from "@/pages/new-quote"
import { PrintQuotePage } from "@/pages/print-quote"
import { QuotePage } from "@/pages/quote"
import { QuotesPage } from "@/pages/quotes"

import { rootRoute } from "./__root"

export const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

export const QuotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes",
  component: QuotesPage,
  loader: async () => {
    return getQuotes()
  },
})

export const NewQuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/new",
  component: NewQuotePage,
})

export const QuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/$quoteId",
  loader: async ({ params }) => {
    return getQuoteById(params.quoteId)
  },
  component: QuotePage,
})

export const EditQuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/$quoteId/edit",
  loader: async ({ params }) => {
    return getQuoteById(params.quoteId)
  },
  component: EditQuotePage,
})

export const PrintQuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/$quoteId/print",
  loader: async ({ params }) => {
    return getQuoteById(params.quoteId)
  },
  component: PrintQuotePage,
})

export const routeTree = rootRoute.addChildren([
  HomeRoute,
  QuotesRoute,
  NewQuoteRoute,
  QuoteRoute,
  EditQuoteRoute,
  PrintQuoteRoute,
])
