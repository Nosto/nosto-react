import { useContext } from "react"
import { NostoContext, NostoContextType } from "../context"

/**
 * A hook that allows you to access the NostoContext and retrieve Nosto-related data from it in React components.
 *
 * @group Essential Functions
 */
export function useNostoContext(): NostoContextType {
    const context = useContext(NostoContext)
  
    if (!context) {
      throw new Error("No nosto context found")
    }
  
    return context
  }
  