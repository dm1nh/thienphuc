import { ipcMain, type IpcMainInvokeEvent } from "electron"

import {
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
import { quoteUseCase } from "@/lib/use-cases/quote.use-case"
import { recordUseCase } from "@/lib/use-cases/record.use-case"

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

export function addDataEventListeners() {
  ipcMain.handle(
    DATA_CREATE_QUOTE,
    async (_event: IpcMainInvokeEvent, input: CreateQuoteInput) => {
      return await quoteUseCase.createQuote(input)
    },
  )
  ipcMain.handle(
    DATA_UPDATE_QUOTE,
    async (_event: IpcMainInvokeEvent, input: UpdateQuoteInput) => {
      return await quoteUseCase.updateQuote(input)
    },
  )
  ipcMain.handle(DATA_GET_QUOTES, async () => {
    return await quoteUseCase.getQuotes()
  })
  ipcMain.handle(
    DATA_GET_QUOTE_BY_ID,
    async (_event: IpcMainInvokeEvent, input: GetQuoteByIdInput) => {
      return await quoteUseCase.getQuoteById(input)
    },
  )
  ipcMain.handle(
    DATA_DELETE_QUOTE,
    async (_event: IpcMainInvokeEvent, input: DeleteQuoteInput) => {
      return await quoteUseCase.deleteQuote(input)
    },
  )
  ipcMain.handle(
    DATA_CREATE_RECORD,
    async (_event: IpcMainInvokeEvent, input: CreateRecordInput) => {
      return await recordUseCase.createRecord(input)
    },
  )
  ipcMain.handle(
    DATA_UPDATE_RECORD,
    async (_event: IpcMainInvokeEvent, input: UpdateRecordInput) => {
      return await recordUseCase.updateRecord(input)
    },
  )
  ipcMain.handle(
    DATA_DELETE_RECORD,
    async (_event: IpcMainInvokeEvent, input: DeleteRecordInput) => {
      return await recordUseCase.deleteRecord(input)
    },
  )
}
