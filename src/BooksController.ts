import { Book } from './Book';
import BookTimeMachine from './BookTimeMachine';
import MapWithOrThrow from './MapWithOrThrow';

export default class BooksController extends MapWithOrThrow<
  string,
  BookTimeMachine
> {
  public registerBook(book: Book) {
    this.set(book.fileFormat.path, new BookTimeMachine(book));
  }
}
