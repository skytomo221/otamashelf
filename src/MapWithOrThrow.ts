export default class MapWithOrThrow<K, V> extends Map<K, V> {
  getOrThrow(key: K): V {
    const value = this.get(key);
    if (value === undefined) throw new NoValueError(key, this);
    return value;
  }
}
