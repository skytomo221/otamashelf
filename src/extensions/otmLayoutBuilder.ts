import Ajv from 'ajv';

import { LayoutBuilder, LayoutProps, LayoutReturns } from '../LayoutBuilder';
import {
  Chip,
  LayoutComponent,
  EditableSpan,
  FormDivComponent,
} from '../LayoutCard';
import { Translation } from '../otm/Translation';
import { Word, wordScheme } from '../otm/Word';
import { Content } from '../otm/Content';
import { Entry } from '../otm/Entry';
import { ConfigurationReturns } from '../ExtensionBase';
import { Relation } from '../otm/Relation';
import { Api } from '../Api';
import { NormalPage, Page } from '../Page';
import { NormalPageReference } from '../PageReference';

function rawEntry(entry: Entry): EditableSpan {
  const { form } = entry;
  return {
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
        id: `word.entry.reset`,
        type: 'reset',
        value: 'キャンセル',
      },
      {
        component: 'input',
        id: `word.entry.submit`,
        type: 'submit',
        value: '変更する',
      },
    ],
    outputs: [form, { component: 'edit-button' }],
  };
}

function tag(tag: string): Chip {
  return { component: 'chip', key: tag };
}

function tags(tags: string[]): Chip[] {
  return tags.map(tag);
}

function entry(word: Word): LayoutComponent {
  const { entry } = word;
  return {
    component: 'h2',
    contents: [rawEntry(entry), ...tags(word.tags ?? [])],
  };
}

function form(translationIndex: number) {
  return function (form: string, index: number): EditableSpan {
    return {
      component: 'editable',
      element: 'span',
      inputs: [
        {
          component: 'label',
          for: `word.translations.${translationIndex}.forms.${index}`,
          contents: ['訳語'],
        },
        {
          component: 'input',
          id: `word.translations.${translationIndex}.forms.${index}`,
          name: '訳語',
          type: 'text',
          reference: `word.translations.${translationIndex}.forms.${index}`,
        },
        {
          component: 'input',
          id: `word.translations.${translationIndex}.forms.${index}.reset`,
          type: 'reset',
          value: 'キャンセル',
        },
        {
          component: 'input',
          id: `word.translations.${translationIndex}.forms.${index}.submit`,
          type: 'submit',
          value: '変更する',
        },
      ],
      outputs: [form, { component: 'edit-button' }],
    };
  };
}

function translation(translation: Translation, index: number): LayoutComponent {
  return {
    component: 'p',
    contents: [
      {
        component: 'span',
        contents: [
          { component: 'chip', key: translation.title },
          ...translation.forms.map(form(index)),
        ],
      },
    ],
  };
}

function translations(word: Word): LayoutComponent[] {
  return (word.translations ?? []).map(translation);
}

function rawContentsInputs(index: number): FormDivComponent[] {
  return [
    {
      component: 'div',
      contents: [
        {
          component: 'label',
          for: `word.contents.${index}.title`,
          contents: ['タイトル'],
        },
        {
          component: 'input',
          type: 'text',
          id: `word.contents.${index}.title`,
          name: `word.contents.${index}.title`,
          reference: `word.contents.${index}.title`,
        },
      ],
    },
    {
      component: 'div',
      contents: [
        {
          component: 'label',
          for: `word.contents.${index}.markdown`,
          contents: ['内容'],
        },
        {
          component: 'textarea',
          id: `word.contents.${index}.markdown`,
          name: `word.contents.${index}.markdown`,
          reference: `word.contents.${index}.markdown`,
        },
      ],
    },
    {
      component: 'input',
      id: `word.contents.${index}.reset`,
      type: 'reset',
      value: 'キャンセル',
    },
    {
      component: 'input',
      id: `word.contents.${index}.submit`,
      type: 'submit',
      value: '変更する',
    },
  ];
}

function rawContentsOutputs(
  content: Content,
  index: number,
): LayoutComponent[] {
  return [
    {
      component: 'div',
      contents: [
        {
          component: 'h3',
          contents: [content.title],
        },
        {
          component: 'p',
          contents: [
            {
              component: 'mime',
              mime: 'text/markdown',
              text: content.markdown ?? content.text,
            },
          ],
        },
        {
          component: 'modify-page-button',
          onClick: {
            id: '@skytomo221/otm-remove-content-page-modifier',
            script: { removeIndex: index },
          },
          contents: ['コンテンツを削除する'],
        },
        {
          component: 'edit-button',
        },
      ],
    },
  ];
}

function rawContent(content: Content, index: number): LayoutComponent {
  return {
    component: 'draggable',
    contents: [
      {
        component: 'editable',
        element: 'div',
        inputs: rawContentsInputs(index),
        outputs: rawContentsOutputs(content, index),
      },
    ],
  };
}

function rawContents(word: Word): LayoutComponent {
  return {
    component: 'droppable',
    droppableId: 'word.contents',
    type: 'content',
    contents: word.contents.map(rawContent),
  };
}

function contents(word: Word): LayoutComponent[] {
  return [
    rawContents(word),
    {
      component: 'div',
      contents: [
        {
          component: 'modify-page-button',
          onClick: {
            id: '@skytomo221/otm-add-content-page-modifier',
            script: {},
          },
          contents: ['新しくコンテンツを追加する'],
        },
      ],
    },
  ];
}

function rawRelationInputs(index: number): FormDivComponent[] {
  return [
    {
      component: 'div',
      contents: [
        {
          component: 'label',
          for: `word.relations.${index}.title`,
          contents: ['タイトル'],
        },
        {
          component: 'input',
          type: 'text',
          id: `word.relations.${index}.title`,
          name: `word.relations.${index}.title`,
          reference: `word.relations.${index}.title`,
        },
      ],
    },
    {
      component: 'div',
      contents: [
        {
          component: 'label',
          for: `word.relations.${index}.entry.id`,
          contents: ['関連語'],
        },
        {
          component: 'input',
          type: 'number',
          id: `word.relations.${index}.entry.id`,
          name: `word.relations.${index}.entry.id`,
          reference: `word.relations.${index}.entry.id`,
        },
      ],
    },
    {
      component: 'input',
      id: `word.relations.${index}.reset`,
      type: 'reset',
      value: 'キャンセル',
    },
    {
      component: 'input',
      id: `word.relations.${index}.submit`,
      type: 'submit',
      value: '変更する',
    },
  ];
}

async function rawRelationOutputs(
  api: Api,
  bookPath: string,
  relation: Relation,
  index: number,
): Promise<LayoutComponent[]> {
  const {
    entry: { id },
  } = relation;
  const page = (
    (await api(bookPath, `$[?(@.data.word.entry.id==${id})]`)) as NormalPage[]
  )[0];
  const pageReference: NormalPageReference = {
    type: 'normal',
    bookPath,
    pageId: page.id,
  };
  return [
    {
      component: 'div',
      contents: [
        {
          component: 'h3',
          contents: [relation.title],
        },
        {
          component: 'p',
          contents: [
            {
              component: 'link',
              pageReference,
            },
          ],
        },
        {
          component: 'modify-page-button',
          onClick: {
            id: '@skytomo221/otm-remove-content-page-modifier',
            script: { removeIndex: index },
          },
          contents: ['コンテンツを削除する'],
        },
        {
          component: 'edit-button',
        },
      ],
    },
  ];
}

async function rawRelation(
  api: Api,
  bookPath: string,
  relation: Relation,
  index: number,
): Promise<LayoutComponent> {
  return {
    component: 'draggable',
    contents: [
      {
        component: 'editable',
        element: 'div',
        inputs: rawRelationInputs(index),
        outputs: await rawRelationOutputs(api, bookPath, relation, index),
      },
    ],
  };
}

async function rawRelations(
  api: Api,
  bookPath: string,
  word: Word,
): Promise<LayoutComponent> {
  const relations = await Promise.all(
    word.relations.map(async (relation, index) => {
      return await rawRelation(api, bookPath, relation, index);
    }),
  );
  return {
    component: 'droppable',
    droppableId: 'word.relations',
    type: 'relation',
    contents: relations,
  };
}

async function relations(
  api: Api,
  bookPath: string,
  word: Word,
): Promise<LayoutComponent[]> {
  return [
    await rawRelations(api, bookPath, word),
    {
      component: 'div',
      contents: [
        {
          component: 'modify-page-button',
          onClick: {
            id: '@skytomo221/otm-add-relation-page-modifier',
            script: {},
          },
          contents: ['新しく関連語を追加する'],
        },
      ],
    },
  ];
}

function hasBookPath(page: Page): page is Page & { bookPath: string } {
  return (page as any)?.bookPath !== undefined;
}

export const otmLayoutBuilder: LayoutBuilder = {
  properties: {
    name: 'OTM Layout Builder',
    id: '@skytomo221/otm-layout-builder',
    version: '1.0.0',
    type: 'layout-builder',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
    dependentPageUpdaters: [
      '@skytomo221/otm-add-content-page-modifier',
      '@skytomo221/otm-remove-content-page-modifier',
    ],
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  async layout({ api, page }: LayoutProps): Promise<LayoutReturns> {
    const ajv = new Ajv();
    const {
      data: { word },
    } = page;
    const bookPath = hasBookPath(page) ? page.bookPath : '';
    const valid = ajv.validate(wordScheme, word);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    return Promise.resolve({
      layout: {
        component: 'section',
        contents: [
          entry(word),
          ...translations(word),
          ...contents(word),
          ...(await relations(api, bookPath, word)),
        ],
      },
    });
  },
};
