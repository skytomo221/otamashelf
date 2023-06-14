import LayoutBuilderRegistry from '../src/LayoutBuilderRegistry';
import OtmLayoutBuilder from '../src/extensions/OtmLayoutBuilder';

describe('LayoutBuilderRegistry', () => {
  describe('layout', () => {
    it('return layout', async () => {
      const layoutBuilderRegistry = new LayoutBuilderRegistry();
      layoutBuilderRegistry.register(new OtmLayoutBuilder());
      expect(
        await layoutBuilderRegistry.layout('otm-layout-builder', {
          id: '3',
          title: '+',
          entry: {
            id: 3,
            form: '+',
          },
          translations: [
            {
              title: '動詞',
              forms: ['ポインタの値をインクリメントする'],
            },
          ],
          tags: ['命令'],
          contents: [
            {
              title: 'C言語',
              text: 'C言語で (*ptr)++; に相当する。',
              markdown: 'C言語で `(*ptr)++;` に相当する。',
            },
            {
              title: 'Pronunciation',
              text: 'plʌs',
            },
          ],
          variations: [],
          relations: [
            {
              title: '対義語',
              entry: {
                id: 4,
                form: '-',
              },
            },
          ],
        }),
      ).toEqual({
        layout: {
          component: 'recursion',
          contents: [
            {
              component: 'h2',
              contents: [
                {
                  component: 'text/plain',
                  reference: 'entry.form',
                },
                {
                  component: 'chip',
                  key: {
                    component: 'text/plain',
                    text: '命令',
                  },
                },
              ],
            },
            {
              component: 'p',
              contents: [
                {
                  component: 'span',
                  contents: [
                    {
                      component: 'chip',
                      key: {
                        component: 'text/plain',
                        text: '動詞',
                      },
                    },
                    {
                      component: 'text/plain',
                      reference: 'translations.0.forms.0',
                    },
                  ],
                },
              ],
            },
            {
              baseReference: 'contents',
              component: 'draggable-array',
              content: {
                component: 'recursion',
                contents: [
                  {
                    component: 'h3',
                    contents: [
                      {
                        component: 'text/plain',
                        reference: '.title',
                      },
                    ],
                  },
                  {
                    component: 'p',
                    contents: [
                      {
                        component: 'text/markdown',
                        reference: '.text',
                      },
                    ],
                  },
                ],
              },
            },
            {
              component: 'div',
              contents: [
                {
                  component: 'button',
                  contents: [
                    {
                      component: 'text/plain',
                      text: '新しくコンテンツを追加する',
                    },
                  ],
                  onClick: 'contents/add',
                },
              ],
            },
          ],
        },
      });
    });
  });
  describe('indexes', () => {
    it('return indexes', async () => {
      const layoutBuilderRegistry = new LayoutBuilderRegistry();
      layoutBuilderRegistry.register(new OtmLayoutBuilder());
      expect(
        await layoutBuilderRegistry.indexes('otm-layout-builder', [
          {
            id: '3',
            title: '+',
            entry: {
              id: 3,
              form: '+',
            },
            translations: [
              {
                title: '動詞',
                forms: ['ポインタの値をインクリメントする'],
              },
            ],
            tags: ['命令'],
            contents: [
              {
                title: 'C言語',
                text: 'C言語で (*ptr)++; に相当する。',
                markdown: 'C言語で `(*ptr)++;` に相当する。',
              },
              {
                title: 'Pronunciation',
                text: 'plʌs',
              },
            ],
            variations: [],
            relations: [
              {
                title: '対義語',
                entry: {
                  id: 4,
                  form: '-',
                },
              },
            ],
          },
        ]),
      ).toEqual([
        {
          layout: {
            component: 'recursion',
            contents: [
              {
                component: 'div',
                contents: [{ component: 'text/plain', text: '+' }],
              },
            ],
          },
        },
      ]);
    });
  });
});
