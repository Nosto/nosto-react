import { createContext, useContext } from "react";

interface NostoInterface {
  account: string;
  setAccount: (account: string) => void;
  currentVariation: string;
  setCurrentVariation: (variation: string) => void;
  country: string;
  setCountry: (country: string) => void;
}

/* tslint:disable:no-empty */
const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: "",
  // @ts-ignore
  setAccount: (account) => {},
  // @ts-ignore
  currentVariation: "",
  // @ts-ignore
  setCurrentVariation: (variation) => {},
  country: "",
  setCountry: (country) => {}
});
/* tslint:enable:no-empty */

export default NostoContext;

export function useNostoContext() {
  const context = useContext(NostoContext);

  if (!context) {
    throw new Error('No nosto context found');
  }

  return context;
}
