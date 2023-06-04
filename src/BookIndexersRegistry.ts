import BookIndexer, {
  SearchIndexesProps,
  SearchIndexesReturns,
  SearchModesReturns,
} from './BookIndexer';
import { BookIndexerProperties } from './ExtensionProperties';
import Registry from './Registry';

export default class BookIndexersRegistry<
  K extends string,
  V extends BookIndexer,
> extends Registry<K, V> {
  properties(): IterableIterator<BookIndexerProperties> {
    return super.properties() as IterableIterator<BookIndexerProperties>;
  }

  public readSearchModes(id: K): Promise<SearchModesReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookIndexer not found.'));
    return v.readSearchModes();
  }

  public readSearchIndexes(
    id: K,
    props: SearchIndexesProps,
  ): Promise<SearchIndexesReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('BookIndexer not found.'));
    return v.readSearchIndexes(props);
  }
}
