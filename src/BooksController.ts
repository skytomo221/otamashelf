import { BookWithPath } from './Book';
import BookTimeMachine, { PlainBookTimeMachine } from './BookTimeMachine';

export interface BookExtensionMappings {
  bookCreator: string;
  bookUpdater: string;
  bookLoader: string;
  bookSaver: string;
  pageCardCreator: string;
  pageCardUpdater: string;
}

export interface BookRepository {
  plainBookTimeMachine: PlainBookTimeMachine;
  bookExtensionMappings: BookExtensionMappings;
}

export default class BooksController {
  protected readonly bookRepositories: Map<string, BookRepository> = new Map();

  public regesterBook(
    bookWithPath: BookWithPath,
    bookExtensionMappings?: BookExtensionMappings,
  ) {
    const { path, ...book } = bookWithPath;
    this.bookRepositories.set(path, {
      plainBookTimeMachine: new BookTimeMachine(bookWithPath).plain,
      bookExtensionMappings: bookExtensionMappings ?? {
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
