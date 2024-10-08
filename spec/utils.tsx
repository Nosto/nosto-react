import { ReactNode } from "react"
import { NostoContext, NostoContextType } from "../src/context"
import { screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { nostojs, initNostoStub } from "nosto-js"
import { API } from "nosto-js/client"

const WAIT_FOR_TIMEOUT = 2000

export function listenTo(event: string) {
  const requests: unknown[] = []
  initNostoStub()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  nostojs(api => api.listen(event as Parameters<API['listen']>[0], (req) => {
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
