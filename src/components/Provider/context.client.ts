import { createContext, useContext } from "react";

interface NostoInterface {
  accountData: {
  account: string,
  setAccount: React.Dispatch<React.SetStateAction<string>>
  },
  currentVariationData: {  
    currentVariation: string,
    setCurrentVariation: React.Dispatch<React.SetStateAction<string>>
  },
  countryData: {
    country: string,
    setCountry: React.Dispatch<React.SetStateAction<string>>
  },
  readyFlag: {
    ready: boolean,
    setReady: React.Dispatch<React.SetStateAction<boolean>>
  }
}

/* tslint:disable:no-empty */
const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  accountData: {
    account: "",
    // @ts-ignore
    setAccount: (account) => {},
  },
  currentVariationData: {
    // @ts-ignore
    currentVariation: "",
    // @ts-ignore
    setCurrentVariation: (variation) => {},
  },
  countryData: {
    country: "",
    // @ts-ignore
    setCountry: (country) => {}
  },
  readyFlag: {
    ready: false,
    // @ts-ignore
    setReady: (flag) => {}
  }
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
