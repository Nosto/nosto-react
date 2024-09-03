import { test, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useNostoContext } from "../src/hooks/useNostoContext"

test("useNostoContext", async () => {
  const { result } = renderHook(() => useNostoContext())
  expect(result.current).toBeTruthy()
})
