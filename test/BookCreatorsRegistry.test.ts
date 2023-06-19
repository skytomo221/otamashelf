import BookCreator, { TemplatesReturns } from '../src/BookCreator';
import BookCreatorsRegistry from '../src/BookCreatorsRegistry';
import OtmCreator from '../src/extensions/OtmCreator';

test('BookCreatorsRegistry instance of BookLoader', async () => {
  const bookCreatorsRegistry = new BookCreatorsRegistry();
  bookCreatorsRegistry.register(new OtmCreator());
  expect(bookCreatorsRegistry.get('otm-creator')).toBeInstanceOf(BookCreator);
});

test('BookCreatorsRegistry return keys', async () => {
  const bookCreatorsRegistry = new BookCreatorsRegistry();
  bookCreatorsRegistry.register(new OtmCreator());
  expect(Array.from(bookCreatorsRegistry.keys())).toEqual(['otm-creator']);
});

test('BookCreatorsRegistry return templates returns', async () => {
  const bookCreatorsRegistry = new BookCreatorsRegistry();
  bookCreatorsRegistry.register(new OtmCreator());
  expect(
    await bookCreatorsRegistry.templates('otm-creator', {
      action: 'templates',
    }),
  ).toEqual({
    action: 'templates',
    status: 'resolve',
    returns: {
      book: {
        pageCards: [],
        configration: {
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
    },
  });
});
