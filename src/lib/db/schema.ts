import {
  relations,
  sql,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey().notNull(),
  customer: text("customer").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address"),
  taxCode: text("tax_code"),
  carModel: text("car_model"),
  carRegistrationNumber: text("car_registration_number"),
  carVin: text("car_vin"),
  carOdometer: integer("car_odometer"),
  date: text("date").notNull(),
  createdAt: text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: text("updated_at")
    .$onUpdate(() => sql`(current_timestamp)`)
    .notNull(),
})

export const quotesRelations = relations(quotes, ({ many }) => ({
  records: many(records),
}))

export type Quote = InferSelectModel<typeof quotes>
export type NewQuote = InferInsertModel<typeof quotes>

const RECORD_TYPES = ["1", "2", "3"] as const

export const records = sqliteTable("records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quoteId: text("quote_id").notNull(),
  name: text("name").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: real("quantity").notNull(),
  vat: integer("vat").notNull().default(8),
  type: text("type", { enum: RECORD_TYPES }).default("1").notNull(),
  createdAt: text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: text("updated_at")
    .$onUpdate(() => sql`(current_timestamp)`)
    .notNull(),
})

export type Record = InferSelectModel<typeof records>
export type NewRecord = InferInsertModel<typeof records>

export const recordsRelations = relations(records, ({ one }) => ({
  quote: one(quotes, {
    fields: [records.quoteId],
    references: [quotes.id],
  }),
}))
