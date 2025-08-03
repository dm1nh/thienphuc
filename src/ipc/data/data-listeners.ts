import { ipcMain, type IpcMainInvokeEvent } from "electron"

import { CreateQuoteInput } from "@/lib/schemas/quote.schema"
import { quoteUseCase } from "@/lib/use-cases/quote.use-case"

import {
  DATA_CREATE_QUOTE,
  DATA_DELETE_QUOTE,
  DATA_GET_QUOTE_BY_ID,
  DATA_GET_QUOTES,
  DATA_UPDATE_QUOTE,
} from "./data-channels"

export function addDataEventListeners() {
  ipcMain.handle(
    DATA_CREATE_QUOTE,
    (event: IpcMainInvokeEvent, input: CreateQuoteInput) => {
      console.log(event, input)
    },
  )
  ipcMain.handle(DATA_GET_QUOTES, async () => {
    const data = await quoteUseCase.getQuotes()
    return data
  })
}
