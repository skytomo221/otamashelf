import { SearchCard } from '../../src/SearchCard';
import { startsWithPageExplorer } from '../../src/extensions/startsWithPageExplorer';

describe('startsWithPageExplorer', () => {
  describe('search', () => {
    it('returns empty ids', async () => {
      const { configuration } = startsWithPageExplorer.configuration();
      const searchCards: SearchCard[] = [];
      const searchWord = '';
      expect(
        await startsWithPageExplorer.search({
          configuration,
          searchCards,
          searchWord,
        }),
      ).toEqual({
        results: [],
      });
    });
    it('returns matching starts', async () => {
      const { configuration } = startsWithPageExplorer.configuration();
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
      const searchWord = 'すべて';
      expect(
        await startsWithPageExplorer.search({
          configuration,
          searchCards,
          searchWord,
        }),
      ).toEqual({
        results: [
          {
            id: '1',
            matches: [
              {
                begin: 0,
                end: 3,
                targetIndex: 0,
              },
            ],
          },
          {
            id: '3',
            matches: [
              {
                begin: 0,
                end: 3,
                targetIndex: 0,
              },
            ],
          },
        ],
      });
    });
  });
});
