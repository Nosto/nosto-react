export function flatMap<T, U>(value: T[], callback: (value: T) => U[]): U[] {
    return Array.prototype.concat.apply([], value.map(callback))
}

export function isPlainObject<T = Record<keyof any, unknown>>(
    value: unknown
): value is T {
    const isObject = (v: unknown): v is object =>
        String(v) === '[object Object]'

    if (!isObject(value)) return false

    const constructor = value.constructor
    if (constructor === undefined) return true

    const prototype = constructor.prototype
    if (!isObject(prototype)) return false

    if (!prototype.hasOwnProperty('isPrototypeOf')) {
        return false
    }

    return true
}

export function merge<T>(
    target: unknown,
    source: unknown,
    options?: {
        skipNulls: false
        arrayPolicy:
            | 'overwrite'
            | 'merge'
            | ((target: unknown, source: unknown) => unknown)
    }
): T {
    const { skipNulls = false, arrayPolicy = 'overwrite' } = options ?? {}

    if (isPlainObject(target) && isPlainObject(source)) {
        return Object.entries(source).reduce(
            (prev, [key, value]) => {
                prev[key] = merge(prev[key], value)
                return prev
            },
            { ...target }
        ) as any as T
    }

    if (target instanceof Array && source instanceof Array) {
        if (arrayPolicy === 'merge') {
            return target.concat(source) as any as T
        } else if (typeof arrayPolicy === 'function') {
            return arrayPolicy(target, source) as any as T
        } else {
            return source as any as T
        }
    }

    if (skipNulls && source == null) {
        return target as T
    }

    return source as T
}

export function range(start: number, end: number): number[] {
    const diff = end - start
    if (!isNaN(diff) && diff > 0) {
        return new Array(end - start).fill(undefined).map((_, i) => i + start)
    }
    return []
}

export function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
    }

    if (a instanceof Array && b instanceof Array) {
        if (a.length !== b.length) {
            return false
        }

        return a.every((v, i) => isEqual(v, b[i]))
    }

    if (isPlainObject(a) && isPlainObject(b)) {
        const entriesA = Object.entries(a)

        if (entriesA.length !== Object.keys(b).length) {
            return false
        }
        return entriesA.every(([k, v]) => isEqual(v, b[k]))
    }

    return false
}
export function ensureArray<T>(value: T | readonly T[]): ReadonlyArray<T> {
    return value instanceof Array ? value : [value]
}

export function parseNumber<T>(value: T): number | undefined {
    if (typeof value === 'number') {
        return value
    }
    if (typeof value !== 'string') {
        return undefined
    }
    const parsed = parseFloat(value)
    return !isNaN(parsed) ? parsed : undefined
}

export function unbind(selector: string) {
    setTimeout(() => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
            var newElement = el.cloneNode(true)
            el?.parentNode?.replaceChild(newElement, el)
        })
    }, 3000)
}


export function resolveStaticFile(path: string): string {
    const relativePath = path[0] === '/' ? path.slice(1) : path

    if (window.nostoTemplatesFileResolver) {
        return window.nostoTemplatesFileResolver(relativePath)
    }

    return new URL(
        relativePath,
        (document.currentScript as HTMLScriptElement).src
    ).toString()
}
