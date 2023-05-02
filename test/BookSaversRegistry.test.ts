import BookSaversRegistry from '../src/BookSaversRegistry';
import OtmSaver from '../src/extensions/OtmSaver';

test('BookSaversRegistry instance of BookLoader', async () => {
  const bookSaversRegistry = new BookSaversRegistry();
  bookSaversRegistry.register(() => new OtmSaver());
  expect(bookSaversRegistry.get('otm-saver')).toBeInstanceOf(OtmSaver);
});

test('BookSaversRegistry return save returns', async () => {
  const bookSaversRegistry = new BookSaversRegistry();
  bookSaversRegistry.register(() => new OtmSaver());
  expect(await bookSaversRegistry.save('otm-saver', {
    name: 'save',
    book: {
      pageCards: [],
      configration: {},
      path: 'test/tmp.json',
    }
  })).toEqual({
    name: 'save',
    status: 'resolve',
  });
});
