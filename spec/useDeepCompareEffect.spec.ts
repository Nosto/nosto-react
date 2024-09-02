import { describe, it, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import { useDeepCompareEffect } from "../src/hooks/useDeepCompareEffect"

describe("useDeepCompareEffect", () => {
  it("should retrigger on changes", () => {
    const callback = vi.fn()
    const { rerender } = renderHook(props => useDeepCompareEffect(callback, [props]), {
      initialProps: { value: 1 }
    })

    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 1 })
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 2 })
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
