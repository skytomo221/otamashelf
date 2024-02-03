import { ConfigurationPage, TemplatePage } from '../Page';
import { PageCreator, CreateReturns, TemplateReturns } from '../PageCreator';
import {
  NumberValue,
  SimpleConfigurationFormatV1,
  StringValue,
} from './SimpleConfigurationFormatV1';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

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

function nextId(ids: number[]): number {
  return ids.reduce((a, b) => Math.max(a, b)) + 1;
}

export const OtmPageCreator: PageCreator = {
  properties: {
    name: 'OTM Page Creator',
    id: '@skytomo221/otm-page-creator',
    version: '1.0.0',
    type: 'page-creator',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  configuration() {
    return { configuration };
  },
  template(): Promise<TemplateReturns> {
    return Promise.resolve({ template });
  },
  create({ book, template }): Promise<CreateReturns> {
    const templateData = template.data as TemplateData;
    const { id, title } = templateData.values;
    const { indexes } = book;
    const newId = indexes.some(index => index.id === id.toString())
      ? nextId(indexes.map(({ id }) => Number(id)))
      : id;
    return Promise.resolve({
      page: {
        id: newId.toString(),
        pageFormat: 'otm',
        data: {
          entry: {
            id: newId,
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
