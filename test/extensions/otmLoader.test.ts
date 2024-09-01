import { otmLoader } from '../../src/extensions/otmLoader';

describe('otmLoader', () => {
  describe('load', () => {
    it('returns empty ids', async () => {
      const { configuration } = otmLoader.defaultConfiguration();
      otmLoader
        .load({
          configuration,
          path: 'data/sample.json',
        })
        .then(({ book }) => {
          const { description, bookParameters, title } = book;
          expect(description).toEqual({
            specialPage: 'description',
            pageFormat: 'otm.description',
            data: {
              explanation: `OTM-JSON辞書のサンプル辞書です。  
[Unlicense](http://unlicense.org/)で公開されています。  
テストコードを書くときとかにご自由にお使いください。

たまたま256番目の辞書になってしまいました。
`,
            },
          });
          expect(bookParameters).toEqual({
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
                explanation:
                  `OTM-JSON辞書のサンプル辞書です。  
[Unlicense](http://unlicense.org/)で公開されています。  
テストコードを書くときとかにご自由にお使いください。

たまたま256番目の辞書になってしまいました。
`,
              },
            },
          });
          expect(title).toEqual('data/sample.json');
        });
    });
  });
});
