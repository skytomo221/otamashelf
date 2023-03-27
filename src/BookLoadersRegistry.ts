import BookLoader from './BookLoader';

export type BookLoaderGenerator = () => BookLoader;

export default class BookLoadersRegistry {
  protected readonly bookLoaders: Map<string, BookLoaderGenerator> = new Map();

  public register(bookLoader: BookLoaderGenerator): void {
    const { id } = bookLoader().constructor().properties;
    this.bookLoaders.set(id, bookLoader);
  }

  public get(id: string): BookLoader | undefined {
    const bookLoader = this.bookLoaders.get(id);
    if (!bookLoader) return undefined;
    return bookLoader();
  }
}
