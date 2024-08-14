import { Dispatch, SetStateAction } from "react"
import type { NostoClient } from "../types"
import type { NostoProviderProps } from "../components/NostoProvider"

type NostoScriptProps = {
  setClientScriptLoadedState: Dispatch<SetStateAction<boolean>>
  clientScriptLoadedState?: boolean
} & Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets" | "loadScript">

export function loadNostoClientScripts({host, account, shopifyMarkets, loadScript, setClientScriptLoadedState}: NostoScriptProps) {
    if (!window.nostojs) {
        window.nostojs = (cb: (api: NostoClient) => void) => {
          (window.nostojs.q = window.nostojs.q || []).push(cb)
        }
        window.nostojs(api => api.setAutoLoad(false))
      }
  
      if (!isNostoLoaded() && !shopifyMarkets && loadScript) {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "//" + (host || "connect.nosto.com") + "/include/" + account
        script.async = true
        script.setAttribute("nosto-client-script", "")
  
        script.onload = () => {
          if (typeof jest !== "undefined") {
            window.nosto?.reload({
              site: "localhost",
            })
          }
          setClientScriptLoadedState(true)
        }
        document.body.appendChild(script)
      }
}

export function loadShopifyMarketsScripts({host, account, shopifyMarkets, loadScript, setClientScriptLoadedState, clientScriptLoadedState}: NostoScriptProps) {
  if (shopifyMarkets && loadScript) {
      const existingScript = document.querySelector("[nosto-client-script]")
      const nostoSandbox = document.querySelector("#nosto-sandbox")

      if (
        !existingScript ||
        existingScript?.getAttribute("nosto-language") !== shopifyMarkets?.language ||
        existingScript?.getAttribute("nosto-market-id") !== shopifyMarkets?.marketId
      ) {
        if (clientScriptLoadedState) {
          setClientScriptLoadedState(false)
        }

        existingScript?.parentNode?.removeChild(existingScript)
        nostoSandbox?.parentNode?.removeChild(nostoSandbox)

        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src =
          "//" +
          (host || "connect.nosto.com") +
          `/script/shopify/market/nosto.js?merchant=${account}&market=${
            shopifyMarkets.marketId || ""
          }&locale=${shopifyMarkets?.language?.toLowerCase() || ""}`
        script.async = true
        script.setAttribute("nosto-client-script", "")
        script.setAttribute("nosto-language", shopifyMarkets?.language || "")
        script.setAttribute("nosto-market-id", String(shopifyMarkets?.marketId))

        script.onload = () => {
          if (typeof jest !== "undefined") {
            window.nosto?.reload({
              site: "localhost",
            })
          }
          setClientScriptLoadedState(true)
        }
        document.body.appendChild(script)
      }
    }
}


export function isNostoLoaded() {
  return typeof window.nosto !== "undefined"    
}

