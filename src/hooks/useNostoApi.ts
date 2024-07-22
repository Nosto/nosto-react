import { useEffect } from "react"
import { useNostoContext } from "./useNostoContext"
import { NostoClient } from "../types"
import { useDeepCompareEffect } from "./useDeepCompareEffect"

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
        api.defaultSession().setVariation(currentVariation!).setResponseMode(responseMode)
        cb(api)
      })
    }
  }, [clientScriptLoaded, currentVariation, responseMode, ...(deps ?? [])])
}
