import {
  BookLoader,
  LoadProps,
  LoadReturns,
  BookLoaderProperties,
} from '../BookLoader';
import { ConfigurationPage, NormalPage, Page } from '../Page';
import { Word } from '../otm/Word';
import BareOtmLoader from '../otm/OtmLoader';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

function toWordCard(word: Word): NormalPage {
  return {
    id: word.entry.id.toString(),
    pageFormat: 'otm',
    data: { word },
  };
}

export const OtmLoader: BookLoader = {
  properties: {
    name: 'OTM Loader',
    id: '@skytomo221/otm-loader',
    version: '1.0.0',
    type: 'book-loader',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  configuration() {
    return { configuration };
  },
  async load(props: LoadProps): Promise<LoadReturns> {
    const { path } = props;
    const loader = new BareOtmLoader(path);
    try {
      const otm = await loader.asPromise();
      const { words, version, zpdicOnline, ...configuration } = otm.toPlain();
      return {
        book: {
          title: path,
          description: {
            specialPage: 'description',
            pageFormat: 'otm.description',
            data: { explanation: zpdicOnline?.explanation || '' },
          },
          configuration: {
            specialPage: 'configuration',
            pageFormat: 'otm.configuration',
            data: {
              version: version || 2,
              zpdicOnline: {
                enableMarkdown: zpdicOnline?.enableMarkdown || false,
              },
              ...configuration,
            },
          },
          pages: words.map(toWordCard),
        },
      };
    } catch (error) {
      throw error;
    }
  },
};
