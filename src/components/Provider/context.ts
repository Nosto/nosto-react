import { createContext } from "react";

/* tslint:disable:no-empty */
export const NostoContext = createContext({
  // @ts-ignore
  account: "",
  // @ts-ignore
  setAccount: (account) => {},
  // @ts-ignore
  currentVariation: "",
  // @ts-ignore
  setCurrentVariation: (variation) => {}
});
/* tslint:enable:no-empty */
