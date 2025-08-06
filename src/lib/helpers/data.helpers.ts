import type {
  CreateQuoteInput,
  DeleteQuoteInput,
  GetQuoteByIdInput,
  UpdateQuoteInput,
} from "@/lib/schemas/quote.schema"
import type {
  CreateRecordInput,
  DeleteRecordInput,
  UpdateRecordInput,
} from "@/lib/schemas/record.schema"

export async function createQuote(input: CreateQuoteInput) {
  return await window.dataAPI.createQuote(input)
}

export async function updateQuote(input: UpdateQuoteInput) {
  return await window.dataAPI.updateQuote(input)
}

export async function getQuotes() {
  return await window.dataAPI.getQuotes()
}

export async function getQuoteById(input: GetQuoteByIdInput) {
  return await window.dataAPI.getQuoteById(input)
}

export async function deleteQuote(input: DeleteQuoteInput) {
  return await window.dataAPI.deleteQuote(input)
}

export async function createRecord(input: CreateRecordInput) {
  return await window.dataAPI.createRecord(input)
}

export async function updateRecord(input: UpdateRecordInput) {
  return await window.dataAPI.updateRecord(input)
}

export async function deleteRecord(input: DeleteRecordInput) {
  return await window.dataAPI.deleteRecord(input)
}
