import { Book } from '../src/Book';
import BooksController from '../src/BooksController';
import { Page } from '../src/Page';

const book: Book = {
  bookFormat: '',
  configuration: {
    specialPage: 'configuration',
    pageFormat: '',
    data: {},
  },
  description: {
    specialPage: 'description',
    pageFormat: '',
    data: {},
  },
  fileFormat: {
    path: 'test-book',
    isDirectory: false,
    loadedTime: 0,
  },
  indexes: [],
  pages: [],
  title: '',
};

describe('booksController', () => {
  describe('registerBook', () => {
    it('registers book', () => {
      const booksController = new BooksController();
      booksController.registerBook(book);
      expect(booksController.get('test-book')?.currentBook).toEqual(book);
    });
  });
});
