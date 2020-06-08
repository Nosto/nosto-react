import { createContext } from "react";

export interface NostoInterface {
  account: string;
}

/* tslint:disable:no-empty */
export const NostoContext = createContext<NostoInterface>({
  // @ts-ignore
  account: undefined
});
/* tslint:enable:no-empty */
