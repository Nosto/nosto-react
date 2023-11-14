export function isPlainObject<T = Record<keyof any, unknown>>(
  value: unknown
): value is T {
  const isObject = (v: unknown): v is object => String(v) === "[object Object]"

  if (!isObject(value)) return false

  const constructor = value.constructor
  if (constructor === undefined) return true

  const prototype = constructor.prototype
  if (!isObject(prototype)) return false

  // Checks if it is not a class
  if (!prototype.hasOwnProperty("isPrototypeOf")) {
    return false
  }

  return true
}
