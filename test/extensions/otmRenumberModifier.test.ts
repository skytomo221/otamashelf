import { Book } from '../../src/Book';
import Otamashelf from '../../src/Otamashelf';
import { NormalPage } from '../../src/Page';
import { otmRenumberModifier } from '../../src/extensions/otmRenumberModifier';

const page: NormalPage = {
  id: '42',
  pageFormat: 'otmIndex',
  data: {
    word: {
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
      const api = new Otamashelf().api('read');
      const { configuration } = otmRenumberModifier.defaultConfiguration();
      const script = {};
      otmRenumberModifier
        .modify({ book: book as Book, configuration, script })
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
