import BookUpdater from '../src/BookUpdater';
import BookUpdatersRegistry from '../src/BookUpdatersRegistry';
import OtmUpdater from '../src/extensions/OtmUpdater';

test('BookUpdatersRegistry instance of BookUpdater', async () => {
  const bookUpdatersRegistry = new BookUpdatersRegistry();
  bookUpdatersRegistry.register(new OtmUpdater());
  expect(bookUpdatersRegistry.get('otm-updater')).toBeInstanceOf(BookUpdater);
});

test('BookUpdatersRegistry return keys', async () => {
  const bookUpdatersRegistry = new BookUpdatersRegistry();
  bookUpdatersRegistry.register(new OtmUpdater());
  expect(Array.from(bookUpdatersRegistry.keys())).toEqual(['otm-updater']);
});

test('BookUpdatersRegistry return updateBook returns', async () => {
  const bookUpdatersRegistry = new BookUpdatersRegistry();
  bookUpdatersRegistry.register(new OtmUpdater());
  expect(
    await bookUpdatersRegistry.updateBook('otm-updater', {
      action: 'update-book',
      book: {
        pageCards: [],
        configration: {},
      },
      pageCard: {
        id: '1',
        title: 'Word',
        entry: {
          id: 1,
          form: 'New Word',
        },
      },
    }),
  ).toEqual({
    action: 'update-book',
    status: 'resolve',
    returns: {
      book: {
        pageCards: [
          {
            id: '1',
            title: 'Word',
            entry: {
              id: 1,
              form: 'New Word',
            },
          },
        ],
        configration: {},
      },
    },
  });
});
