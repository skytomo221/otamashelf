import { Book } from '../../src/Book';
import {
  otmRemoveContentPageModifier,
  Script,
} from '../../src/extensions/otmRemoveContentPageModifier';
import { NormalPage } from '../../src/Page';

const book: Book = {
  pages: [],
  description: {
    specialPage: 'description',
    pageFormat: 'otm.description',
    data: { explanation: '' },
  },
  configuration: {
    specialPage: 'configuration',
    pageFormat: 'otm.configuration',
    data: {
      snoj: ',、',
      version: '2',
      zpdic: '',
      zpdicOnline: '',
    },
  },
  title: '',
  bookFormat: 'otm',
  fileFormat: {
    path: '',
    isDirectory: false,
    loadedTime: 0,
  },
  indexes: [],
};

describe('otmRemoveContentPageModifier', () => {
  describe('generate', () => {
    it('generates search cards', () => {
      const { configuration } = otmRemoveContentPageModifier.configuration();
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
      const script: Script = { removeIndex: 0 };
      otmRemoveContentPageModifier
        .modify({ book, configuration, page, script })
        .then(({ page }) => {
          expect(page).toEqual({
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
              contents: [],
              variations: [],
              relations: [],
            },
          });
        });
    });
  });
});
