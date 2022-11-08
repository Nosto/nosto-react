import { SearchState } from "../../types"
import { isEqual, merge } from "../../utils/search"

export const defaultSearchState = {
    id: '',
    account: '',
    loading: true,
    query: {
        query: '',
    },
    response: {
        query: '',
    },
    initialized: false,
  }

  
  export class SearchStore {
    protected changeCallbacks: Array<(state: SearchState) => void> = []
    protected state: SearchState
  
    constructor(protected initialState: Partial<SearchState>) {
        this.state = initialState
            ? merge(defaultSearchState, initialState)
            : defaultSearchState
    }
  
    setState(state: SearchState | ((prevState: SearchState) => SearchState)): void {
        if (typeof state === 'function') {
            this.state = state(this.state)
        } else {
            this.state = state
        }
  
        this.changeCallbacks.forEach((callback) => {
            callback(this.state)
        })
    }
  
    updateState(state: Partial<SearchState>): void {
        this.setState((s) => merge(s, state))
    }
  
    getState(): SearchState {
        return this.state
    }
  
    getInitialState(): Partial<SearchState> {
        return this.initialState ?? {}
    }
  
    onChange<T>(selector: (state: SearchState) => T, callback: (piece: T) => void) {
        let lastValue: T | undefined = undefined
        this.changeCallbacks.push((s) => {
            const piece = selector(s)
            if (!isEqual(piece, lastValue)) {
                lastValue = piece
                callback(piece)
            }
        })
    }
  }