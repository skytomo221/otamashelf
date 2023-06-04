import BookUpdater, { UpdateBookProps, UpdateBookReturns } from './BookUpdater';
import { BookUpdaterProperties } from './ExtensionProperties';
import Registry from './Registry';

export default class BookUpdatersRegistry<
  K extends string,
  V extends BookUpdater,
> extends Registry<K, V> {
  properties(): IterableIterator<BookUpdaterProperties> {
    return super.properties() as IterableIterator<BookUpdaterProperties>;
  }

  public updateBook(
    id: K,
    props: UpdateBookProps,
  ): Promise<UpdateBookReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookLoader not found.'));
    return v.updateBook(props);
  }
}
