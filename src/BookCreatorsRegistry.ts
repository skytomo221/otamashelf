import BookCreator, { TemplatesReturns } from './BookCreator';

export type BookCreatorGenerator = () => BookCreator;

export default class BookCreatorsRegistry {
  protected readonly bookCreators: Map<string, BookCreatorGenerator> =
    new Map();

  public register(bookLoader: BookCreatorGenerator): void {
    const { id } = bookLoader().properties;
    this.bookCreators.set(id, bookLoader);
  }

  public get(id: string): BookCreator | undefined {
    const bookCreator = this.bookCreators.get(id);
    if (!bookCreator) return undefined;
    return bookCreator();
  }

  public templates(id: string): Promise<TemplatesReturns> {
    const bookCreator = this.bookCreators.get(id);
    if (!bookCreator)
      return Promise.reject(new Error('BookCreator not found.'));
    return bookCreator().templates();
  }
}
