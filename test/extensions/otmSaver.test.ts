import { otmSaver } from '../../src/extensions/otmSaver';

describe('otmSaver', () => {
  describe('search', () => {
    it('returns empty ids', async () => {
      const { configuration } = otmSaver.configuration();
      otmSaver
        .save({
          configuration,
          book: {
            fileFormat: {
              path: 'test/tmp.json',
              isDirectory: false,
              loadedTime: 0,
            },
            configuration: {
              specialPage: 'configuration',
              pageFormat: 'otm.configuration',
              data: {
                snoj: ',、',
                version: '2',
                zpdic: {},
                zpdicOnline: {},
              },
            },
            description: {
              specialPage: 'description',
              pageFormat: 'otm.description',
              data: { explanation: '' },
            },
            title: '',
            bookFormat: 'otm',
            pages: [],
          },
        })
        .then(({ savedTime }) => {
          expect(typeof savedTime).toBe('number');
        });
    });
  });
});
