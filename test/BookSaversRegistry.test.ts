import BookSaver from '../src/BookSaver';
import BookSaversRegistry from '../src/BookSaversRegistry';
import OtmSaver from '../src/extensions/OtmSaver';

test('BookSaversRegistry instance of BookLoader', async () => {
  const bookSaversRegistry = new BookSaversRegistry();
  bookSaversRegistry.register(new OtmSaver());
  expect(bookSaversRegistry.get('otm-saver')).toBeInstanceOf(BookSaver);
});

test('BookSaversRegistry return keys', async () => {
  const bookSaversRegistry = new BookSaversRegistry();
  bookSaversRegistry.register(new OtmSaver());
  expect(Array.from(bookSaversRegistry.keys())).toEqual(['otm-saver']);
});

test('BookSaversRegistry return save returns', async () => {
  const bookSaversRegistry = new BookSaversRegistry();
  bookSaversRegistry.register(new OtmSaver());
  expect(
    await bookSaversRegistry.save('otm-saver', {
      action: 'save',
      book: {
        pageCards: [],
        configration: {},
        path: 'test/tmp.json',
      },
    }),
  ).toEqual({
    action: 'save',
    status: 'resolve',
  });
});
