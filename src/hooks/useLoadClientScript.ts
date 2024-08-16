import { useState, useEffect } from "react"
import { isNostoLoaded } from "../components/helpers"
import type { NostoClient } from "../types"
import type { NostoProviderProps } from "../components/NostoProvider"

type NostoScriptProps = Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets" | "loadScript">

export function useLoadClientScript(props: NostoScriptProps) {
  const { host = "connect.nosto.com", account, shopifyMarkets, loadScript = true } = props
  const [clientScriptLoaded, setClientScriptLoaded] = useState(false)

  function scriptOnload() {
    // Override for production scripts to work in unit tests
    if ("nostoReactTest" in window) {
      window.nosto?.reload({
        site: "localhost"
      })
    }
    setClientScriptLoaded(true)
  }

  // Create and append script element
  function createScriptElement(urlPartial: string, language?: string, marketId?: string) {
    const scriptEl = document.createElement("script")
    scriptEl.type = "text/javascript"
    scriptEl.src = `//${host}${urlPartial}`
    scriptEl.async = true
    scriptEl.setAttribute("nosto-client-script", "")
    scriptEl.onload = scriptOnload
    if (language && marketId) {
      scriptEl.setAttribute("nosto-language", language)
      scriptEl.setAttribute("nosto-market-id", marketId)
    }
    document.body.appendChild(scriptEl)
  }

  function prepareShopifyMarketsScript() {
    const existingScript = document.querySelector("[nosto-client-script]")

    const marketId = String(shopifyMarkets?.marketId || "")
    const language = shopifyMarkets?.language || ""

    const attributeMismatch =
      existingScript?.getAttribute("nosto-language") !== language ||
      existingScript?.getAttribute("nosto-market-id") !== marketId

    if (!existingScript || attributeMismatch) {
      if (clientScriptLoaded) {
        setClientScriptLoaded(false)
      }

      const nostoSandbox = document.querySelector("#nosto-sandbox")

      existingScript?.parentNode?.removeChild(existingScript)
      nostoSandbox?.parentNode?.removeChild(nostoSandbox)

      const urlPartial =
        `/script/shopify/market/nosto.js?merchant=${account}&market=${marketId}&locale=${language.toLowerCase()}`
      createScriptElement(urlPartial, language, marketId)
    }
  }

  useEffect(() => {
    // Load Nosto API stub
    if (!window.nostojs) {
      window.nostojs = (cb: (api: NostoClient) => void) => {
        (window.nostojs.q = window.nostojs.q || []).push(cb)
      }
      window.nostojs(api => api.setAutoLoad(false))
    }

    if (!loadScript) {
      window.nosto ? scriptOnload() : window.nostojs(scriptOnload)
      return
    }

    // Load Nosto client script if not already loaded externally
    if (!isNostoLoaded() && !shopifyMarkets) {
      const urlPartial = `/include/${account}`
      createScriptElement(urlPartial)
    }

    // Load Shopify Markets scripts
    if (shopifyMarkets) {
      prepareShopifyMarketsScript()
    }
  }, [shopifyMarkets?.marketId, shopifyMarkets?.language])

  return { clientScriptLoaded }
}