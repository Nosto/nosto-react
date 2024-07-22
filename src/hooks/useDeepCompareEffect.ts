import { useEffect, useRef, useMemo } from "react"
import { deepCompare } from "../utils/compare"

export function useDeepCompareEffect(
  callback: Parameters<typeof useEffect>[0],
  dependencies: Parameters<typeof useEffect>[1]
): ReturnType<typeof useEffect> {
  return useEffect(callback, useDeepCompareMemoize(dependencies))
}

function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0)

  if (!deepCompare(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return useMemo(() => ref.current, [signalRef.current])
}
