/**
 * LodashUtils – static equivalents of every lodash helper used in this
 * codebase, implemented with plain JavaScript / TypeScript so that no
 * lodash runtime dependency is required.
 */
export class LodashUtils {
  /**
   * Creates an array of values by running each element of `collection`
   * through `iteratee`.
   */
  static map<T, R>(
    collection: T[],
    iteratee: (value: T, index: number, arr: T[]) => R
  ): R[] {
    return collection.map(iteratee);
  }

  /**
   * Iterates over `collection` and invokes `iteratee` for each element.
   */
  static each<T>(
    collection: T[],
    iteratee: (value: T, index: number, arr: T[]) => void
  ): void {
    collection.forEach(iteratee);
  }

  /**
   * Iterates over an **array** from right to left and returns the first
   * element for which `predicate` returns `true`.
   */
  static findLast<T>(
    collection: T[],
    predicate: (value: T) => boolean
  ): T | undefined;
  /**
   * Iterates over the **values** of an object from right to left (insertion
   * order) and returns the first value for which `predicate` returns `true`.
   */
  static findLast<T>(
    collection: Record<string, T>,
    predicate: (value: T, key: string) => boolean
  ): T | undefined;
  static findLast<T>(
    collection: T[] | Record<string, T>,
    predicate: ((value: T) => boolean) | ((value: T, key: string) => boolean)
  ): T | undefined {
    if (Array.isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        if ((predicate as (value: T) => boolean)(collection[i])) {
          return collection[i];
        }
      }
      return undefined;
    }

    const entries = Object.entries(collection);
    for (let i = entries.length - 1; i >= 0; i--) {
      const [key, value] = entries[i];
      if ((predicate as (value: T, key: string) => boolean)(value as T, key)) {
        return value as T;
      }
    }
    return undefined;
  }

  /**
   * Returns the key of the **first** element of `collection` for which
   * `predicate` returns `true`, or `undefined` if no such element exists.
   */
  static findKey<T>(
    collection: Record<string, T>,
    predicate: (value: T) => boolean
  ): string | undefined {
    return Object.keys(collection).find((key) => predicate(collection[key]));
  }

  /**
   * Checks whether `key` is a direct (own) property of `object`.
   */
  static has(object: object, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  /**
   * Returns an array of the own enumerable string-keyed property names of
   * `object`.
   */
  static keys(object: object): string[] {
    return Object.keys(object);
  }

  /**
   * Creates an array of numbers from `0` up to, but not including, `end`.
   */
  static range(end: number): number[];
  /**
   * Creates an array of numbers from `start` up to, but not including, `end`.
   */
  static range(start: number, end: number): number[];
  static range(startOrEnd: number, end?: number): number[] {
    if (end === undefined) {
      return Array.from({ length: startOrEnd }, (_, i) => i);
    }
    return Array.from({ length: end - startOrEnd }, (_, i) => startOrEnd + i);
  }

  /**
   * Iterates over `collection`, returning an array of all elements for which
   * `predicate` returns `true`.
   */
  static filter<T>(
    collection: T[],
    predicate: (value: T) => boolean
  ): T[] {
    return collection.filter(predicate);
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent. Handles primitives, arrays, and plain objects. Functions,
   * `undefined` values in objects, `Date`, `RegExp`, `Map`, `Set`, and
   * circular references are not supported – matching the subset of use cases
   * present in this codebase.
   */
  static isEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return a === b;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((v, i) => LodashUtils.isEqual(v, (b as unknown[])[i]));
    }

    if (typeof a === "object" && typeof b === "object") {
      const keysA = Object.keys(a as object);
      const keysB = Object.keys(b as object);
      if (keysA.length !== keysB.length) return false;
      return keysA.every((k) =>
        LodashUtils.isEqual(
          (a as Record<string, unknown>)[k],
          (b as Record<string, unknown>)[k]
        )
      );
    }

    return false;
  }

  /**
   * Checks if `value` is contained in `collection`.
   */
  static includes<T>(collection: T[], value: T): boolean {
    return collection.includes(value);
  }
}
