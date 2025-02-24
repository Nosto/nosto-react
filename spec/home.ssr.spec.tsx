import { expect, describe, it } from "vitest"
import { renderToString } from "react-dom/server"
import { NostoProvider, NostoHome, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"

describe("Home page server-side render", async () => {
  it("with recommendationComponent", async () => {
    const origWindow = global.window
    try {
      // @ts-expect-error SSR emulation
      global.window = undefined

      const html = renderToString(
        <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={true}>
          <NostoPlacement id="frontpage-nosto-1" />
          <NostoPlacement id="frontpage-nosto-2" />
          <NostoHome />
        </NostoProvider>
      )

      // Check if the rendered HTML contains the expected elements
      expect(html).toContain('id="frontpage-nosto-1"')
      expect(html).toContain('id="frontpage-nosto-2"')
    } finally {
      global.window = origWindow
    }
  })

  it("with renderMode property", async () => {
    const origWindow = global.window
    try {
      // @ts-expect-error SSR emulation
      global.window = undefined

      const html = renderToString(
        <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={true}>
          <NostoPlacement id="frontpage-nosto-1">
            <RecommendationComponent />
          </NostoPlacement>
          <NostoPlacement id="frontpage-nosto-2">
            <RecommendationComponent />
          </NostoPlacement>
        </NostoProvider>
      )

      // Check if the rendered HTML contains the expected elements
      expect(html).toContain('id="frontpage-nosto-1"')
      expect(html).toContain('id="frontpage-nosto-2"')
    } finally {
      global.window = origWindow
    }
  })
})
