import { createContext } from "react";

export interface NostoInterface {
  account: string;
}

/* tslint:disable:no-empty */
// @ts-ignore
export const NostoContext = createContext<NostoInterface>({ account: undefined });
/* tslint:enable:no-empty */
