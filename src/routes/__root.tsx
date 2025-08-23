import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Toaster } from "sonner"

import { BaseLayout } from "@/layouts/base-layout"

export const rootRoute = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
      <TanStackRouterDevtools />
      <Toaster />
    </>
  )
}
