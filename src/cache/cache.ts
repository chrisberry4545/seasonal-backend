import {
  SKIP_CACHE
} from '../config';

const DEFAULT_TTL = 1000 * 60 * 30; // 30 min in ms
export class Cache<T> {
  public ttl: number;
  public map: Map<string, T>;
  public expiries: Map<string, number>;

  constructor(ttl = DEFAULT_TTL) {
    this.ttl = ttl;
    this.map = new Map();
    this.expiries = new Map();
  }

  public set(key: string, value: T, { ttl = this.ttl } = {}) {
    this.map.set(key, value);
    this.expiries.set(key, Date.now() + ttl);
  }
  public get(key: string): T | undefined {
    const cacheValue = this.expiries.get(key);
    if (!SKIP_CACHE && cacheValue && cacheValue > Date.now()) {
      return this.map.get(key);
    }
    return undefined;
  }
}
