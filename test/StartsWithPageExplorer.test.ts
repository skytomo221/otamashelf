import StartsWithPageExplorer from '../src/extensions/StartsWithPageExplorer';

test('StartsWithPageExplorer properties', () => {
  expect(new StartsWithPageExplorer().properties).toStrictEqual({
    name: 'Starts With Page Explorer',
    id: 'starts-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  });
});

test('StartsWithPageExplorer properties', async () => {
  expect(
    await new StartsWithPageExplorer().search({
      name: 'search',
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
    name: 'search',
    returns: { ids: ['2', '3'] },
    status: 'resolve',
  });
});
