import { Breadcrumb } from "@/components/shared/breadcrumb"
import { CreateQuoteForm } from "@/forms/create-quote-form"

export function NewQuotePage() {
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Màn hình chính",
          },
          { to: "/quotes", label: "Phiếu sửa chữa" },
          { to: "/quotes/new", label: "Tạo mới" },
        ]}
      />
      <div className="space-y-4">
        <CreateQuoteForm />
      </div>
    </>
  )
}
