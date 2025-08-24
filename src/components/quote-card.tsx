import { Link } from "@tanstack/react-router"
import { format } from "date-fns"

import { MAPPED_QUOTE_TYPES } from "@/lib/constants"
import type { Quote } from "@/lib/db/schema"

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <Link
      to={"/quotes/$quoteId"}
      params={{ quoteId: quote.id }}
      className="hover:border-accent space-y-1 rounded-lg border p-4 duration-150"
    >
      <p>#{quote.id}</p>
      <p>{MAPPED_QUOTE_TYPES[quote.type]}</p>
      <h3 className="text-xl font-semibold">{quote.customer}</h3>
      <p>{quote.phoneNumber}</p>
      <p>{quote.address}</p>
      <p className="text-muted-foreground">
        {format(new Date(quote.date), "dd-MM-yyy")}
      </p>
    </Link>
  )
}
