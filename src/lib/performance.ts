/**
 * Performance & Memoization Utilities
 * Ottimizza render e caching
 */

/**
 * Debounce per funzioni ad alto costo
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle per scroll/resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Semplice cache in memoria con TTL
 */
export class MemoryCache<T> {
  private cache = new Map<string, { value: T; expiresAt: number }>()

  set(key: string, value: T, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    })
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return undefined
    }

    return item.value
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    return this.get(key) !== undefined
  }
}

/**
 * Deep equality check per memo
 */
export const shallowEqual = <T extends Record<string, any>>(
  a: T,
  b: T
): boolean => {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  return keysA.every((key) => a[key] === b[key])
}

/**
 * Batch updates per ridurre re-render
 */
export const batchUpdates = async <T>(
  updates: Array<() => Promise<T>>
): Promise<T[]> => {
  return Promise.all(updates.map((update) => update()))
}

/**
 * Memoize selector function (simile a useSelector in Redux)
 */
export const createSelector = <TInput, TOutput>(
  selector: (input: TInput) => TOutput
): ((input: TInput) => TOutput) => {
  let lastInput: TInput | undefined
  let lastOutput: TOutput | undefined

  return (input: TInput) => {
    if (lastInput !== input) {
      lastInput = input
      lastOutput = selector(input)
    }
    return lastOutput!
  }
}
