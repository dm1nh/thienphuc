import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { BaseLayout } from "@/layouts/base-layout"

export const rootRoute = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
      <TanStackRouterDevtools />
    </>
  )
}
