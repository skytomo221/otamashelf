import { Book } from '../src/Book';
import BookTimeMachine from '../src/BookTimeMachine';
import { NormalPage } from '../src/Page';

const samplePage: NormalPage = {
  id: 'sample-page',
  pageFormat: 'sample-format',
  data: {
    title: 'sample-title',
  },
};

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

test('bookTimeMachine.commitPage return Book', async () => {
  const bookTimeMachine = new BookTimeMachine(book);
  expect(bookTimeMachine.commitPage(samplePage, 'Add test page card')).toEqual({
    ...book,
    pages: [samplePage],
  });
});

test('bookTimeMachine.currentRevision return 1', async () => {
  const bookTimeMachine = new BookTimeMachine(book);
  bookTimeMachine.commitPage(samplePage, 'Add test page card');
  expect(bookTimeMachine.currentRevision).toEqual(1);
});

test('bookTimeMachine.currentBook return Book', async () => {
  const bookTimeMachine = new BookTimeMachine(book);
  bookTimeMachine.commitPage(samplePage, 'Add test page card');
  expect(bookTimeMachine.currentBook).toEqual({
    ...book,
    pages: [samplePage],
  });
});

test('bookTimeMachine.revertRevision reverts revision', async () => {
  const bookTimeMachine = new BookTimeMachine(book);
  bookTimeMachine.commitPage(samplePage, 'Add test page card');
  expect(bookTimeMachine.revertRevision()).toEqual(book);
});

test('bookTimeMachine.forwardRevision forwards revision', async () => {
  const bookTimeMachine = new BookTimeMachine(book);
  bookTimeMachine.commitPage(samplePage, 'Add test page card');
  bookTimeMachine.revertRevision();
  expect(bookTimeMachine.forwardRevision()).toEqual({
    ...book,
    pages: [samplePage],
  });
});
