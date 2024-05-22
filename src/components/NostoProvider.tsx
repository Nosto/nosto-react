import React, { useEffect, isValidElement, useState, useRef } from "react"
import { NostoContext } from "./context"
import { createRoot, Root } from "react-dom/client"
import { NostoClient, Recommendation } from "../types"

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
  children: React.ReactElement
  /**
   * Indicates if merchant uses multiple currencies
   */
  multiCurrency?: boolean
  /**
   * Recommendation component which holds nostoRecommendation object
   */
  recommendationComponent?: React.ReactElement<{
    nostoRecommendation: Recommendation
  }>
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
    shopifyMarkets= {},
  } = props
  const [clientScriptLoadedState, setClientScriptLoadedState] = React.useState(false)
  const clientScriptLoaded = React.useMemo(() => clientScriptLoadedState, [clientScriptLoadedState])

  // Pass currentVariation as empty string if multiCurrency is disabled
  const currentVariation = multiCurrency ? props.currentVariation : ""

  // Set responseMode for loading campaigns:
  const responseMode = isValidElement(recommendationComponent) ? "JSON_ORIGINAL" : "HTML"

  // RecommendationComponent for client-side rendering:
  function RecommendationComponentWrapper(props: { nostoRecommendation: Recommendation }) {
    return React.cloneElement(recommendationComponent!, {
      // eslint-disable-next-line react/prop-types
      nostoRecommendation: props.nostoRecommendation,
    })
  }

  // custom hook for rendering campaigns (CSR/SSR):
  const [pageType, setPageType] = useState("")
  function useRenderCampaigns(type: string = "") {
    const placementRefs = useRef<Record<string, Root>>({})
    useEffect(() => {
      if (pageType !== type) {
        setPageType(type)
      }
    }, [])

    const pageTypeUpdated = type === pageType

    function renderCampaigns(
      data: {
        recommendations: Record<string, Recommendation>
        campaigns: {
          recommendations: Record<string, Recommendation>
        }
      },
      api: NostoClient
    ) {
      if (responseMode == "HTML") {
        // inject content campaigns as usual:
        api.placements.injectCampaigns(data.recommendations)
      } else {
        // render recommendation component into placements:
        const recommendations = data.campaigns.recommendations
        for (const key in recommendations) {
          const recommendation = recommendations[key]
          const placementSelector = "#" + key
          const placement = () => document.querySelector(placementSelector)

          if (placement()) {
            if (!placementRefs.current[key]) placementRefs.current[key] = createRoot(placement()!)
            const root = placementRefs.current[key]!
            root.render(
              <RecommendationComponentWrapper
                nostoRecommendation={recommendation}
              ></RecommendationComponentWrapper>
            )
          }
        }
      }
    }
    return { renderCampaigns, pageTypeUpdated }
  }

  useEffect(() => {
    if (!window.nostojs) {
      window.nostojs = (cb: (api: NostoClient) => void) => {
        (window.nostojs.q = window.nostojs.q || []).push(cb)
      }
      window.nostojs(api => api.setAutoLoad(false))
    }

    if (!document.querySelectorAll("[nosto-client-script]").length && !shopifyMarkets) {
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
    if (!!shopifyMarkets) {
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
        recommendationComponent,
        useRenderCampaigns,
        pageType,
      }}
    >
      {children}
    </NostoContext.Provider>
  )
}
