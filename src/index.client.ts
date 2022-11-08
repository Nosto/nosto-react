import { createContext } from "react";
import { SearchConfig } from "./types";

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    nostojs: any;
    nosto: any;
    nostoTemplatesFileResolver?: (path: string) => string;
    ga: any;
    _gaq: {
        push: (
            event:
                | [
                      string,
                      string,
                      string,
                      string,
                      string | undefined,
                      boolean | undefined
                  ]
                | [string, string, string, string, string]
                | [string, string, string, string]
                | [string, string, string]
                | [string, string]
        ) => void
    };
  }
}

export const defaultConfig: SearchConfig = {
  contentCssSelector: '',
  inputCssSelector: '',
  formCssSelector: '',
  merchant: '',
  apiKey: '',
  searchApiUrl: '',
  autocompleteMinLength: 2,
  serpUrlMapping:  {
      name: 'name',
      query: 'query',
      segments: 'segments',
      customRules: 'customRules',
      explain: 'explain',
      time: 'time',
      products: 'products',
      keywords: 'keywords'
  }
}

export const ConfigContext = createContext(defaultConfig)

export * from "./types";
// noinspection JSUnusedGlobalSymbols
export { default as Nosto404 } from "./components/Fohofo/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoOther } from "./components/Other/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoCheckout } from "./components/Checkout/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoProduct } from "./components/Product/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoCategory } from "./components/Category/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoSearch } from "./components/Search/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoOrder } from "./components/Order/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoHome } from "./components/Home/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoPlacement } from "./components/Placement/index.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoProvider } from "./components/Provider/index.client";
// noinspection JSUnusedGlobalSymbols
export {
  NostoContext,
  useNostoContext,
} from "./components/Provider/context.client";
// noinspection JSUnusedGlobalSymbols
export { default as NostoSession } from "./components/Session/index.client";
//
