import { NormalPage } from '../../src/Page';
import { otmIndexGenerator } from '../../src/extensions/otmIndexGenerator';

describe('otmIndexGenerator', () => {
  describe('indexes', () => {
    it('return indexes', () => {
      const { configuration } = otmIndexGenerator.configuration();
      const page: NormalPage = {
        id: '1',
        pageFormat: 'otmIndex',
        data: {
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
      };
      const pages = [page];
      otmIndexGenerator
        .generate({ configuration, pages })
        .then(({ indexs }) => {
          expect(indexs).toEqual([
            {
              id: '1',
              preview: '単語 言葉',
              title: 'word',
            },
          ]);
        });
    });
  });
});
