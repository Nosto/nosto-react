import { test, expect } from "vitest"
import * as imports from "../src/index"

test("module structure is stable", () => {
  expect(Object.keys(imports)).toEqual([    
    "Nosto404",
    "useNosto404",
    "NostoOther",
    "useNostoOther",
    "NostoCheckout",
    "useNostoCheckout",
    "NostoProduct",
    "useNostoProduct",
    "NostoCategory",
    "useNostoCategory",
    "NostoSearch",
    "useNostoSearch",
    "NostoOrder",
    "useNostoOrder",
    "NostoHome",
    "useNostoHome",
    "NostoPlacement",
    "NostoProvider",
    "NostoSession",
    "useNostoSession",
    "NostoContext",
    "useNostoContext"
  ])    
})