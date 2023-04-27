import BookUpdater, { UpdateBookProps, UpdateBookReturns } from "./BookUpdater";

export type BookUpdaterGenerator = () => BookUpdater;

export default class BookUpdatersRegistry {
  protected readonly bookIndexers: Map<string, BookUpdaterGenerator> =
    new Map();

  public register(bookUpdater: BookUpdaterGenerator): void {
    const { id } = bookUpdater().properties;
    this.bookIndexers.set(id, bookUpdater);
  }

  public get(id: string): BookUpdater | undefined {
    const bookUpdater = this.bookIndexers.get(id);
    if (!bookUpdater) return undefined;
    return bookUpdater();
  }

  public updateBook(id: string, props: UpdateBookProps): Promise<UpdateBookReturns> {
    const bookLoader = this.bookIndexers.get(id);
    if (!bookLoader) return Promise.reject(new Error('BookLoader not found.'));
    return bookLoader().updateBook(props);
  }
}
