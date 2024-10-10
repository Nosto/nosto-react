import { ReactNode } from "react"
import { NostoContext, NostoContextType } from "../src/context"
import { screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { nostojs } from "@nosto/nosto-js"

const WAIT_FOR_TIMEOUT = 2000

export function listenTo(event: 'prerequest') {
  const requests: unknown[] = []
  nostojs(api => api.listen(event, (req) => {
    requests.push(req)
  }))
  return requests
}

export function createWrapper(nostoContext: NostoContextType) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NostoContext.Provider value={nostoContext}>{children}</NostoContext.Provider>
  }
}

export async function waitForRecommendations(num: number) {
  await waitFor(
    () => expect(screen.getAllByTestId("recommendation")).toHaveLength(num),
    { timeout: WAIT_FOR_TIMEOUT }
  )
}
