import BookCreator, { TemplatesReturns } from './BookCreator';
import { BookCreatorProperties } from './ExtensionProperties';
import Registry from './Registry';

export default class BookCreatorsRegistry<
  K extends string,
  V extends BookCreator,
> extends Registry<K, V> {
  properties(): IterableIterator<BookCreatorProperties> {
    return super.properties() as IterableIterator<BookCreatorProperties>;
  }

  public templates(id: K): Promise<TemplatesReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookCreator not found.'));
    return v.templates();
  }
}
