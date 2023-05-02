import BookSaver, { SaveProps, SaveReturns } from './BookSaver';

export type BookSaverGenerator = () => BookSaver;

export default class BookSaversRegistry {
  protected readonly bookSavers: Map<string, BookSaverGenerator> = new Map();

  public register(bookSaver: BookSaverGenerator): void {
    const { id } = bookSaver().properties;
    this.bookSavers.set(id, bookSaver);
  }

  public get(id: string): BookSaver | undefined {
    const bookSaver = this.bookSavers.get(id);
    if (!bookSaver) return undefined;
    return bookSaver();
  }

  save(id: string, props: SaveProps): Promise<SaveReturns> {
    const bookSaver = this.bookSavers.get(id);
    if (!bookSaver) return Promise.reject(new Error('BookSaver not found.'));
    return bookSaver().save(props);
  }
}
