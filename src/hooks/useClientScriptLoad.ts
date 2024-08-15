import { useState, useMemo, useEffect } from "react"
import { isNostoLoaded } from "../components/helpers"
import type { NostoClient } from "../types"
import type { NostoProviderProps } from "../components/NostoProvider"

type NostoScriptProps = Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets">

export function useClientScriptLoad(props: NostoScriptProps) {
  const { host, account, shopifyMarkets } = props
  const [clientScriptLoadedState, setClientScriptLoadedState] = useState(false)
  const clientScriptLoaded = useMemo(() => clientScriptLoadedState, [clientScriptLoadedState])

  useEffect(() => {
    const scriptOnload = () => {
      if ("nostoReactTest" in window) {
        window.nosto?.reload({
          site: "localhost"
        })
      }
      setClientScriptLoadedState(true)
    }

    // Create script element
    function createScriptElement(urlPartial: string) {
      const scriptEl = document.createElement("script")
      scriptEl.type = "text/javascript"
      scriptEl.src = `//${(host || "connect.nosto.com")}${urlPartial}`
      scriptEl.async = true
      scriptEl.setAttribute("nosto-client-script", "")
      return scriptEl
    }

    // Load Nosto API stub
    if (!window.nostojs) {
      window.nostojs = (cb: (api: NostoClient) => void) => {
        (window.nostojs.q = window.nostojs.q || []).push(cb)
      }
      window.nostojs(api => api.setAutoLoad(false))
    }

    // Load Nosto client script if not already loaded externally
    if (!isNostoLoaded() && !shopifyMarkets) {
      const urlPartial = `/include/${account}`
      const script = createScriptElement(urlPartial)
      script.onload = scriptOnload
      document.body.appendChild(script)
    }

    // Load Shopify Markets scripts
    if (shopifyMarkets) {
      const existingScript = document.querySelector("[nosto-client-script]")
      const marketId = String(shopifyMarkets?.marketId || "")
      const language = shopifyMarkets?.language || ""

      const existingScriptAttributes =
      existingScript?.getAttribute("nosto-language") !== language ||
      existingScript?.getAttribute("nosto-market-id") !== marketId

      if (!existingScript || existingScriptAttributes) {
        if (clientScriptLoadedState) {
          setClientScriptLoadedState(false)
        }

        const nostoSandbox = document.querySelector("#nosto-sandbox")

        existingScript?.parentNode?.removeChild(existingScript)
        nostoSandbox?.parentNode?.removeChild(nostoSandbox)

        const urlPartial =
        `/script/shopify/market/nosto.js?merchant=${account}&market=${marketId}&locale=${language.toLowerCase()}`
        const script = createScriptElement(urlPartial)
        script.setAttribute("nosto-language", language)
        script.setAttribute("nosto-market-id", marketId)
        script.onload = scriptOnload
        document.body.appendChild(script)
      }
    }

  }, [clientScriptLoadedState, shopifyMarkets])

  return { clientScriptLoaded }
}