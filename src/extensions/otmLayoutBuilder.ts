import Ajv from 'ajv';

import {
  LayoutBuilder,
  LayoutProps,
  LayoutReturns,
} from '../LayoutBuilder';
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
import { ConfigurationPage } from '../Page';
import { ConfigurationReturns } from '../ExtensionBase';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

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
          for: `word.contents.${index}.text`,
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
              text: content.text,
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
          component: 'button',
          onClick: {
            type: 'page-updater',
            id: 'otm-page-updater',
            script: 'contents/add',
          },
          contents: ['新しくコンテンツを追加する'],
        },
      ],
    },
  ];
}

export const otmLayoutBuilder: LayoutBuilder = {
  properties: {
    name: 'OTM Layout Builder',
    id: '@skytomo221/otm-layout-builder',
    version: '1.0.0',
    type: 'layout-builder',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
    dependentPageUpdaters: ['@skytomo221/otm-page-updater'],
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  layout({ page }: LayoutProps): Promise<LayoutReturns> {
    const ajv = new Ajv();
    const { data: { word } } = page;
    const valid = ajv.validate(wordScheme, word);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
    return Promise.resolve({
      layout: {
        component: 'section',
        contents: [entry(word), ...translations(word), ...contents(word)],
      },
    });
  },
};
