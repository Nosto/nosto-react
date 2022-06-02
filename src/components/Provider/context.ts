import { createContext } from "react";

export interface NostoInterface {
  account: string;
  currentVariation: string;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: undefined,
  // @ts-ignore
  currentVariation: undefined
});
/* tslint:enable:no-empty */
