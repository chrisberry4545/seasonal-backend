const {
  SKIP_CACHE
} = require('./../config');

const DEFAULT_TTL = 1000 * 60 * 30; // 30 min in ms
class Cache {
  constructor (ttl = DEFAULT_TTL) {
    this.ttl = ttl;
    this.map = new Map();
    this.expiries = new Map();
  }
  set (key, value, { ttl = this.ttl } = {}) {
    this.map.set(key, value);
    this.expiries.set(key, Date.now() + ttl);
  }
  get (key) {
    if (!SKIP_CACHE && this.expiries.get(key) > Date.now()) {
      return this.map.get(key);
    }
    return null;
  }
}

module.exports = {
  Cache
};
