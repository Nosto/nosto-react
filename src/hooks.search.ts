import { createContext, useContext } from "react"
import { updateSearch, newSearch, toggleProductFilter, replaceFilter } from "./actions.search"
import { NostoSearchContext } from "./components/Provider/context.client"
import { SearchStore } from "./components/Store/index.client"
import { ConfigContext } from "./index.client"
import { SearchState, SearchConfig, SearchQuery, AnyFilterValue } from "./types"
import { range } from "./utils/search"

export const StoreContext = createContext<SearchStore>(new SearchStore({}))
/**
 * Preact hook that import current state to the component.
 *
 * **Should always be at the top of the component!**
 *
 * @example
 * ```jsx
 * import { useAppState } from '@nosto/preact'
 *
 * export default () => {
 *     const state = useAppState()
 *
 *     return <div>
 *         Searching for {state.query.query}
 *     </div>
 * }
 * ```
 */
export function useAppState(): SearchState {
    return useContext(NostoSearchContext)
}

/**
 * Preact hook that import current config to the component.
 *
 * **Should always be at the top of the component!**
 *
 * @example
 * ```jsx
 * import { useActions, useAppState } from '@nosto/preact'
 *
 * export default () => {
 *     const config = useAppState()
 *
 *     return <div>
 *         Default search page path {config.serpPath}
 *     </div>
 * }
 * ```
 */
export function useConfig(): SearchConfig {
    return useContext(ConfigContext)
}

export function useStore(): SearchStore {
    return useContext(StoreContext)
}

/**
 * Preact hook that import current actions to the component.
 * Actions should be used to modify state, making new searches, etc.
 *
 * **Should always be at the top of the component!**
 *
 * @example
 * ```jsx
 * import { useActions } from '@nosto/preact'
 *
 * export default () => {
 *     const actions = useActions()
 *
 *     return <button onClick={() => {
 *         newSearch({
 *             query: {
 *                 query: "samsung"
 *             }
 *         })
 *     }}>
 *         Search for "samsung"
 *     </div>
 * }
 * ```
 */
export function useActions(): {
    updateSearch(input: SearchQuery): void
    newSearch(input: SearchQuery): void
    toggleProductFilter(
        field: string,
        value: AnyFilterValue,
        active: boolean
    ): void
    replaceFilter(field: string, value: AnyFilterValue | undefined): void
} {
    const config = useConfig()
    const store = useStore()

    return {
        updateSearch(input) {
            updateSearch({ config, store }, input)
        },
        newSearch(input) {
            window.nostojs((api: any) => {
                api.search(input)
            })
            newSearch({ config, store }, input)
        },
        toggleProductFilter(field, value, active) {
            toggleProductFilter({ config, store }, field, value, active)
        },
        replaceFilter(field, value) {
            replaceFilter({ config, store }, field, value)
        },
    }
}

/**
 * Preact hook that import pagination state to the component.
 *
 * **Should always be at the top of the component!**
 *
 * @example
 * ```jsx
 * import { usePagination } from '@nosto/preact'
 *
 * export default () => {
 *     const pagination = usePagination()
 *
 *     return pagination.pages.map((page) => <li>
 *         {page.current ? <span>{page.page}</span> : <a>
 *             {page.page}
 *         </a>}
 *     </li>)
 * }
 * ```
 */
export function usePagination(options?: { width?: number }): {
    pages: {
        from: number
        page: number
        current: boolean
    }[]
    totalPages: number
    resultsFrom: number
    resultsTo: number
    current: {
        from: number
        page: number
        current: boolean
    }
    prev:
        | {
              from: number
              page: number
              current: boolean
          }
        | undefined
    first:
        | {
              from: number
              page: number
              current: boolean
          }
        | undefined
    next:
        | {
              from: number
              page: number
              current: boolean
          }
        | undefined
    last:
        | {
              from: number
              page: number
              current: boolean
          }
        | undefined
} {
    const {
        query,
        response: { products },
    } = useAppState()

    const from = query.products?.from === undefined ? 0 : query.products?.from
    const width = options?.width === undefined ? Infinity : options.width

    const pagesToShow = Math.max(Math.floor(width - 1) / 2, 1)
    const currentPage = products
        ? products.size > 0
            ? Math.floor(from / products.size) + 1
            : 1
        : 1
    const totalPages = products
        ? products.size > 0
            ? Math.ceil(products.total / products.size)
            : 0
        : 0

    const showPage = (page: number) =>
        page >= currentPage - pagesToShow && page <= currentPage + pagesToShow

    return {
        totalPages,
        resultsFrom: from + 1,
        resultsTo: products
            ? Math.min(from + products.total, products.total)
            : 0,
        current: {
            from,
            page: currentPage,
            current: true,
        },
        prev:
            currentPage > 1 && products
                ? {
                      from: (currentPage - 2) * products.size,
                      page: currentPage - 1,
                      current: false,
                  }
                : undefined,
        next:
            currentPage < totalPages && products
                ? {
                      from: currentPage * products.size,
                      page: currentPage + 1,
                      current: false,
                  }
                : undefined,
        first:
            pagesToShow === Infinity || currentPage - pagesToShow - 1 > 1
                ? {
                      from: 0,
                      page: 1,
                      current: false,
                  }
                : undefined,
        last:
            (pagesToShow === Infinity ||
                currentPage + pagesToShow + 1 < totalPages) &&
            products
                ? {
                      from: (totalPages - 1) * products.size,
                      page: totalPages,
                      current: false,
                  }
                : undefined,
        pages: products
            ? range(1, totalPages + 1)
                  .filter(showPage)
                  .map((page) => ({
                      page,
                      from: (page - 1) * products.size,
                      current: page === currentPage,
                  }))
            : [],
    }
}
