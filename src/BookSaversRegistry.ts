import BookSaver, { SaveProps, SaveReturns } from './BookSaver';
import { BookSaverProperties } from './ExtensionProperties';
import Registry from './Registry';

export default class BookSaversRegistry<
  K extends string,
  V extends BookSaver,
> extends Registry<K, V> {
  properties(): IterableIterator<BookSaverProperties> {
    return super.properties() as IterableIterator<BookSaverProperties>;
  }

  save(id: K, props: SaveProps): Promise<SaveReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookSaver not found.'));
    return v.save(props);
  }
}
