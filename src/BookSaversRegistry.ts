import BookSaver from './BookSaver';

export type BookSaverGenerator = () => BookSaver;

export default class BookSaversRegistry {
  protected readonly bookSavers: Map<string, BookSaverGenerator> = new Map();

  public register(bookSaver: BookSaverGenerator): void {
    const { id } = bookSaver().constructor().properties;
    this.bookSavers.set(id, bookSaver);
  }

  public get(id: string): BookSaver | undefined {
    const bookSaver = this.bookSavers.get(id);
    if (!bookSaver) return undefined;
    return bookSaver();
  }
}
