import { Book } from '../Book';
import { BookCreator, CreateReturns, TemplateReturns } from '../BookCreator';
import { ConfigurationReturns } from '../ExtensionBase';
import { ConfigurationPage, TemplatePage } from '../Page';
import {
  BooleanValue,
  FileValue,
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
  path: string;
  enableMarkdown: boolean;
  explanation: string;
  pronunciationTitle: string;
  snoj: string;
  title: string;
  version: number;
  'zpdic.punctuations': string;
};

type TemplateProperties = {
  path: FileValue;
  enableMarkdown: BooleanValue;
  explanation: StringValue;
  pronunciationTitle: StringValue;
  snoj: StringValue;
  title: StringValue;
  version: NumberValue;
  'zpdic.punctuations': StringValue;
};

type TemplateData = SimpleConfigurationFormatV1 & {
  title: string;
  values: TemplateValues;
  properties: TemplateProperties;
};

const templateData: TemplateData = {
  title: '新しいOTM-JSON辞書',
  values: {
    path: '',
    title: '',
    version: 2,
    enableMarkdown: true,
    explanation: '',
    pronunciationTitle: 'Pronunciation',
    snoj: ',、',
    'zpdic.punctuations': ',、',
  },
  properties: {
    path: {
      title: 'パス',
      description: '辞書の保存先を指定します。',
      type: 'file',
      default: '',
      accept: '.otm.json',
    },
    title: {
      title: 'タイトル',
      description: '辞書のタイトルを指定します。',
      type: 'string',
      default: '',
    },
    enableMarkdown: {
      title: 'Markdownの有効化/無効化',
      description:
        'これを有効にしておくと、単語データの説明欄を Markdown 形式で書くことができるようになります。',
      type: 'boolean',
      default: true,
    },
    explanation: {
      title: '説明',
      description:
        '辞書の説明を指定します。Markdown形式に対応しています（ZpDIC Onlineは一部対応）。',
      type: 'string',
      default: '',
      multilineText: true,
    },
    pronunciationTitle: {
      title: '発音データの分類名',
      description:
        'OTM-JSON形式で出力する際に、発音データを格納しておく説明欄の分類名を指定します。',
      type: 'string',
      default: 'Pronunciation',
    },
    snoj: {
      title: '発音規則（Akrantiain）',
      markdownDescription:
        'Akrantiainエンジンを使用して、スペルから単語の発音を生成します。単語に個別の発音が指定されているときは、そちらが優先されます。詳細は[ドキュメント](https://zpdic.ziphil.com/document)を参照してください。',
      type: 'string',
      default: ',、',
      multilineText: true,
    },
    version: {
      title: 'バージョン',
      description:
        'OTM-JSON形式のバージョンを指定します。特別な理由がない限り、2を指定してください。',
      type: 'number',
      default: 2,
    },
    'zpdic.punctuations': {
      title: '区切り記号',
      description:
        'ZpDICで、訳語と変化形を編集するときに用いる区切り文字を指定します。',
      type: 'string',
      default: ',、',
    },
  },
};

const template: TemplatePage = {
  specialPage: 'template',
  pageFormat: 'simple-configuration-format-v1',
  data: templateData,
};

export const OtmCreator: BookCreator = {
  properties: {
    name: 'OTM Creator',
    id: '@skytomo221/otm-creator',
    version: '1.0.0',
    type: 'book-creator',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  template(): Promise<TemplateReturns> {
    return Promise.resolve({ template });
  },
  create({ template }): Promise<CreateReturns> {
    const templateData = template.data as TemplateData;
    const {
      path,
      title,
      version,
      enableMarkdown,
      explanation,
      pronunciationTitle,
      snoj,
      'zpdic.punctuations': punctuations,
    } = templateData.values;
    const zpdic = {
      pronunciationTitle,
      punctuations: punctuations.split(''),
    };
    const zpdicOnline = { enableMarkdown, explanation };
    const book: Pick<
      Book,
      'configuration' | 'description' | 'bookFormat' | 'pages' | 'title'
    > = {
      pages: [],
      description: {
        specialPage: 'description',
        pageFormat: 'otm.description',
        data: { explanation },
      },
      configuration: {
        specialPage: 'configuration',
        pageFormat: 'otm.configuration',
        data: {
          snoj,
          version,
          zpdic,
          zpdicOnline,
        },
      },
      title,
      bookFormat: 'otm',
    };
    return Promise.resolve({ book, path });
  },
};
