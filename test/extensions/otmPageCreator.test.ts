import { Book } from '../../src/Book';
import { otmPageCreator } from '../../src/extensions/otmPageCreator';

const book: Book = {
  pages: [],
  description: {
    specialPage: 'description',
    pageFormat: 'otm.description',
    data: { explanation: '' },
  },
  bookParameters: {
    specialPage: 'book-parameters',
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

describe('otmPageCreator', () => {
  describe('template', () => {
    it('returns template', () => {
      const { configuration } = otmPageCreator.defaultConfiguration();
      otmPageCreator.template({ book, configuration }).then(({ template }) => {
        const { specialPage, data } = template;
        expect(specialPage).toEqual('page-template');
        expect(data).toEqual({
          word: {
            entry: {
              id: -1,
              form: '新規の単語',
            },
            translations: [],
            tags: [],
            contents: [],
            variations: [],
            relations: [],
          },
        });
      });
    });
    it('returns otm page', async () => {
      const { configuration } = otmPageCreator.defaultConfiguration();
      const { template } = await otmPageCreator.template({
        book,
        configuration,
      });
      otmPageCreator
        .create({ book, configuration, template })
        .then(({ page }) => {
          expect(page).toEqual({
            pageFormat: 'otm',
            data: {
              word: {
                entry: {
                  id: -1,
                  form: '新規の単語',
                },
                contents: [],
                tags: [],
                translations: [],
                variations: [],
                relations: [],
              },
            },
          });
        });
    });
  });
});
