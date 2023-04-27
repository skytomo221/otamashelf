import BookIndexer, {
  SearchIndexesProps,
  SearchIndexesReturns,
  SearchModesReturns,
} from './BookIndexer';

export type BookIndexerGenerator = () => BookIndexer;

export default class BookIndexersRegistry {
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
