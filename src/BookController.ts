import Book, { BookWithPath } from './Book';

export interface BookDiff {
  revision: number;
  comment: string;
  diff: Book;
}

export interface BookTimeline {
  diff: BookDiff[];
  complete: Book;
}

export interface BookExtensionMappings {
  bookCreator: string;
  bookUpdater: string;
  bookLoader: string;
  bookSaver: string;
  pageCardCreator: string;
  pageCardUpdater: string;
}

export interface BookRepository {
  book: Book;
  bookTimeline: BookTimeline;
  bookExtensionMappings: BookExtensionMappings;
}

export default class BookController {
  protected readonly commands: Map<string, BookRepository> = new Map();

  public regesterBook(bookWithPath: BookWithPath) {
    const { path, ...book } = bookWithPath;
    this.commands.set(path, {
      book,
      bookTimeline: {
        diff: [],
        complete: book,
      },
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

  public executeCommand(command: string, ...props: any[]) {}

  public getCommands() {}
  public switchRevision() {}
  public log() {}
}
