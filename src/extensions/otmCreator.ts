import { Book } from '../Book';
import { BookCreator, CreateReturns, TemplateReturns } from '../BookCreator';
import { ConfigurationReturns } from '../ExtensionBase';
import { FileFormat } from '../FileFormat';
import { BookTemplatePage } from '../Page';
import { OtmBookParameters } from './otmBookParameters';
import { OtmCreatorTemplateFormat } from './otmCreatorTemplateFormat';

const data: OtmCreatorTemplateFormat = {
  path: '',
  title: '',
  snoj: '',
  version: '2',
  zpdic: {
    alphabetOrder: '',
    plainInformationTitles: [],
    informationTitleOrder: [],
    defaultWord: null,
  },
  zpdicOnline: {
    enableMarkdown: true,
    explanation: '',
  },
};

const template: BookTemplatePage = {
  specialPage: 'book-template',
  pageFormat: 'otm.book-parameters',
  data,
};

export const otmCreator: BookCreator = {
  properties: {
    name: 'OTM Creator',
    id: '@skytomo221/otm-creator',
    version: '1.0.0',
    type: 'book-creator',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  template(): Promise<TemplateReturns> {
    return Promise.resolve({ template });
  },
  create({ template }): Promise<CreateReturns> {
    const templateData = template.data as OtmCreatorTemplateFormat;
    const { title, snoj, version, zpdic, zpdicOnline } = templateData;
    const { explanation } = zpdicOnline;
    const bookParameters: OtmBookParameters = {
      specialPage: 'book-parameters',
      pageFormat: 'otm.book-parameters',
      data: {
        snoj,
        version,
        zpdic,
        zpdicOnline,
      },
    };
    const book: Pick<
      Book,
      'description' | 'bookFormat' | 'bookParameters' | 'pages' | 'title'
    > & {
      fileFormat: Pick<FileFormat, 'isDirectory'>;
    } = {
      pages: [],
      description: {
        specialPage: 'description',
        pageFormat: 'otm.description',
        data: { explanation },
      },
      bookParameters,
      title,
      bookFormat: 'otm',
      fileFormat: { isDirectory: false },
    };
    return Promise.resolve({ book });
  },
};
