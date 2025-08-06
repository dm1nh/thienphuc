import { contextBridge, ipcRenderer } from "electron"

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

import {
  DATA_CREATE_QUOTE,
  DATA_CREATE_RECORD,
  DATA_DELETE_QUOTE,
  DATA_DELETE_RECORD,
  DATA_GET_QUOTE_BY_ID,
  DATA_GET_QUOTES,
  DATA_UPDATE_QUOTE,
  DATA_UPDATE_RECORD,
} from "./data-channels"

export function exposeDataContext() {
  contextBridge.exposeInMainWorld("dataAPI", {
    createQuote: (input: CreateQuoteInput) =>
      ipcRenderer.invoke(DATA_CREATE_QUOTE, input),
    updateQuote: (input: UpdateQuoteInput) =>
      ipcRenderer.invoke(DATA_UPDATE_QUOTE, input),
    getQuotes: () => ipcRenderer.invoke(DATA_GET_QUOTES),
    getQuoteById: (input: GetQuoteByIdInput) =>
      ipcRenderer.invoke(DATA_GET_QUOTE_BY_ID, input),
    deleteQuote: (input: DeleteQuoteInput) =>
      ipcRenderer.invoke(DATA_DELETE_QUOTE, input),
    createRecord: (input: CreateRecordInput) =>
      ipcRenderer.invoke(DATA_CREATE_RECORD, input),
    updateRecord: (input: UpdateRecordInput) =>
      ipcRenderer.invoke(DATA_UPDATE_RECORD, input),
    deleteRecord: (input: DeleteRecordInput) =>
      ipcRenderer.invoke(DATA_DELETE_RECORD, input),
  })
}
