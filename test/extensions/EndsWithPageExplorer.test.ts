import { SearchCard } from '../../src/SearchCard';
import { endsWithPageExplorer } from '../../src/extensions/endsWithPageExplorer';

describe('endsWithPageExplorer', () => {
  describe('search', () => {
    it('returns empty ids', async () => {
      const { configuration } = endsWithPageExplorer.configuration();
      const searchCards: SearchCard[] = [];
      const searchWord = '';
      expect(
        await endsWithPageExplorer.search({
          configuration,
          searchCards,
          searchWord,
        }),
      ).toEqual({
        results: [],
      });
    });
    it('returns matching ends', async () => {
      const { configuration } = endsWithPageExplorer.configuration();
      const searchCards = [
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
      ];
      const searchWord = 'する。';
      expect(
        await endsWithPageExplorer.search({
          configuration,
          searchCards,
          searchWord,
        }),
      ).toEqual({
        results: [
          {
            id: '3',
            matches: [
              {
                begin: 26,
                end: 29,
                targetIndex: 0,
              },
            ],
          },
          {
            id: '4',
            matches: [
              {
                begin: 48,
                end: 51,
                targetIndex: 0,
              },
            ],
          },
        ],
      });
    });
  });
});
