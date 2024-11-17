import { LayoutBuilder, LayoutProps, LayoutReturns } from '../LayoutBuilder';
import {
  EditableSpan,
} from '../LayoutCard';
import { ConfigurationReturns } from '../ExtensionBase';
import { OtmCreatorTemplateFormat } from './otmCreatorTemplateFormat';

function title({ title }: OtmCreatorTemplateFormat): EditableSpan {
  return {
    component: 'editable',
    element: 'span',
    inputs: [
      {
        component: 'label',
        for: 'title',
        contents: ['OTM辞書のタイトル'],
      },
      {
        component: 'input',
        id: 'title',
        name: 'OTM辞書のタイトル',
        type: 'text',
        reference: 'title',
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

function snoj({ snoj }: OtmCreatorTemplateFormat): EditableSpan {
  return {
    component: 'editable',
    element: 'span',
    inputs: [
      {
        component: 'label',
        for: 'snoj',
        contents: ['Akrantiainの設定'],
      },
      {
        component: 'input',
        id: 'snoj',
        name: 'Akrantiainの設定',
        type: 'text',
        reference: 'snoj',
      },
      {
        component: 'input',
        id: `snoj.reset`,
        type: 'reset',
        value: 'キャンセル',
      },
      {
        component: 'input',
        id: `snoj.submit`,
        type: 'submit',
        value: '変更する',
      },
    ],
    outputs: ['Akrantiainの設定：', snoj, { component: 'edit-button' }],
  };
}

export const otmCreatorTemplateLayoutBuilder: LayoutBuilder = {
  properties: {
    name: 'OTM Creator Template Layout Builder',
    id: '@skytomo221/otm-creator-template-layout-builder',
    version: '1.0.0',
    type: 'layout-builder',
    author: 'skytomo221',
    pageFormatPattern: '^otm\\.book-parameters$',
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
        contents: [title(template), snoj(template)],
      },
    });
  },
};
