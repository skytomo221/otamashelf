import { BookWithPath } from './Book';
import BookTimeMachine, { PlainBookTimeMachine } from './BookTimeMachine';
import { Json } from './Json';
import { PageCard } from './PageCard';

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
      plainBookTimeMachine: new BookTimeMachine(book).plain,
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

  revertRevision(id: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    bookTimeMachine.revertRevision();
    bookRepository.plainBookTimeMachine = bookTimeMachine.plain;
  }

  forwardRevision(id: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    bookTimeMachine.forwardRevision();
    bookRepository.plainBookTimeMachine = bookTimeMachine.plain;
  }

  currentBook(id: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    return bookTimeMachine.currentBook;
  }

  commitPageCard(id: string, pageCard: PageCard, comment: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    bookTimeMachine.commitPageCard(pageCard, comment);
    bookRepository.plainBookTimeMachine = bookTimeMachine.plain;
  }

  commitConfigration(id: string, configration: Json, comment: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    bookTimeMachine.commitConfigration(configration, comment);
    bookRepository.plainBookTimeMachine = bookTimeMachine.plain;
  }

  removePageCard(id: string, pageCard: PageCard, comment: string) {
    const bookRepository = this.bookRepositories.get(id);
    if (!bookRepository) {
      throw new Error(`BookRepository not found: ${id}`);
    }
    const { plainBookTimeMachine } = bookRepository;
    const bookTimeMachine = BookTimeMachine.fromPlain(plainBookTimeMachine);
    bookTimeMachine.removePageCard(pageCard, comment);
    bookRepository.plainBookTimeMachine = bookTimeMachine.plain;
  }
}
