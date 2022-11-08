import { createContext, useContext, useEffect, useState } from "react";
import { SearchState } from "../../types";
import { isEqual, merge } from "../../utils/search";
import { defaultSearchState, SearchStore } from "../Store/index.client";
export interface NostoInterface {
  account: string;
  clientScriptLoaded: boolean;
  currentVariation: string;
}
/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: undefined,
  currentVariation: "",
});

/* tslint:enable:no-empty */
export function useNostoContext() {
  const context = useContext(NostoContext);

  if (!context) {
    throw new Error("No nosto context found");
  }

  return context;
}

export const NostoSearchContext = createContext<SearchState>(defaultSearchState);

/* tslint:enable:no-empty */
export function useNostoSearchContext({
  store,
}: {
  store: SearchStore
}) {
  const context = useContext(NostoSearchContext);

  if (!context) {
    throw new Error("No nosto search context found");
  }

  return context;
}
