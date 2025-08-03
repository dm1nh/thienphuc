import { BrowserWindow } from "electron"

import { addWindowEventListeners } from "./window/window-listeners"

export function registerListeners(mainWindow: BrowserWindow) {
  addWindowEventListeners(mainWindow)
}
