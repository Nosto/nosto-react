import { isValidElement } from "react"
import type { ReactElement } from "react"
import { NostoContext, RecommendationComponent } from "../context"
import { useClientScriptLoad } from "../hooks"

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
  children: ReactElement | ReactElement[]
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
  /**
   * Load nosto script (should be false if loading the script outside of nosto-react)
   */
  loadScript?: boolean
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
    loadScript = true,
    host,
    children,
    recommendationComponent,
    shopifyMarkets
  } = props

  // Pass currentVariation as empty string if multiCurrency is disabled
  const currentVariation = multiCurrency ? props.currentVariation : ""

  // Set responseMode for loading campaigns:
  const responseMode = isValidElement(recommendationComponent) ? "JSON_ORIGINAL" : "HTML"

  const { clientScriptLoaded } = useClientScriptLoad({host, account, shopifyMarkets, loadScript})

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
