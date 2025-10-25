import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Components
 */
export type NostoSearchProps = {
  query: string
  placements?: string[]
}

/**
 * You can personalise your search pages by using the useNostoSearch hook.
 *
 * @example Basic search page usage
 * ```tsx
 * import { useNostoSearch } from '@nosto/nosto-react'
 * 
 * function SearchPage({ searchQuery }: { searchQuery: string }) {
 *   useNostoSearch({
 *     query: searchQuery,
 *     placements: ['searchpage-nosto-1', 'searchpage-no-results']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Search Results for "{searchQuery}"</h1>
 *       {/\* Search results here *\/}
 *       <div id="searchpage-nosto-1" />
 *       <div id="searchpage-no-results" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Search with dynamic query updates
 * ```tsx
 * import { useNostoSearch } from '@nosto/nosto-react'
 * import { useState } from 'react'
 * 
 * function SearchPageWithFilters() {
 *   const [query, setQuery] = useState('')
 * 
 *   useNostoSearch({
 *     query: query,
 *     placements: ['search-recommendations', 'search-trending']
 *   })
 * 
 *   return (
 *     <div>
 *       <input 
 *         type="text" 
 *         value={query}
 *         onChange={(e) => setQuery(e.target.value)}
 *         placeholder="Search products..."
 *       />
 *       <div id="search-recommendations" />
 *       <div id="search-trending" />
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoSearch({ query, placements }: NostoSearchProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewSearch(query)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [query]
  )
}
