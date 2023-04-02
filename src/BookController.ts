import { BookWithPath } from './Book';
import BookTimeline, { PlainBookTimeline } from './BookTimeline';

export interface BookExtensionMappings {
  bookCreator: string;
  bookUpdater: string;
  bookLoader: string;
  bookSaver: string;
  pageCardCreator: string;
  pageCardUpdater: string;
}

export interface BookRepository {
  plainBookTimeline: PlainBookTimeline;
  bookExtensionMappings: BookExtensionMappings;
}

export default class BooksController {
  protected readonly bookRepositories: Map<string, BookRepository> = new Map();

  public regesterBook(bookWithPath: BookWithPath) {
    const { path, ...book } = bookWithPath;
    this.bookRepositories.set(path, {
      plainBookTimeline: new BookTimeline(bookWithPath).plain,
      bookExtensionMappings: {
        bookCreator: '',
        bookUpdater: '',
        bookLoader: '',
        bookSaver: '',
        pageCardCreator: '',
        pageCardUpdater: '',
      },
    });
  }

  public getBookRepository(id: string) {
    return this.bookRepositories.get(id);
  }
}
