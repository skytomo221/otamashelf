import { NormalPage } from '../../src/Page';
import { otmLayoutBuilder } from '../../src/extensions/otmLayoutBuilder';

describe('otmLayoutBuilder', () => {
  describe('layout', () => {
    it('returns layout', async () => {
      const { configuration } = otmLayoutBuilder.configuration();
      const page: NormalPage = {
        id: '3',
        pageFormat: 'otm',
        data: {
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
                        for: 'entry.form',
                        contents: ['見出し語'],
                      },
                      {
                        component: 'input',
                        id: 'entry.form',
                        name: '見出し語',
                        type: 'text',
                        reference: 'entry.form',
                      },
                      {
                        component: 'input',
                        id: 'entry.reset',
                        type: 'reset',
                        value: 'キャンセル',
                      },
                      {
                        component: 'input',
                        id: 'entry.submit',
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
                            for: 'translations.0.forms.0',
                            contents: ['訳語'],
                          },
                          {
                            component: 'input',
                            id: 'translations.0.forms.0',
                            name: '訳語',
                            reference: 'translations.0.forms.0',
                            type: 'text',
                          },
                          {
                            component: 'input',
                            id: 'translations.0.forms.0.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'translations.0.forms.0.submit',
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
                droppableId: 'contents',
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
                                for: 'contents.0.title',
                                contents: ['タイトル'],
                              },
                              {
                                component: 'input',
                                type: 'text',
                                id: 'contents.0.title',
                                name: 'contents.0.title',
                                reference: 'contents.0.title',
                              },
                            ],
                          },
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'contents.0.text',
                                contents: ['内容'],
                              },
                              {
                                component: 'textarea',
                                id: 'contents.0.markdown',
                                name: 'contents.0.markdown',
                                reference: 'contents.0.markdown',
                              },
                            ],
                          },
                          {
                            component: 'input',
                            id: 'contents.0.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'contents.0.submit',
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
                                    text: 'C言語で (*ptr)++; に相当する。',
                                  },
                                ],
                              },
                              {
                                component: 'button',
                                onClick: {
                                  type: 'page-updater',
                                  id: 'otm-page-updater',
                                  script: `contents/remove\t0`,
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
                                for: 'contents.1.title',
                                contents: ['タイトル'],
                              },
                              {
                                component: 'input',
                                type: 'text',
                                id: 'contents.1.title',
                                name: 'contents.1.title',
                                reference: 'contents.1.title',
                              },
                            ],
                          },
                          {
                            component: 'div',
                            contents: [
                              {
                                component: 'label',
                                for: 'contents.1.text',
                                contents: ['内容'],
                              },
                              {
                                component: 'textarea',
                                id: 'contents.1.markdown',
                                name: 'contents.1.markdown',
                                reference: 'contents.1.markdown',
                              },
                            ],
                          },
                          {
                            component: 'input',
                            id: 'contents.1.reset',
                            type: 'reset',
                            value: 'キャンセル',
                          },
                          {
                            component: 'input',
                            id: 'contents.1.submit',
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
                                component: 'button',
                                onClick: {
                                  type: 'page-updater',
                                  id: 'otm-page-updater',
                                  script: `contents/remove\t1`,
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
                    component: 'button',
                    contents: ['新しくコンテンツを追加する'],
                    onClick: {
                      id: 'otm-page-updater',
                      script: 'contents/add',
                      type: 'page-updater',
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
