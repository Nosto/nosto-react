import { useEffect, useRef, useMemo } from "react"
import { useNostoContext } from "../components/context"
import { deepCompare } from "./compare"
import { NostoClient } from "../types"

export function useDeepCompareEffect(
  callback: Parameters<typeof useEffect>[0],
  dependencies: Parameters<typeof useEffect>[1]
): ReturnType<typeof useEffect> {
  return useEffect(callback, useDeepCompareMemoize(dependencies))
}

function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value)
  const signalRef = useRef<number>(0)

  if (!deepCompare(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return useMemo(() => ref.current, [signalRef.current])
}

export function useNostoApi(
  cb: (api: NostoClient) => void,
  deps?: React.DependencyList,
  flags?: { deep?: boolean }
): void {
  const { clientScriptLoaded, currentVariation, responseMode } = useNostoContext()
  const useEffectFn = flags?.deep ? useDeepCompareEffect : useEffect

  useEffectFn(() => {
    if (clientScriptLoaded) {
      window.nostojs(api => {
        api.defaultSession().setVariation(currentVariation).setResponseMode(responseMode)
        cb(api)
      })
    }
  }, [clientScriptLoaded, currentVariation, responseMode, ...(deps ?? [])])
}
