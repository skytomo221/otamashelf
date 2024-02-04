import { NormalPage } from '../../src/Page';
import { otmTranslationSearchIndexGenerator } from '../../src/extensions/otmTranslationSearchIndexGenerator';

describe('otmTranslationSearchIndexGenerator', () => {
  describe('generate', () => {
    it('generates search cards', () => {
      const { configuration } =
        otmTranslationSearchIndexGenerator.configuration();
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
      otmTranslationSearchIndexGenerator
        .generate({ configuration, pages })
        .then(({ searchCards }) => {
          expect(searchCards).toEqual([
            {
              id: '1',
              targets: ['単語', '言葉'],
            },
          ]);
        });
    });
  });
});
