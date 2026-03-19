import _ from "lodash";

/**
 * LodashWrapper – a parallel class to LodashUtils that exposes the same
 * static interface but delegates every method to the real lodash library.
 *
 * This class exists so that tests can be run against both the hand-rolled
 * LodashUtils implementation and the canonical lodash reference at once,
 * verifying that the two are behaviourally equivalent.
 */
export class LodashWrapper {
  /**
   * Creates an array of values by running each element of `collection`
   * through `iteratee`.
   */
  static map<T, R>(
    collection: T[],
    iteratee: (value: T, index: number, arr: T[]) => R
  ): R[] {
    return _.map(collection, iteratee);
  }

  /**
   * Iterates over `collection` and invokes `iteratee` for each element.
   */
  static each<T>(
    collection: T[],
    iteratee: (value: T, index: number, arr: T[]) => void
  ): void {
    _.each(collection, iteratee);
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
    return _.findLast(
      collection as T[],
      predicate as (value: T) => boolean
    );
  }

  /**
   * Returns the key of the **first** element of `collection` for which
   * `predicate` returns `true`, or `undefined` if no such element exists.
   */
  static findKey<T>(
    collection: Record<string, T>,
    predicate: (value: T) => boolean
  ): string | undefined {
    return _.findKey(collection, predicate);
  }

  /**
   * Checks whether `key` is a direct (own) property of `object`.
   */
  static has(object: object, key: string): boolean {
    return _.has(object, key);
  }

  /**
   * Returns an array of the own enumerable string-keyed property names of
   * `object`.
   */
  static keys(object: object): string[] {
    return _.keys(object);
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
      return _.range(startOrEnd);
    }
    return _.range(startOrEnd, end);
  }

  /**
   * Iterates over `collection`, returning an array of all elements for which
   * `predicate` returns `true`.
   */
  static filter<T>(
    collection: T[],
    predicate: (value: T) => boolean
  ): T[] {
    return _.filter(collection, predicate);
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   */
  static isEqual(a: unknown, b: unknown): boolean {
    return _.isEqual(a, b);
  }

  /**
   * Checks if `value` is contained in `collection`.
   */
  static includes<T>(collection: T[], value: T): boolean {
    return _.includes(collection, value);
  }
}
