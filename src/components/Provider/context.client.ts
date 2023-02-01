import { createContext, useContext } from "react";

export interface NostoInterface {
  account: string;
  clientScriptLoaded: boolean;
  currentVariation: string;
  renderFunction?: Function;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: undefined,
  currentVariation: "",
  renderFunction: undefined
});

/* tslint:enable:no-empty */
export function useNostoContext() {
  const context = useContext(NostoContext);

  if (!context) {
    throw new Error("No nosto context found");
  }

  return context;
}
