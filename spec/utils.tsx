import { ReactNode } from "react"
import { NostoContext, NostoContextType } from "../src/context"
import { NostoClient } from "../src/types"

export const WAIT_FOR_TIMEOUT = 2000

export function listenTo(event: string) {
  const requests: unknown[] = []
  if (!window.nostojs) {
    window.nostojs = (cb: (api: NostoClient) => void) => {
      ;(window.nostojs.q = window.nostojs.q || []).push(cb)
    }
  }
  window.nostojs(api => api.listen(event, req => requests.push(req)))
  return requests
}

export function createWrapper(nostoContext: NostoContextType) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NostoContext.Provider value={nostoContext}>{children}</NostoContext.Provider>
  }
}
