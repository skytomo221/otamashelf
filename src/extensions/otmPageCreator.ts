import { TemplatePage } from '../Page';
import { PageCreator, CreateReturns, TemplateReturns } from '../PageCreator';
import {
  NumberValue,
  SimpleConfigurationFormatV1,
  StringValue,
} from './SimpleConfigurationFormatV1';

type TemplateValues = {
  id: number;
  title: string;
};

type TemplateProperties = {
  id: NumberValue;
  title: StringValue;
};

type TemplateData = SimpleConfigurationFormatV1 & {
  title: string;
  values: TemplateValues;
  properties: TemplateProperties;
};

const templateData: TemplateData = {
  title: '新しい単語',
  values: {
    id: -1,
    title: '',
  },
  properties: {
    id: {
      title: 'ID',
      description: '単語のIDを指定します。',
      type: 'number',
      default: -1,
    },
    title: {
      title: '見出し語',
      description: '単語の見出し語を指定します。',
      type: 'string',
      default: '',
    },
  },
};

const template: TemplatePage = {
  specialPage: 'template',
  pageFormat: 'simple-configuration-format-v1',
  data: templateData,
};

export const otmPageCreator: PageCreator = {
  properties: {
    name: 'OTM Page Creator',
    id: '@skytomo221/otm-page-creator',
    version: '1.0.0',
    type: 'page-creator',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  defaultConfiguration() {
    return { configuration: {}, configurationsSchema: {} };
  },
  template(): Promise<TemplateReturns> {
    return Promise.resolve({ template });
  },
  create({ template }): Promise<CreateReturns> {
    const templateData = template.data as TemplateData;
    const { id, title } = templateData.values;
    return Promise.resolve({
      page: {
        pageFormat: 'otm',
        data: {
          entry: {
            id,
            form: title,
          },
          translations: [],
          tags: [],
          contents: [],
          variations: [],
          relations: [],
        },
      },
    });
  },
};
