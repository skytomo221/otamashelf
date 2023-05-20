import BookIndexer, {
  SearchIndexesProps,
  SearchIndexesReturns,
  SearchModesReturns,
} from './BookIndexer';
import { BookIndexerProperties } from './ExtensionProperties';
import Registry from './Registry';

export type BookIndexerGenerator = () => BookIndexer;

export default class BookIndexersRegistry extends Registry {
  protected readonly bookIndexers: Map<string, BookIndexerGenerator> =
    new Map();

  public register(bookLoader: BookIndexerGenerator): void {
    const { id } = bookLoader().properties;
    this.bookIndexers.set(id, bookLoader);
  }

  public get(id: string): BookIndexer | undefined {
    const bookIndexer = this.bookIndexers.get(id);
    if (!bookIndexer) return undefined;
    return bookIndexer();
  }

  keys(): string[] {
    return Array.from(this.bookIndexers.keys());
  }

  filterKeys(predicate: (properties: BookIndexerProperties) => boolean): string[] {
    return this.keys().filter((id) => predicate(this.get(id)!.properties));
  }

  public readSearchModes(id: string): Promise<SearchModesReturns> {
    const bookLoader = this.bookIndexers.get(id);
    if (!bookLoader) return Promise.reject(new Error('BookLoader not found.'));
    return bookLoader().readSearchModes();
  }

  public readSearchIndexes(
    id: string,
    props: SearchIndexesProps,
  ): Promise<SearchIndexesReturns> {
    const bookLoader = this.bookIndexers.get(id);
    if (!bookLoader) return Promise.reject(new Error('BookLoader not found.'));
    return bookLoader().readSearchIndexes(props);
  }
}
