import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCategoryProps = {
  category: string
  placements?: string[]
}

/**
 * You can personalise your category and collection pages by using the useNostoCategory hook.
 *
 * @example Basic category page usage
 * ```tsx
 * import { useNostoCategory } from '@nosto/nosto-react'
 * 
 * function CategoryPage({ categoryName }: { categoryName: string }) {
 *   useNostoCategory({
 *     category: categoryName,
 *     placements: ['categorypage-nosto-1', 'categorypage-nosto-2']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Category: {categoryName}</h1>
 *       <div id="categorypage-nosto-1" />
 *       <div id="categorypage-nosto-2" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Collection page with custom placements
 * ```tsx
 * import { useNostoCategory } from '@nosto/nosto-react'
 * 
 * function CollectionPage({ collection }: { collection: { name: string, id: string } }) {
 *   useNostoCategory({
 *     category: `collection-${collection.id}`,
 *     placements: ['collection-banner', 'collection-recommendations']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>{collection.name} Collection</h1>
 *       <div id="collection-banner" />
 *       {/\* Product grid here *\/}
 *       <div id="collection-recommendations" />
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoCategory({ category, placements }: NostoCategoryProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewCategory(category)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [category]
  )
}
