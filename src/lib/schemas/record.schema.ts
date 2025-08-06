import { z } from "zod"

import { RECORD_TYPES } from "../constants"

const typeEnumSchema = z.enum(RECORD_TYPES)

export const createRecordFormInputSchema = z.object({
  name: z.string().min(1, { message: "Tên hạng mục là nội dung bắt buộc" }),
  unit: z.string().min(1, { message: "Đơn vị tính là nội dung bắt buộc" }),
  unitPrice: z.coerce
    .number({ message: "Đơn giá phải ở dạng số" })
    .min(0)
    .default(0),
  quantity: z.coerce
    .number({ message: "Số lượng phải ở dạng số" })
    .min(1)
    .default(1),
  vat: z.coerce
    .number({ message: "Thuế VAT phải ở dạng số" })
    .min(0)
    .default(8),
  type: typeEnumSchema.default("1"),
})

export type CreateRecordFormInput = z.infer<typeof createRecordFormInputSchema>

export const createRecordInputSchema = createRecordFormInputSchema.extend({
  quoteId: z.string(),
})

export type CreateRecordInput = z.infer<typeof createRecordInputSchema>

export type TypeEnum = z.infer<typeof typeEnumSchema>

export const updateRecordFormInputSchema = z.object({
  id: z.number().int(),
  data: createRecordFormInputSchema.partial(),
})

export type UpdateRecordFormInput = z.infer<typeof updateRecordFormInputSchema>

export const updateRecordInputSchema = updateRecordFormInputSchema

export type UpdateRecordInput = z.infer<typeof updateRecordInputSchema>

export const deleteRecordInputSchema = z.number().int()

export type DeleteRecordInput = z.infer<typeof deleteRecordInputSchema>
