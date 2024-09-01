import { LayoutBuilder, LayoutProps, LayoutReturns } from '../LayoutBuilder';
import {
  EditableSpan,
} from '../LayoutCard';
import { ConfigurationReturns } from '../ExtensionBase';
import { OtmCreatorTemplateFormat } from './otmCreatorTemplateFormat';

function path({ path }: OtmCreatorTemplateFormat): EditableSpan {
  return {
    component: 'editable',
    element: 'span',
    inputs: [
      {
        component: 'label',
        for: 'path',
        contents: ['見出し語'],
      },
      {
        component: 'input',
        id: 'path',
        name: '保存先',
        type: 'text',
        reference: 'path',
      },
      {
        component: 'input',
        id: `path.reset`,
        type: 'reset',
        value: 'キャンセル',
      },
      {
        component: 'input',
        id: `path.submit`,
        type: 'submit',
        value: '変更する',
      },
    ],
    outputs: ['保存先：', path, { component: 'edit-button' }],
  };
}

function title({ title }: OtmCreatorTemplateFormat): EditableSpan {
  return {
    component: 'editable',
    element: 'span',
    inputs: [
      {
        component: 'label',
        for: 'title',
        contents: ['見出し語'],
      },
      {
        component: 'input',
        id: 'title',
        name: 'OTM辞書のタイトル',
        type: 'text',
        reference: 'path',
      },
      {
        component: 'input',
        id: `title.reset`,
        type: 'reset',
        value: 'キャンセル',
      },
      {
        component: 'input',
        id: `title.submit`,
        type: 'submit',
        value: '変更する',
      },
    ],
    outputs: ['OTM辞書のタイトル：', title, { component: 'edit-button' }],
  };
}

export const otmCreatorTemplateLayoutBuilder: LayoutBuilder = {
  properties: {
    name: 'OTM Creator Template Layout Builder',
    id: '@skytomo221/otm-creator-template-layout-builder',
    version: '1.0.0',
    type: 'layout-builder',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
    dependentPageUpdaters: [],
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  layout({ page }: LayoutProps): Promise<LayoutReturns> {
    const { data } = page;
    const template = data as OtmCreatorTemplateFormat;
    return Promise.resolve({
      layout: {
        component: 'section',
        contents: [path(template), title(template)],
      },
    });
  },
};
