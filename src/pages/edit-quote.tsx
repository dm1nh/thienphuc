import { useLoaderData } from "@tanstack/react-router"

import { RecordList } from "@/components/record-list"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { QuoteForm } from "@/forms/quote-form"
import { RecordForm } from "@/forms/record-form"
import type { QuoteWithRecords } from "@/lib/db/schema"

export function EditQuotePage() {
  const data = useLoaderData({
    from: "/quotes/$quoteId/edit",
  }) as QuoteWithRecords

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
          { to: `/quotes/${data.id}/edit`, label: `Cập nhật` },
        ]}
      />
      <div className="space-y-4">
        <QuoteForm quote={data} />
        <Separator />
        <RecordForm quote={data} />
        <RecordList quote={data} allowEdit />
      </div>
    </>
  )
}
