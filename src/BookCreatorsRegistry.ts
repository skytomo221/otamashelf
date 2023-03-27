import BookCreator from './BookCreator';

export type BookCreatorGenerator = () => BookCreator;

export default class BookCreatorsRegistry {
  protected readonly bookCreators: Map<string, BookCreatorGenerator> = new Map();

  public register(bookLoader: BookCreatorGenerator): void {
    const { id } = bookLoader().constructor().properties;
    this.bookCreators.set(id, bookLoader);
  }

  public get(id: string): BookCreator | undefined {
    const bookCreator = this.bookCreators.get(id);
    if (!bookCreator) return undefined;
    return bookCreator();
  }
}
