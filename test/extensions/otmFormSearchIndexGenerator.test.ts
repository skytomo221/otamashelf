import { NormalPage } from '../../src/Page';
import { otmFormSearchIndexGenerator } from '../../src/extensions/otmFormSearchIndexGenerator';

describe('otmFormSearchIndexGenerator', () => {
  describe('generate', () => {
    it('generates search cards', () => {
      const { configuration } = otmFormSearchIndexGenerator.configuration();
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
      otmFormSearchIndexGenerator
        .generate({ configuration, pages })
        .then(({ searchCards }) => {
          expect(searchCards).toEqual([
            {
              id: '1',
              targets: ['word'],
            },
          ]);
        });
    });
  });
});
