import { NormalPage } from '../../src/Page';
import { otmLayoutBuilder } from '../../src/extensions/otmLayoutBuilder';

describe('otmLayoutBuilder', () => {
  describe('layout', () => {
    it('returns layout', async () => {
      const { configuration } = otmLayoutBuilder.defaultConfiguration();
      const page: NormalPage = {
        id: '3',
        pageFormat: 'otm',
        data: {
          word: {
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
        },
      };
      otmLayoutBuilder.layout({ configuration, page }).then(layout => {
        expect(layout).toEqual({
          layout: {
            component: 'section',
            contents: [
              {
                component: 'h2',
                contents: [
                  {
                    component: 'editable',
                    element: 'span',
                    inputs: [
                      {
                        component: 'label',
                        for: 'word.entry.form',
                        contents: ['見出し語'],
                      },
                      {
                        component: 'input',
                        id: 'word.entry.form',
                        name: '見出し語',
                        type: 'text',
                        reference: 'word.entry.form',
                      },
                      {
                        component: 'input',
                        id: 'word.entry.reset',
                        type: 'reset',
                        value: 'キャンセル',
                      },
                      {
                        component: 'input',
                        id: 'word.entry.submit',
                        type: 'submit',
                        value: '変更する',
                      },
                    ],
                    outputs: ['+', { component: 'edit-button' }],
                  },
                  {
                    component: 'chip',
                    key: '命令',
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
                        key: '動詞',
                      },
                      {
                        component: 'editable',
                        element: 'span',
                        inputs: [
                          {
                            component: 'label',
                            for: 'word.translations.0.forms.0',
                            contents: ['訳語'],
                          },
                          {
                            component: 'input',
                            id: 'word.translations.0.forms.0',
                            name: '訳語',
                            reference: 'word.translations.0.forms.0',
                            type: 'text',
                          },
                          {
                            component: 'input',
                            id: 'word.translations.0.forms.0.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'word.translations.0.forms.0.submit',
                            type: 'submit',
                            value: '変更する',
                          },
                        ],
                        outputs: [
                          'ポインタの値をインクリメントする',
                          {
                            component: 'edit-button',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                component: 'droppable',
                droppableId: 'word.contents',
                type: 'content',
                contents: [
                  {
                    component: 'draggable',
                    contents: [
                      {
                        component: 'editable',
                        element: 'div',
                        inputs: [
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'word.contents.0.title',
                                contents: ['タイトル'],
                              },
                              {
                                component: 'input',
                                type: 'text',
                                id: 'word.contents.0.title',
                                name: 'word.contents.0.title',
                                reference: 'word.contents.0.title',
                              },
                            ],
                          },
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'word.contents.0.markdown',
                                contents: ['内容'],
                              },
                              {
                                component: 'textarea',
                                id: 'word.contents.0.markdown',
                                name: 'word.contents.0.markdown',
                                reference: 'word.contents.0.markdown',
                              },
                            ],
                          },
                          {
                            component: 'input',
                            id: 'word.contents.0.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'word.contents.0.submit',
                            type: 'submit',
                            value: '変更する',
                          },
                        ],
                        outputs: [
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'h3',
                                contents: ['C言語'],
                              },
                              {
                                component: 'p',
                                contents: [
                                  {
                                    component: 'mime',
                                    mime: 'text/markdown',
                                    text: 'C言語で `(*ptr)++;` に相当する。',
                                  },
                                ],
                              },
                              {
                                component: 'modify-page-button',
                                onClick: {
                                  id: '@skytomo221/otm-remove-content-page-modifier',
                                  script: {
                                    removeIndex: 0,
                                  },
                                },
                                contents: ['コンテンツを削除する'],
                              },
                              {
                                component: 'edit-button',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    component: 'draggable',
                    contents: [
                      {
                        component: 'editable',
                        element: 'div',
                        inputs: [
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'word.contents.1.title',
                                contents: ['タイトル'],
                              },
                              {
                                component: 'input',
                                type: 'text',
                                id: 'word.contents.1.title',
                                name: 'word.contents.1.title',
                                reference: 'word.contents.1.title',
                              },
                            ],
                          },
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'word.contents.1.markdown',
                                contents: ['内容'],
                              },
                              {
                                component: 'textarea',
                                id: 'word.contents.1.markdown',
                                name: 'word.contents.1.markdown',
                                reference: 'word.contents.1.markdown',
                              },
                            ],
                          },
                          {
                            component: 'input',
                            id: 'word.contents.1.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'word.contents.1.submit',
                            type: 'submit',
                            value: '変更する',
                          },
                        ],
                        outputs: [
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'h3',
                                contents: ['Pronunciation'],
                              },
                              {
                                component: 'p',
                                contents: [
                                  {
                                    component: 'mime',
                                    mime: 'text/markdown',
                                    text: 'plʌs',
                                  },
                                ],
                              },
                              {
                                component: 'modify-page-button',
                                onClick: {
                                  id: '@skytomo221/otm-remove-content-page-modifier',
                                  script: {
                                    removeIndex: 1,
                                  },
                                },
                                contents: ['コンテンツを削除する'],
                              },
                              {
                                component: 'edit-button',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                component: 'div',
                contents: [
                  {
                    component: 'modify-page-button',
                    contents: ['新しくコンテンツを追加する'],
                    onClick: {
                      id: '@skytomo221/otm-add-content-page-modifier',
                      script: {},
                    },
                  },
                ],
              },
            ],
          },
        });
      });
    });
  });
});
