import { describe, it, expect } from 'vitest';
import { mapFn, indexBy, params, pluck } from './utils.js';

describe('utils', () => {
  describe('mapFn', () => {
    it('should map array of names to object using function', () => {
      const result = mapFn(['a', 'b', 'c'], (name) => name.toUpperCase());
      expect(result).toEqual({
        a: 'A',
        b: 'B',
        c: 'C',
      });
    });

    it('should return empty object for empty array', () => {
      const result = mapFn([], (name) => name);
      expect(result).toEqual({});
    });
  });

  describe('indexBy', () => {
    it('should index items by single key', () => {
      const items = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const result = indexBy(items, (item) => item.id);
      expect(result).toEqual({
        1: [{ id: 1, name: 'Alice' }],
        2: [{ id: 2, name: 'Bob' }],
        3: [{ id: 3, name: 'Charlie' }],
      });
    });

    it('should index items by multiple keys', () => {
      const items = [
        { id: 1, tags: ['red', 'blue'] },
        { id: 2, tags: ['green'] },
      ];
      const result = indexBy(items, (item) => item.tags);
      expect(result).toEqual({
        red: [{ id: 1, tags: ['red', 'blue'] }],
        blue: [{ id: 1, tags: ['red', 'blue'] }],
        green: [{ id: 2, tags: ['green'] }],
      });
    });

    it('should skip null/undefined keys', () => {
      const items = [{ id: 1 }, { id: 2 }];
      const result = indexBy(items, (item) => item.name);
      expect(result).toEqual({});
    });
  });

  describe('params', () => {
    it('should convert object to URL query string', () => {
      const result = params({ foo: 'bar', baz: 'qux' });
      expect(result).toBe('foo=bar&baz=qux');
    });

    it('should encode special characters', () => {
      const result = params({ key: 'hello world', other: 'foo&bar' });
      expect(result).toBe('key=hello%20world&other=foo%26bar');
    });

    it('should return empty string for empty object', () => {
      const result = params({});
      expect(result).toBe('');
    });
  });

  describe('pluck', () => {
    it('should pluck values using string mappings', () => {
      const data = { firstName: 'John', lastName: 'Doe', age: 30 };
      const picker = pluck({ first: 'firstName', last: 'lastName' });
      const result = picker(data);
      expect(result).toEqual({ first: 'John', last: 'Doe' });
    });

    it('should pluck values using function mappings', () => {
      const data = { firstName: 'John', lastName: 'Doe' };
      const picker = pluck({
        fullName: (d) => `${d.firstName} ${d.lastName}`,
      });
      const result = picker(data);
      expect(result).toEqual({ fullName: 'John Doe' });
    });

    it('should mix string and function mappings', () => {
      const data = { x: 10, y: 20 };
      const picker = pluck({
        x: 'x',
        sum: (d) => d.x + d.y,
      });
      const result = picker(data);
      expect(result).toEqual({ x: 10, sum: 30 });
    });
  });
});
