import { DependencyList, useEffect } from "react"
import { useNostoContext } from "./useNostoContext"
import { NostoClient } from "../types"
import { useDeepCompareEffect } from "./useDeepCompareEffect"

export function useNostoApi(cb: (api: NostoClient) => void, deps?: DependencyList, flags?: { deep?: boolean }): void {
  const { clientScriptLoaded } = useNostoContext()
  const useEffectFn = flags?.deep ? useDeepCompareEffect : useEffect

  useEffectFn(() => {
    if (clientScriptLoaded) {
      window.nostojs(cb)
    }
  }, [clientScriptLoaded, ...(deps ?? [])])
}
