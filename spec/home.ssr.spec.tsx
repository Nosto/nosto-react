import { test, expect } from "vitest"
import { renderToString } from "react-dom/server"
import { NostoProvider, NostoHome, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"

test("Home page server-side render", async () => {
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
