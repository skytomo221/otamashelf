import { otmLoader } from '../../src/extensions/otmLoader';

describe('otmLoader', () => {
  describe('load', () => {
    it('returns empty ids', async () => {
      const { configuration } = otmLoader.configuration();
      otmLoader
        .load({
          configuration,
          path: 'data/sample.json',
        })
        .then(({ book }) => {
          const { description, configuration, title } = book;
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
          expect(configuration).toEqual({
            specialPage: 'configuration',
            pageFormat: 'otm.configuration',
            data: {
              humanLanguage: false,
              version: 2,
              zpdic: {
                pronunciationTitle: 'Pronunciation',
                punctuations: [',', '、'],
              },
              zpdicOnline: {
                enableMarkdown: true,
              },
            },
          });
          expect(title).toEqual('data/sample.json');
        });
    });
  });
});
