import { Breadcrumb } from "@/components/shared/breadcrumb"
import { QuoteForm } from "@/forms/quote-form"

export function NewQuotePage() {
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Trang chủ",
          },
          { to: "/quotes", label: "Phiếu báo giá" },
          { to: "/quotes/new", label: "Tạo mới" },
        ]}
      />
      <div className="space-y-4">
        <QuoteForm />
      </div>
    </>
  )
}
