import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { QuoteWithRecords, Record } from "./db/schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type RecordGroup = {
  [type: string]: {
    records: (Record & {
      totalExcludingTax: number
      tax: number
      total: number
    })[]
    subtotal: number
  }
}

export function cmToPx(input: number, dpi = 96) {
  return Math.floor(input * (dpi / 2.54))
}

export function calculateQuote(quoteWithRecords: QuoteWithRecords): Omit<
  QuoteWithRecords,
  "records"
> & {
  groupedRecords: RecordGroup
  grandTotalExcludingTax: number
  grandTax: number
  grandTotal: number
} {
  const groupedRecords: RecordGroup = {}

  let grandTotal = 0
  let grandTotalExcludingTax = 0
  let grandTax = 0

  for (const record of quoteWithRecords.records) {
    const { type, unitPrice, quantity, vat } = record

    const totalExcludingTax = unitPrice * quantity
    const tax = totalExcludingTax * ((vat ?? 8) / 100)
    const total = totalExcludingTax + tax

    if (!groupedRecords[type]) {
      groupedRecords[type] = {
        records: [],
        subtotal: 0,
      }
    }

    groupedRecords[type].records.push({
      ...record,
      totalExcludingTax,
      tax,
      total,
    })
    groupedRecords[type].subtotal += total
    grandTotalExcludingTax += totalExcludingTax
    grandTax += tax
    grandTotal += total
  }

  const { records: _, ...quote } = quoteWithRecords
  return {
    ...quote,
    groupedRecords,
    grandTotalExcludingTax,
    grandTax,
    grandTotal,
  }
}
