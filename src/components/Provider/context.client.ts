import { createContext, useContext } from "react";
import { Recommendation } from "../../types";

export interface NostoInterface {
  account: string;
  clientScriptLoaded: boolean;
  currentVariation: string;
  renderFunction?: Function;
  responseMode: string;
  recommendationComponent?: React.ReactElement<{
    nostoRecommendation: Recommendation;
  }>;
  useRenderCampaigns: Function;
  pageType: string;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: undefined,
  currentVariation: "",
  renderFunction: undefined,
});

/* tslint:enable:no-empty */

/**
A hook that allows you to access the NostoContext and retrieve Nosto-related data from it in React components.
 */
export function useNostoContext() {
  const context = useContext(NostoContext);

  if (!context) {
    throw new Error("No nosto context found");
  }

  return context;
}
