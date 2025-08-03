import { z } from "zod"

// create
export const createQuoteFormInputSchema = z.object({
  id: z.string().min(1, { message: "Số phiếu là nội dung bắt buộc" }),
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
  carOdometer: z.coerce.number({ message: "Số KM phải là một số dương" }),
  carVin: z.string(),
  date: z.iso.datetime({ message: "Ngày xuất phiếu chưa đúng định dạng" }),
})

export type CreateQuoteFormInput = z.infer<typeof createQuoteFormInputSchema>

export const createQuoteInputSchema = createQuoteFormInputSchema

export type CreateQuoteInput = z.infer<typeof createQuoteInputSchema>

// update
export const updateQuoteFormInputSchema = z.object({
  id: z.string(),
  data: z
    .object({
      id: z.string().min(1, { message: "Số phiếu là nội dung bắt buộc" }),
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
      carOdometer: z.coerce.number({ message: "Số KM phải là một số dương" }),
      carVin: z.string(),
      date: z.iso.datetime({ message: "Ngày xuất phiếu chưa đúng định dạng" }),
    })
    .partial(),
})

export type UpdateQuoteFormInput = z.infer<typeof updateQuoteFormInputSchema>

export const updateQuoteInputSchema = updateQuoteFormInputSchema

export type UpdateQuoteInput = z.infer<typeof updateQuoteInputSchema>

// get
export const getQuoteByIdInputSchema = z.string()

export type GetQuoteByIdInput = z.infer<typeof getQuoteByIdInputSchema>

// delete
export const deleteQuoteFormInputSchema = z.string()

export type DeleteQuoteFormInput = z.infer<typeof deleteQuoteFormInputSchema>

export const deleteQuoteInputSchema = z.string()

export type DeleteQuoteInput = z.infer<typeof deleteQuoteInputSchema>
