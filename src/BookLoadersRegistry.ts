import BookLoader, { LoadProps, LoadReturns } from './BookLoader';
import Registry from './Registry';

export type BookLoaderGenerator = () => BookLoader;

export default class BookLoadersRegistry extends Registry {
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

  keys(): string[] {
    return Array.from(this.bookLoaders.keys());
  }

  public load(id: string, props: LoadProps): Promise<LoadReturns> {
    const bookLoader = this.bookLoaders.get(id);
    if (!bookLoader) return Promise.reject(new Error('BookLoader not found.'));
    return bookLoader().load(props);
  }
}
