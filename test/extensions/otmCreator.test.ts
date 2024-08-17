import { otmCreator } from '../../src/extensions/otmCreator';

describe('otmCreator', () => {
  describe('template', () => {
    it('returns template', () => {
      const { configuration } = otmCreator.defaultConfiguration();
      otmCreator.template({ configuration }).then(({ template }) => {
        const { specialPage, data } = template;
        expect(specialPage).toEqual('template');
        const { values } = data;
        expect(values).toEqual({
          path: '',
          title: '',
          version: 2,
          enableMarkdown: true,
          explanation: '',
          pronunciationTitle: 'Pronunciation',
          snoj: ',、',
          'zpdic.punctuations': ',、',
        });
      });
    });
    it('returns otm book', async () => {
      const { configuration } = otmCreator.defaultConfiguration();
      const { template } = await otmCreator.template({ configuration });
      const expectedBook = {
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
            version: 2,
            zpdic: {
              pronunciationTitle: 'Pronunciation',
              punctuations: [',', '、'],
            },
            zpdicOnline: {
              enableMarkdown: true,
              explanation: '',
            },
          },
        },
        title: '',
        bookFormat: 'otm',
      };
      otmCreator.create({ configuration, template }).then(({ book, path }) => {
        expect(book).toEqual(expectedBook);
        expect(path).toEqual('');
      });
    });
  });
});
