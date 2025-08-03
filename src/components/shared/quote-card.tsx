import { Link } from "@tanstack/react-router"
import { format } from "date-fns"

import type { Quote } from "@/lib/db/schema"

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <Link
      to={`/quotes/${quote.id}`}
      className="hover:border-accent space-y-1 rounded-lg border p-4 duration-150"
    >
      <p>#{quote.id}</p>
      <h3 className="text-xl font-semibold">{quote.customer}</h3>
      <p>{quote.phoneNumber}</p>
      <p>{quote.address}</p>
      {/* <p className="text-muted-foreground"> */}
      {/*   {format(new Date(quote.date), "dd-MM-yyy")} */}
      {/* </p> */}
    </Link>
  )
}
