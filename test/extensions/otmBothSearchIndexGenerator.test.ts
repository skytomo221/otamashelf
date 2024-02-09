import { NormalPage } from '../../src/Page';
import { otmBothSearchIndexGenerator } from '../../src/extensions/otmBothSearchIndexGenerator';

describe('otmBothSearchIndexGenerator', () => {
  describe('generate', () => {
    it('generates search cards', () => {
      const { configuration } = otmBothSearchIndexGenerator.configuration();
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
      otmBothSearchIndexGenerator
        .generate({ configuration, pages })
        .then(({ searchCards }) => {
          expect(searchCards).toEqual([
            {
              id: '1',
              targets: ['word', '単語', '言葉'],
            },
          ]);
        });
    });
  });
});
