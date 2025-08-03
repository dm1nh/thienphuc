import { BrowserWindow } from "electron"

import { addDataEventListeners } from "./data/data-listeners"
import { addWindowEventListeners } from "./window/window-listeners"

export function registerListeners(mainWindow: BrowserWindow) {
  addWindowEventListeners(mainWindow)
  addDataEventListeners()
}
