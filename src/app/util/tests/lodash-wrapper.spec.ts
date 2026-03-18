import { LodashWrapper } from "../lodash-wrapper";

describe("LodashWrapper", () => {
  // ─── map ───────────────────────────────────────────────────────────────────
  describe("map", () => {
    it("transforms each element of an array", () => {
      expect(LodashWrapper.map([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
    });

    it("provides the index as second argument", () => {
      expect(LodashWrapper.map(["a", "b", "c"], (v, i) => `${i}:${v}`)).toEqual([
        "0:a",
        "1:b",
        "2:c",
      ]);
    });

    it("returns an empty array when given an empty array", () => {
      expect(LodashWrapper.map([], (x: number) => x)).toEqual([]);
    });
  });

  // ─── each ──────────────────────────────────────────────────────────────────
  describe("each", () => {
    it("calls the iteratee for every element in order", () => {
      const result: number[] = [];
      LodashWrapper.each([10, 20, 30], (v) => result.push(v));
      expect(result).toEqual([10, 20, 30]);
    });

    it("provides index and array to the iteratee", () => {
      const indices: number[] = [];
      LodashWrapper.each(["x", "y"], (_v, i) => indices.push(i));
      expect(indices).toEqual([0, 1]);
    });

    it("does nothing on an empty array", () => {
      let called = false;
      LodashWrapper.each([], () => {
        called = true;
      });
      expect(called).toBe(false);
    });
  });

  // ─── findLast (array overload) ─────────────────────────────────────────────
  describe("findLast (array)", () => {
    it("returns the last element matching the predicate", () => {
      expect(LodashWrapper.findLast([1, 2, 3, 4], (v) => v % 2 === 0)).toBe(4);
    });

    it("returns the only matching element when there is just one", () => {
      expect(LodashWrapper.findLast([1, 3, 5, 6], (v) => v % 2 === 0)).toBe(6);
    });

    it("returns undefined when no element matches", () => {
      expect(
        LodashWrapper.findLast([1, 3, 5], (v) => v % 2 === 0)
      ).toBeUndefined();
    });

    it("returns undefined for an empty array", () => {
      expect(
        LodashWrapper.findLast([], (_v: number) => true)
      ).toBeUndefined();
    });
  });

  // ─── findLast (object overload) ────────────────────────────────────────────
  describe("findLast (object)", () => {
    it("returns the last value matching the predicate", () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      expect(LodashWrapper.findLast(obj, (v) => v < 3)).toBe(2);
    });

    it("passes the key as the second argument to the predicate", () => {
      const obj: Record<string, number> = { "0": 10, "1": 20, "2": 30 };
      // Return last entry whose key (as number) is <= 1
      expect(
        LodashWrapper.findLast(obj, (_v, k) => Number(k) <= 1)
      ).toBe(20);
    });

    it("returns undefined when no value matches", () => {
      const obj: Record<string, number> = { a: 1, b: 2 };
      expect(LodashWrapper.findLast(obj, (v) => v > 10)).toBeUndefined();
    });

    it("returns undefined for an empty object", () => {
      expect(
        LodashWrapper.findLast({} as Record<string, number>, () => true)
      ).toBeUndefined();
    });
  });

  // ─── findKey ───────────────────────────────────────────────────────────────
  describe("findKey", () => {
    it("returns the first key whose value satisfies the predicate", () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      expect(LodashWrapper.findKey(obj, (v) => v === 2)).toBe("b");
    });

    it("returns the first matching key when multiple keys match", () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 2 };
      expect(LodashWrapper.findKey(obj, (v) => v === 2)).toBe("b");
    });

    it("returns undefined when no key matches", () => {
      const obj: Record<string, number> = { a: 1, b: 2 };
      expect(LodashWrapper.findKey(obj, (v) => v === 99)).toBeUndefined();
    });
  });

  // ─── has ───────────────────────────────────────────────────────────────────
  describe("has", () => {
    it("returns true when the object has the given own property", () => {
      expect(LodashWrapper.has({ a: 1 }, "a")).toBe(true);
    });

    it("returns false when the object does not have the property", () => {
      expect(LodashWrapper.has({ a: 1 }, "b")).toBe(false);
    });

    it("returns false for inherited (prototype) properties", () => {
      const child = Object.create({ inherited: true });
      expect(LodashWrapper.has(child, "inherited")).toBe(false);
    });
  });

  // ─── keys ──────────────────────────────────────────────────────────────────
  describe("keys", () => {
    it("returns own enumerable string keys", () => {
      expect(LodashWrapper.keys({ a: 1, b: 2, c: 3 })).toEqual(["a", "b", "c"]);
    });

    it("returns an empty array for an empty object", () => {
      expect(LodashWrapper.keys({})).toEqual([]);
    });

    it("does not include inherited keys", () => {
      const obj = Object.create({ inherited: true });
      (obj as Record<string, number>)["own"] = 1;
      expect(LodashWrapper.keys(obj)).toEqual(["own"]);
    });
  });

  // ─── range ─────────────────────────────────────────────────────────────────
  describe("range", () => {
    it("creates [0, n) with a single argument", () => {
      expect(LodashWrapper.range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("creates [start, end) with two arguments", () => {
      expect(LodashWrapper.range(2, 6)).toEqual([2, 3, 4, 5]);
    });

    it("returns an empty array for range(0)", () => {
      expect(LodashWrapper.range(0)).toEqual([]);
    });

    it("returns an empty array when start equals end", () => {
      expect(LodashWrapper.range(3, 3)).toEqual([]);
    });
  });

  // ─── filter ────────────────────────────────────────────────────────────────
  describe("filter", () => {
    it("returns elements matching the predicate", () => {
      expect(LodashWrapper.filter([1, 2, 3, 4, 5], (v) => v % 2 === 0)).toEqual([
        2, 4,
      ]);
    });

    it("returns an empty array when nothing matches", () => {
      expect(LodashWrapper.filter([1, 3, 5], (v) => v % 2 === 0)).toEqual([]);
    });

    it("returns all elements when all match", () => {
      expect(LodashWrapper.filter([2, 4, 6], (v) => v % 2 === 0)).toEqual([
        2, 4, 6,
      ]);
    });

    it("filters out null values", () => {
      const arr: (number | null)[] = [1, null, 2, null, 3];
      expect(LodashWrapper.filter(arr, (v) => v !== null)).toEqual([1, 2, 3]);
    });
  });

  // ─── isEqual ───────────────────────────────────────────────────────────────
  describe("isEqual", () => {
    it("returns true for equal primitive numbers", () => {
      expect(LodashWrapper.isEqual(42, 42)).toBe(true);
    });

    it("returns false for unequal primitive numbers", () => {
      expect(LodashWrapper.isEqual(1, 2)).toBe(false);
    });

    it("returns true for equal strings", () => {
      expect(LodashWrapper.isEqual("hello", "hello")).toBe(true);
    });

    it("returns true for deeply equal arrays", () => {
      expect(LodashWrapper.isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it("returns false for arrays with different elements", () => {
      expect(LodashWrapper.isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it("returns false for arrays with different lengths", () => {
      expect(LodashWrapper.isEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it("returns true for equal nested objects", () => {
      expect(LodashWrapper.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    });

    it("returns false for objects with different values", () => {
      expect(LodashWrapper.isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  // ─── includes ──────────────────────────────────────────────────────────────
  describe("includes", () => {
    it("returns true when the value is in the collection", () => {
      expect(LodashWrapper.includes([1, 2, 3], 2)).toBe(true);
    });

    it("returns false when the value is not in the collection", () => {
      expect(LodashWrapper.includes([1, 2, 3], 5)).toBe(false);
    });

    it("returns false for an empty collection", () => {
      expect(LodashWrapper.includes([], 1)).toBe(false);
    });

    it("works with string collections", () => {
      expect(LodashWrapper.includes(["Label", "Number"], "Label")).toBe(true);
      expect(LodashWrapper.includes(["Label", "Number"], "Reg")).toBe(false);
    });
  });
});
