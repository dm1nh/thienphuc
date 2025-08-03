import { createRoute } from "@tanstack/react-router"

import { HomePage } from "@/pages/home"
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
})

export const routeTree = rootRoute.addChildren([HomeRoute, QuotesRoute])
