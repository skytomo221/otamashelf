import BookLoader, { LoadProps, LoadReturns } from './BookLoader';

export type BookLoaderGenerator = () => BookLoader;

export default class BookLoadersRegistry {
  protected readonly bookLoaders: Map<string, BookLoaderGenerator> = new Map();

  public register(bookLoader: BookLoaderGenerator): void {
    const { id } = bookLoader().properties;
    this.bookLoaders.set(id, bookLoader);
  }

  public get(id: string): BookLoader | undefined {
    const bookLoader = this.bookLoaders.get(id);
    if (!bookLoader) return undefined;
    return bookLoader();
  }

  public load(id: string, props: LoadProps): Promise<LoadReturns> {
    const bookLoader = this.bookLoaders.get(id);
    if (!bookLoader) return Promise.reject(new Error('BookLoader not found.'));
    return bookLoader().load(props);
  }
}
