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
                  component: 'reference',
                  mime: 'text/plain',
                  reference: 'entry.form',
                },
                {
                  component: 'chip',
                  key: {
                    component: 'text',
                    mime: 'text/plain',
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
                        component: 'text',
                        mime: 'text/plain',
                        text: '動詞',
                      },
                    },
                    {
                      component: 'reference',
                      mime: 'text/plain',
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
                        component: 'reference',
                        mime: 'text/plain',
                        reference: '.title',
                      },
                    ],
                  },
                  {
                    component: 'p',
                    contents: [
                      {
                        component: 'reference',
                        mime: 'text/markdown',
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
                      component: 'text',
                      mime: 'text/plain',
                      text: '新しくコンテンツを追加する',
                    },
                  ],
                  onClick: {
                    'id': 'otm-page-updater',
                    'script': 'contents/add',
                    'type': 'page-updater',
                  },
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
                contents: [{ component: 'text', mime: 'text/plain', text: '+' }],
              },
            ],
          },
        },
      ]);
    });
  });
});
