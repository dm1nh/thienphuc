import { useLoaderData } from "@tanstack/react-router"

import { Breadcrumb } from "@/components/shared/breadcrumb"
import type { Quote } from "@/lib/db/schema"

export function PrintQuotePage() {
  const data = useLoaderData({ from: "/quotes/$quoteId/print" }) as Quote
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Trang chủ",
          },
          { to: "/quotes", label: "Phiếu báo giá" },
          { to: `/quotes/${data.id}`, label: `#${data.id}` },
          { to: `/quotes/${data.id}/print`, label: "In" },
        ]}
      />
    </>
  )
}
