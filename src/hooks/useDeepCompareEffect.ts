import { useEffect, useRef, useMemo, type EffectCallback, type DependencyList } from "react"
import { deepCompare } from "../utils/compare"

/**
 * Similar to useEffect but performs deep comparison of dependencies instead of shallow comparison.
 * Useful when dependencies are objects or arrays that may be recreated on each render.
 * 
 * @example
 * ```tsx
 * import { useDeepCompareEffect } from '@nosto/nosto-react'
 * 
 * function MyComponent({ user }: { user: { id: string, preferences: string[] } }) {
 *   useDeepCompareEffect(() => {
 *     console.log('User preferences changed:', user.preferences)
 *     // This will only run when user object actually changes,
 *     // not when it's recreated with same values
 *   }, [user])
 * 
 *   return <div>User: {user.id}</div>
 * }
 * ```
 * 
 * @example Comparing arrays and objects
 * ```tsx
 * import { useDeepCompareEffect } from '@nosto/nosto-react'
 * 
 * function ProductList({ filters, sortOptions }: { 
 *   filters: { category: string, price: { min: number, max: number } }
 *   sortOptions: string[]
 * }) {
 *   useDeepCompareEffect(() => {
 *     // This effect will only run when filters or sortOptions actually change
 *     fetchProducts(filters, sortOptions)
 *   }, [filters, sortOptions])
 * 
 *   return <div>Product list</div>
 * }
 * ```
 * 
 * @param callback The effect callback function
 * @param dependencies Array of dependencies to deep compare
 * 
 * @group Hooks
 */
export function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList) {
  return useEffect(callback, useDeepCompareMemoize(dependencies))
}

function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value)
  const signalRef = useRef(0)

  if (!deepCompare(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return useMemo(() => ref.current, [signalRef.current])
}
