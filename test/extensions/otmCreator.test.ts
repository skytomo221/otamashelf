import Otamashelf from '../../src/Otamashelf';
import { otmCreator } from '../../src/extensions/otmCreator';

describe('otmCreator', () => {
  describe('template', () => {
    const api = new Otamashelf().api('read');
    it('returns template', () => {
      const { configuration } = otmCreator.defaultConfiguration();
      otmCreator.template({ api, configuration }).then(({ template }) => {
        const { specialPage, data } = template;
        expect(specialPage).toEqual('book-template');
        expect(data).toEqual({
          path: '',
          title: '',
          snoj: '',
          version: '2',
          zpdic: {
            alphabetOrder: '',
            plainInformationTitles: [],
            informationTitleOrder: [],
            defaultWord: null,
          },
          zpdicOnline: {
            enableMarkdown: true,
            explanation: '',
          },
        });
      });
    });
    it('returns otm book', async () => {
      const { configuration } = otmCreator.defaultConfiguration();
      const { template } = await otmCreator.template({ api, configuration });
      const expectedBook = {
        pages: [],
        description: {
          specialPage: 'description',
          pageFormat: 'otm.description',
          data: { explanation: '' },
        },
        bookParameters: {
          specialPage: 'book-parameters',
          pageFormat: 'otm.book-parameters',
          data: {
            snoj: '',
            version: '2',
            zpdic: {
              alphabetOrder: '',
              defaultWord: null,
              informationTitleOrder: [],
              plainInformationTitles: [],
            },
            zpdicOnline: {
              enableMarkdown: true,
              explanation: '',
            },
          },
        },
        title: '',
        bookFormat: 'otm',
        fileFormat: {
          isDirectory: false,
        },
      };
      otmCreator.create({ api, configuration, template }).then(({ book }) => {
        expect(book).toEqual(expectedBook);
      });
    });
  });
});
