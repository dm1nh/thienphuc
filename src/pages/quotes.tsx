import { Breadcrumb } from "@/components/shared/breadcrumb"

export function QuotesPage() {
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Trang chủ",
          },
          { to: "quotes", label: "Phiếu báo giá" },
        ]}
      />
    </>
  )
}
