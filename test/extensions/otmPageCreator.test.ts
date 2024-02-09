import { Book } from '../../src/Book';
import { otmPageCreator } from '../../src/extensions/otmPageCreator';

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

describe('otmPageCreator', () => {
  describe('template', () => {
    it('returns template', () => {
      const { configuration } = otmPageCreator.configuration();
      otmPageCreator.template({ book, configuration }).then(({ template }) => {
        const { specialPage, data } = template;
        expect(specialPage).toEqual('template');
        const { values } = data;
        expect(values).toEqual({ id: -1, title: '' });
      });
    });
    it('returns otm page', async () => {
      const { configuration } = otmPageCreator.configuration();
      const { template } = await otmPageCreator.template({
        book,
        configuration,
      });
      otmPageCreator
        .create({ book, configuration, template })
        .then(({ page }) => {
          expect(page).toEqual({
            id: '-1',
            pageFormat: 'otm',
            data: {
              entry: {
                id: -1,
                form: '',
              },
              contents: [],
              tags: [],
              translations: [],
              variations: [],
              relations: [],
            },
          });
        });
    });
  });
});
