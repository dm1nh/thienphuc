import { createRoute } from "@tanstack/react-router"

import { HomePage } from "@/pages/home"

import { rootRoute } from "./__root"

export const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

export const routeTree = rootRoute.addChildren([HomeRoute])
