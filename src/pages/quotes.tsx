import { Link, useLoaderData } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"

import { QuoteCard } from "@/components/quote-card"
import { Breadcrumb } from "@/components/shared/breadcrumb"
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
            label: "Màn hình chính",
          },
          { to: "/quotes", label: "Phiếu sửa chữa" },
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
