import BookIndexersRegistry from '../src/BookIndexersRegistry';
import OtmIndexer from '../src/extensions/OtmIndexer';

test('BookIndexerRegistry instance of BookLoader', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(() => new OtmIndexer());
  expect(bookIndexerRegistry.get('otm-indexer')).toBeInstanceOf(OtmIndexer);
});

test('BookIndexerRegistry return indexes returns', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(() => new OtmIndexer());
  expect(await bookIndexerRegistry.readSearchModes('otm-indexer')).toEqual({
    name: 'search-modes',
    returns: { modes: ['form', 'translation', 'both', 'all'] },
    status: 'resolve',
  });
});

test('BookIndexerRegistry return readSearchIndexes returns', async () => {
  const bookIndexerRegistry = new BookIndexersRegistry();
  bookIndexerRegistry.register(() => new OtmIndexer());
  expect(
    await bookIndexerRegistry.readSearchIndexes('otm-indexer', {
      name: 'search-indexes',
      searchModeId: 'all',
      pageCards: [],
    }),
  ).toEqual({
    name: 'search-indexes',
    status: 'resolve',
    returns: {
      searchCards: [],
    },
  });
});
