import { z } from "zod"

const typeEnum = ["1", "2", "3"] as const
const typeEnumSchema = z.enum(typeEnum)

export const createRecordFormInputSchema = z.object({
  name: z.string().min(1, { message: "Tên hạng mục là nội dung bắt buộc" }),
  unitPrice: z.coerce
    .number({ message: "Đơn giá phải ở dạng số" })
    .min(0)
    .default(0)
    .optional(),
  unit: z.string().min(1, { message: "Đơn vị tính là nội dung bắt buộc" }),
  quantity: z.coerce
    .number({ message: "Số lượng phải ở dạng số" })
    .min(1)
    .default(1)
    .optional(),
  vat: z.coerce
    .number({ message: "Thuế VAT phải ở dạng số" })
    .min(0)
    .default(8)
    .optional(),
  type: typeEnumSchema.default("1"),
})

export type CreateRecordFormInput = z.infer<typeof createRecordFormInputSchema>

export const createRecordInputSchema = createRecordFormInputSchema

export type CreateRecordInput = z.infer<typeof createRecordInputSchema>

export type TypeEnum = z.infer<typeof typeEnumSchema>
