import Otamashelf from '../../src/Otamashelf';
import { NormalPage } from '../../src/Page';
import { otmPagesIndexer } from '../../src/extensions/otmPagesIndexer';

describe('otmIndexGenerator', () => {
  describe('indexes', () => {
    it('return indexes', () => {
      const api = new Otamashelf().api('read');
      const { configuration } = otmPagesIndexer.defaultConfiguration();
      const page: NormalPage = {
        id: '1',
        pageFormat: 'otmIndex',
        data: {
          word: {
            entry: {
              id: 1,
              form: 'word',
            },
            translations: [
              {
                title: '名詞',
                forms: ['単語', '言葉'],
              },
            ],
            tags: ['基本'],
            contents: [
              {
                title: 'Pronunciation',
                text: 'wərd',
              },
            ],
            variations: [],
            relations: [],
          },
        },
      };
      const pages = [page];
      otmPagesIndexer
        .index({ api, configuration, pages })
        .then(({ indexes }) => {
          expect(indexes).toEqual([
            {
              pageId: '1',
              preview: '単語 言葉',
              title: 'word',
            },
          ]);
        });
    });
  });
});
