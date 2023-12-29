import Ajv, { JSONSchemaType } from 'ajv';

import { LayoutBuilderProperties } from '../ExtensionProperties';
import LayoutBuilder from '../LayoutBuilder';
import { LayoutCard, Chip, LayoutComponent, Reference, P } from '../LayoutCard';
import { PageCard } from '../PageCard';
import { Translation } from '../otm/Translation';
import { Word, wordScheme } from '../otm/Word';
import { contentScheme } from '../otm/Content';

export default class OtmLayoutBuilder extends LayoutBuilder {
  public properties: LayoutBuilderProperties = {
    action: 'properties',
    name: 'OTM Layout Builder',
    id: 'otm-layout-builder',
    version: '0.1.0',
    type: 'layout-builder',
    author: 'skytomo221',
    bookFormat: ['otm'],
    dependentPageUpdaters: ['otm-page-updater'],
  };

  public readonly layout = async (word: PageCard): Promise<LayoutCard> => {
    const ajv = new Ajv();
    const valid = ajv.validate(wordScheme, word);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    const rawContents = {
      component: 'droppable',
      droppableId: 'contents',
      type: 'content',
      contents: word.contents.map((content, index) => {
        const valid = ajv.validate(contentScheme, content);
        if (!valid) {
          throw new Error(ajv.errorsText());
        }
        return {
          component: 'draggable',
          contents: [
            {
              component: 'div',
              contents: [
                {
                  component: 'h3',
                  contents: [
                    {
                      component: 'reference',
                      mime: 'text/plain',
                      reference: `contents.${index}.title`,
                    },
                  ],
                },
                {
                  component: 'p',
                  contents: [
                    {
                      component: 'reference',
                      mime: 'text/markdown',
                      reference: `contents.${index}.text`,
                    },
                  ],
                },
                {
                  component: 'button',
                  onClick: {
                    type: 'page-updater',
                    id: 'otm-page-updater',
                    script: `contents/remove\t${index}`,
                  },
                  contents: [
                    {
                      component: 'text',
                      mime: 'text/plain',
                      text: 'コンテンツを削除する',
                    },
                  ],
                },
              ],
            },
          ],
          key: index,
        };
      }),
    } as LayoutComponent;
    const contents: LayoutComponent[] = [
      rawContents,
      {
        component: 'div',
        contents: [
          {
            component: 'button',
            onClick: {
              type: 'page-updater',
              id: 'otm-page-updater',
              script: 'contents/add',
            },
            contents: [
              {
                component: 'text',
                mime: 'text/plain',
                text: '新しくコンテンツを追加する',
              },
            ],
          },
        ],
      },
    ];
    const translations = (word.translations ?? []).map(
      (translation: Translation, index: number): P => ({
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
                  text: translation.title,
                },
              },
              ...translation.forms.map(
                (_, twIndex): Reference => ({
                  component: 'reference',
                  mime: 'text/plain',
                  reference: `translations.${index}.forms.${twIndex}`,
                }),
              ),
            ],
          },
        ],
      }),
    );
    return {
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
              ...(word.tags ?? []).map(
                (tag): Chip => ({
                  component: 'chip',
                  key: { component: 'text', mime: 'text/plain', text: tag },
                }),
              ),
            ],
          },
          ...translations,
          ...contents,
        ],
      },
    };
  };

  private wordsScheme: JSONSchemaType<Word[]> = {
    type: 'array',
    items: wordScheme,
  };

  public readonly indexes = async (
    words: PageCard[],
  ): Promise<LayoutCard[]> => {
    const ajv = new Ajv();
    const valid = ajv.validate(this.wordsScheme, words);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    return words.map(word => ({
      layout: {
        component: 'recursion',
        contents: [
          {
            component: 'div',
            contents: [
              {
                component: 'text',
                mime: 'text/plain',
                text: (word as unknown as Word).entry.form,
              } as LayoutComponent,
            ],
          },
        ],
      },
    }));
  };
}
