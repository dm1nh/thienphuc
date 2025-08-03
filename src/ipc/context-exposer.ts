import { exposeDataContext } from "./data/data-context"
import { exposeWindowContext } from "./window/window-context"

export function exposeContexts() {
  exposeWindowContext()
  exposeDataContext()
}
