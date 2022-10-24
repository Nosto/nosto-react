import { createContext, useContext } from "react";

export interface NostoInterface {
  account: string;
  clientScriptLoaded: boolean;
  currentVariation: string;
}
export interface NostoSearchInterface {
  id: string;
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

export const NostoSearchContext = createContext<NostoSearchInterface>({
  // @ts-ignore
  account: undefined,
  currentVariation: "",
  id: "",
});

/* tslint:enable:no-empty */
export function useNostoContext() {
  const context = useContext(NostoContext);

  if (!context) {
    throw new Error("No nosto context found");
  }

  return context;
}

/* tslint:enable:no-empty */
export function useNostoSearchContext() {
  const context = useContext(NostoSearchContext);

  if (!context) {
    throw new Error("No nosto search context found");
  }

  return context;
}
