import { PageTemplatePage } from '../Page';
import { PageCreator, CreateReturns, TemplateReturns } from '../PageCreator';
import { Word } from '../otm/Word';

const templateData: Word = {
  entry: {
    id: -1,
    form: '新規の単語',
  },
  translations: [],
  tags: [],
  contents: [],
  variations: [],
  relations: [],
};

const template: PageTemplatePage = {
  specialPage: 'page-template',
  pageFormat: 'otm',
  data: { word: templateData },
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
    const { data } = template;
    return Promise.resolve({
      page: {
        pageFormat: 'otm',
        data,
      },
    });
  },
};
