import { Book } from '../../src/Book';
import { NormalPage } from '../../src/Page';
import { otmRenumberModifier } from '../../src/extensions/otmRenumberModifier';

const page: NormalPage = {
  id: '42',
  pageFormat: 'otmIndex',
  data: {
    entry: {
      id: 42,
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
const book: Pick<Book, 'title' | 'bookFormat' | 'pages'> = {
  pages: [page],
  title: '',
  bookFormat: 'otm',
};

describe('otmRenumberModifier', () => {
  describe('modify', () => {
    it('renumbers otm book', () => {
      const { configuration } = otmRenumberModifier.configuration();
      const script = {};
      otmRenumberModifier
        .modify({ book, configuration, script })
        .then(({ book }) => {
          expect(book).toEqual({
            ...book,
            pages: [
              {
                ...page,
                id: '1',
              },
            ],
          });
        });
    });
  });
});
