import { useLoaderData } from "@tanstack/react-router"

import { RecordList } from "@/components/record-list"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { CreateRecordForm } from "@/forms/create-record-form"
import { EditQuoteForm } from "@/forms/edit-quote-form"
import type { QuoteWithRecords } from "@/lib/db/schema"

export function EditQuotePage() {
  const data = useLoaderData({
    from: "/quotes/$quoteId/edit",
  }) as QuoteWithRecords
  console.log(data)

  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Màn hình chính",
          },
          { to: "/quotes", label: "Phiếu sửa chữa" },
          { to: `/quotes/${data.id}`, label: `#${data.id}` },
          { to: `/quotes/${data.id}/edit`, label: `Cập nhật` },
        ]}
      />
      <div className="space-y-4">
        <EditQuoteForm quote={data} />
        <Separator />
        <CreateRecordForm quote={data} />
        <RecordList quote={data} allowEdit />
      </div>
    </>
  )
}
