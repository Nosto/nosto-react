import { AnyFilter, AnyFilterValue, SearchConfig, SearchQuery } from "./types";
import { isEqual, merge } from "./utils/search";
import { SearchStore } from "./components/Store/index.client";


export async function updateSearch(
    context: { store: SearchStore; config: SearchConfig },
    query: SearchQuery
): Promise<void> {
    sessionStorage.setItem('nostoSearch:isOrganic', 'true')

    await newSearch(
        context,
        merge<SearchQuery>(
            merge<SearchQuery>(context.store.getState().query, {
                products: {
                    from: 0,
                },
            }),
            query
        )
    )
}

export async function newSearch(
    context: { store: SearchStore; config: SearchConfig },
    query: SearchQuery
): Promise<void> {
    const fullQuery = merge<SearchQuery>(
        context.store.getInitialState().query,
        query
    )

    context.store.setState((s) => ({
        ...s,
        query: fullQuery,
        loading: true,
        initialized: true,
    }))

    window.nostojs((api: any) => {
        const search = api.search({
            merchant: context.config.merchant,
            searchApiUrl: context.config.searchApiUrl,
        },
        fullQuery)

        context.store.setState((s) => ({
            ...s,
            search,
            query: fullQuery,
            loading: false,
        }))
    })
}

export async function toggleProductFilter(
    context: { store: SearchStore; config: SearchConfig },
    field: string,
    value: AnyFilterValue,
    active: boolean
): Promise<void> {
    const filter = context.store.getState().query.products?.filter

    const activeFilter = filter?.find((v) => {
        return (
            'field' in v &&
            'value' in v &&
            v.value instanceof Array &&
            v.filterFacets !== true &&
            v.field === field
        )
    })

    const newFilter: AnyFilter | undefined =
        activeFilter && 'value' in activeFilter
            ? {
                  ...activeFilter,
                  value: [
                      ...activeFilter.value.filter((v) => !isEqual(v, value)),
                      ...(active ? [value] : []),
                  ],
              }
            : active
            ? {
                  field,
                  value: [value],
              }
            : undefined

    await updateSearch(context, {
        products: {
            filter: [
                ...(filter?.filter((v) => v !== activeFilter) ?? []),
                ...(newFilter && newFilter.value.length ? [newFilter] : []),
            ],
        },
    })
}


export async function replaceFilter(
    context: { store: SearchStore; config: SearchConfig },
    field: string,
    value: AnyFilterValue | undefined
): Promise<void> {
    const filter = context.store.getState().query.products?.filter

    await updateSearch(context, {
        products: {
            filter: [
                ...(filter?.filter(
                    (v) => !('field' in v && v.field === field)
                ) ?? []),
                ...(value !== undefined
                    ? [
                          {
                              field,
                              value: [value],
                          },
                      ]
                    : []),
            ],
        },
    })
}