import { test, expect } from "vitest"
import * as imports from "../src/index"

test("module structure is stable", () => {
  expect(Object.keys(imports).sort()).toEqual([
    "Nosto404",
    "NostoCategory",
    "NostoCheckout",
    "NostoContext",
    "NostoHome",
    "NostoOrder",
    "NostoOther",
    "NostoPlacement",
    "NostoProduct",
    "NostoProvider",
    "NostoSearch",
    "NostoSession",
    "useNosto404",
    "useNostoCategory",
    "useNostoCheckout",
    "useNostoContext",
    "useNostoHome",
    "useNostoOrder",
    "useNostoOther",
    "useNostoProduct",
    "useNostoSearch",
    "useNostoSession",
    "usePersonalization"
  ])
})
