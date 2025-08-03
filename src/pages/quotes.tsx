import { Link, useLoaderData } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"

import { Breadcrumb } from "@/components/shared/breadcrumb"
import { QuoteCard } from "@/components/shared/quote-card"
import { Button } from "@/components/ui/button"
import { Quote } from "@/lib/db/schema"

export function QuotesPage() {
  const data = useLoaderData({ from: "/quotes" }) as Quote[]
  console.log(data)

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
      <Link to="/quotes/new">
        <Button>
          <PlusIcon /> Thêm
        </Button>
      </Link>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {data?.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </>
  )
}
