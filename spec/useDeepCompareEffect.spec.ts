import { describe, it, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import { useDeepCompareEffect } from "../src/hooks"

describe("useDeepCompareEffect", () => {
  it("should retrigger on changes", () => {
    const callback = vi.fn()
    const { rerender } = renderHook(
      ({ value }) => useDeepCompareEffect(callback, [value]),
      { initialProps: { value: 1 } }
    )

    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 1 })
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 2 })
    expect(callback).toHaveBeenCalledTimes(2)
  })
})