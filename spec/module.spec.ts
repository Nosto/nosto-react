import * as imports from "../src/index"

test("module structure is stable", () => {
  expect(Object.keys(imports)).toEqual([
    "NostoContext",
    "useNostoContext",
    "Nosto404",
    "NostoOther",
    "NostoCheckout",
    "NostoProduct",
    "NostoCategory",
    "NostoSearch",
    "NostoOrder",
    "NostoHome",
    "NostoPlacement",
    "NostoProvider",
    "NostoSession"
  ])    
})