import { createRoute } from "@tanstack/react-router"

import { HomePage } from "@/pages/home"
import { NewQuotePage } from "@/pages/new-quote"
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
    const quotes = await window.dataAPI.getQuotes()
    return quotes
  },
})

export const NewQuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/new",
  component: NewQuotePage,
})

export const routeTree = rootRoute.addChildren([
  HomeRoute,
  QuotesRoute,
  NewQuoteRoute,
])
