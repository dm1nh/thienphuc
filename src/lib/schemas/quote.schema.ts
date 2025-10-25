import { z } from "zod"

import { QUOTE_TYPES } from "../constants"

export const quoteTypeEnumSchema = z.enum(QUOTE_TYPES)
// create
export const createQuoteFormInputSchema = z.object({
  id: z.string().min(1, { message: "Số phiếu là nội dung bắt buộc" }),
  type: quoteTypeEnumSchema.default("1").optional(),
  customer: z
    .string()
    .min(1, { message: "Tên khách hàng là nội dung bắt buộc" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Số điện thoại là nội dung bắt buộc" }),
  address: z.string(),
  taxCode: z.string(),
  carModel: z.string(),
  carRegistrationNumber: z.string(),
  carOdometer: z.coerce.number<number>(),
  carVin: z.string(),
  date: z.iso.datetime({ message: "Ngày xuất phiếu chưa đúng định dạng" }),
})

export type CreateQuoteFormInput = z.infer<typeof createQuoteFormInputSchema>

export const createQuoteInputSchema = createQuoteFormInputSchema

export type CreateQuoteInput = z.infer<typeof createQuoteInputSchema>

export type QuoteTypeEnum = z.infer<typeof quoteTypeEnumSchema>

// update
export const updateQuoteFormInputSchema = createQuoteFormInputSchema.partial()

export type UpdateQuoteFormInput = z.infer<typeof updateQuoteFormInputSchema>

export const updateQuoteInputSchema = z.object({
  id: z.string(),
  data: updateQuoteFormInputSchema,
})

export type UpdateQuoteInput = z.infer<typeof updateQuoteInputSchema>

// get
export const getQuoteByIdInputSchema = z.string()

export type GetQuoteByIdInput = z.infer<typeof getQuoteByIdInputSchema>

// delete
export const deleteQuoteInputSchema = z.string()

export type DeleteQuoteInput = z.infer<typeof deleteQuoteInputSchema>

export const printSettingsFormInputSchema = z.object({
  marginLeft: z.coerce.number<number>(),
  marginRight: z.coerce.number<number>(),
  marginTop: z.coerce.number<number>(),
  marginBottom: z.coerce.number<number>(),
})
export type PrintSettingsFormInput = z.infer<
  typeof printSettingsFormInputSchema
>
