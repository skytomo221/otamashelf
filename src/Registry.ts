import Extension from './Extension';
import { ExtensionProperties } from './ExtensionProperties';

export default class Registry<
  K extends string,
  V extends Extension,
> extends Map<K, V> {
  register(extension: V) {
    const { id } = extension.properties;
    this.set(id as K, extension);
  }

  properties(): IterableIterator<ExtensionProperties> {
    const values = this.values();
    return {
      next: (): IteratorResult<ExtensionProperties> => {
        const next = values.next();
        if (next.done) return next;
        return {
          done: false,
          value: next.value.properties,
        };
      },
      [Symbol.iterator](): IterableIterator<ExtensionProperties> {
        return this;
      },
    };
  }
}
