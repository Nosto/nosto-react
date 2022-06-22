import { createContext, useContext } from "react";

interface NostoInterface {
  account: string,
  currentVariationData: {  
    currentVariation: string,
    setCurrentVariation: React.Dispatch<React.SetStateAction<string>>
  },
  countryData: {
    country: string,
    setCountry: React.Dispatch<React.SetStateAction<string>>
  },
  countryLoadComplete: {
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
  }
}

/* tslint:disable:no-empty */
const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
    account: "",
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
  countryLoadComplete: {
    value: false,
    // @ts-ignore
    setValue: (flag) => {}
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
