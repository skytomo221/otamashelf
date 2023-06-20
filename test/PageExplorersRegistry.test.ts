import PageExplorer from '../src/PageExplorer';
import PageExplorersRegistry from '../src/PageExplorersRegistry';
import StartsWithPageExplorer from '../src/extensions/StartsWithPageExplorer';

test('PageExploeresRegistry instance of PageExplorer', async () => {
  const pageExplorersRegistry = new PageExplorersRegistry();
  pageExplorersRegistry.register(new StartsWithPageExplorer());
  expect(pageExplorersRegistry.get('starts-with-page-explorer')).toBeInstanceOf(
    PageExplorer,
  );
});

test('PageExploeresRegistry return keys', async () => {
  const pageExplorersRegistry = new PageExplorersRegistry();
  pageExplorersRegistry.register(new StartsWithPageExplorer());
  expect(Array.from(pageExplorersRegistry.keys())).toStrictEqual([
    'starts-with-page-explorer',
  ]);
});

test('PageExploeresRegistry return search returns', async () => {
  const pageExplorersRegistry = new PageExplorersRegistry();
  pageExplorersRegistry.register(new StartsWithPageExplorer());
  expect(
    await pageExplorersRegistry.search('starts-with-page-explorer', {
      action: 'search',
      cards: [
        {
          id: '1',
          targets: ['Alice'],
        },
        {
          id: '2',
          targets: ['be', 'was'],
        },
        {
          id: '3',
          targets: ['begin', 'beginning'],
        },
      ],
      searchWord: 'be',
    }),
  ).toStrictEqual({
    action: 'search',
    returns: { ids: ['2', '3'] },
    status: 'resolve',
  });
});
