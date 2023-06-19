import BookIndexer from '../src/BookIndexer';
import BookIndexersRegistry from '../src/BookIndexersRegistry';
import OtmIndexer from '../src/extensions/OtmIndexer';

test('BookIndexerRegistry instance of BookLoader', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(new OtmIndexer());
  expect(bookIndexerRegistry.get('otm-indexer')).toBeInstanceOf(BookIndexer);
});

test('BookIndexerRegistry return keys', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(new OtmIndexer());
  expect(Array.from(bookIndexerRegistry.keys())).toEqual(['otm-indexer']);
});

test('BookIndexerRegistry return indexes returns', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(new OtmIndexer());
  expect(
    await bookIndexerRegistry.readSearchModes('otm-indexer', {
      action: 'search-modes',
    }),
  ).toEqual({
    action: 'search-modes',
    returns: { modes: ['form', 'translation', 'both', 'all'] },
    status: 'resolve',
  });
});

test('BookIndexerRegistry return readSearchIndexes returns', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(new OtmIndexer());
  expect(
    await bookIndexerRegistry.readSearchIndexes('otm-indexer', {
      action: 'search-indexes',
      searchModeId: 'all',
      pageCards: [],
    }),
  ).toEqual({
    action: 'search-indexes',
    status: 'resolve',
    returns: {
      searchCards: [],
    },
  });
});
