import React, { useEffect, isValidElement } from "react"
import { NostoContext, RecommendationComponent } from "../context"
import { NostoClient } from "../types"
import { isNostoLoaded } from "./helpers"

/**
 * @group Components
 */
export interface NostoProviderProps {
  /**
   * Indicates merchant id
   */
  account: string
  /**
   * Indicates currency
   */
  currentVariation?: string
  /**
   * Indicates an url of a server
   */
  host?: string
  /**
   * children
   */
  children: React.ReactElement | React.ReactElement[]
  /**
   * Indicates if merchant uses multiple currencies
   */
  multiCurrency?: boolean
  /**
   * Recommendation component which holds nostoRecommendation object
   */
  recommendationComponent?: RecommendationComponent
  /**
   * Enables Shopify markets with language and market id
   */
  shopifyMarkets?: {
    language?: string
    marketId?: string | number
  }
}

/**
 * This widget is what we call the Nosto root widget, which is responsible for adding the actual Nosto script and the JS API stub.
 * This widget wraps all other React Nosto widgets.
 *
 * ```
 * <NostoProvider account="your-nosto-account-id" recommendationComponent={<NostoSlot />}>
 *   <App />
 * </NostoProvider>
 * ```
 *
 * **Note:** the component also accepts a prop to configure the host `host="connect.nosto.com"`.
 * In advanced use-cases, the need to configure the host may surface.
 *
 * In order to implement client-side rendering, the requires a designated component to render the recommendations provided by Nosto.
 * This component should be capable of processing the JSON response received from our backend.
 * Notice the `recommendationComponent` prop passed to `<NostoProvider>` above.
 *
 * Learn more [here](https://github.com/Nosto/shopify-hydrogen/blob/main/README.md#client-side-rendering-for-recommendations) and see a [live example](https://github.com/Nosto/shopify-hydrogen-demo) on our demo store.
 *
 * @group Components
 */
export default function NostoProvider(props: NostoProviderProps) {
  const {
    account,
    multiCurrency = false,
    host,
    children,
    recommendationComponent,
    shopifyMarkets
  } = props
  const [clientScriptLoadedState, setClientScriptLoadedState] = React.useState(false)
  const clientScriptLoaded = React.useMemo(() => clientScriptLoadedState, [clientScriptLoadedState])

  // Pass currentVariation as empty string if multiCurrency is disabled
  const currentVariation = multiCurrency ? props.currentVariation : ""

  // Set responseMode for loading campaigns:
  const responseMode = isValidElement(recommendationComponent) ? "JSON_ORIGINAL" : "HTML"

  useEffect(() => {
    if (!window.nostojs) {
      window.nostojs = (cb: (api: NostoClient) => void) => {
        (window.nostojs.q = window.nostojs.q || []).push(cb)
      }
      window.nostojs(api => api.setAutoLoad(false))
    }

    if (!isNostoLoaded() && !shopifyMarkets) {
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

    // Enable Shopify markets functionality:
    if (shopifyMarkets) {
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
  }, [clientScriptLoadedState, shopifyMarkets])

  return (
    <NostoContext.Provider
      value={{
        account,
        clientScriptLoaded,
        currentVariation,
        responseMode,
        recommendationComponent
      }}
    >
      {children}
    </NostoContext.Provider>
  )
}
