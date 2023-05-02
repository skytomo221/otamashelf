import StartsWithPageExplorer from '../../src/extensions/StartsWithPageExplorer';

test('StartsWithPageExplorer searches empty and return empty ids.', async () => {
  const pageExplorer = new StartsWithPageExplorer();
  expect(
    await pageExplorer.search({
      name: 'search',
      cards: [],
      searchWord: '',
    }),
  ).toEqual({
    name: 'search',
    status: 'resolve',
    returns: {
      ids: [],
    },
  });
});

test('StartsWithPageExplorer searches matching starts.', async () => {
  const pageExplorer = new StartsWithPageExplorer();
  expect(
    await pageExplorer.search({
      name: 'search',
      cards: [
        {
          id: '1',
          targets: [
            'すべての人間は、生れながらにして自由であり、かつ、尊厳と権利とについて平等である。',
            '人間は、理性と良心とを授けられており、互いに同胞の精神をもって行動しなければならない。',
          ],
        },
        {
          id: '3',
          targets: [
            'すべて人は、生命、自由及び身体の安全に対する権利を有する。',
          ],
        },
        {
          id: '4',
          targets: [
            '何人も、奴隷にされ、又は苦役に服することはない。奴隷制度及び奴隷売買は、いかなる形においても禁止する。',
          ],
        },
      ],
      searchWord: 'すべて',
    }),
  ).toEqual({
    name: 'search',
    status: 'resolve',
    returns: {
      ids: ['1', '3'],
    },
  });
});
