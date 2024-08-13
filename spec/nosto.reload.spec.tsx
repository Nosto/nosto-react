import React from "react"
import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import { NostoProvider, NostoHome } from "../src/index"

test("verify Nosto is not loaded twice", async () => {
  // @ts-expect-error dummy placeholder for Nosto iframe window scope  
  window.nosto = {}

  render(
    <NostoProvider account="shopify-11368366139">
      <NostoHome />
    </NostoProvider>
  )

  expect(document.querySelector("[nosto-client-script]")).not.toBeInTheDocument()  
})
