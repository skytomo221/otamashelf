import BookLoader, { LoadProps, LoadReturns } from './BookLoader';
import { BookLoaderProperties } from './ExtensionProperties';
import Registry from './Registry';

export default class BookLoadersRegistry<
  K extends string,
  V extends BookLoader,
> extends Registry<K, V> {
  properties(): IterableIterator<BookLoaderProperties> {
    return super.properties() as IterableIterator<BookLoaderProperties>;
  }

  public load(id: K, props: LoadProps): Promise<LoadReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookLoader not found.'));
    return v.load(props);
  }
}
