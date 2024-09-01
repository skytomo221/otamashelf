import {
  BookLoader,
  LoadProps,
  LoadReturns,
} from '../BookLoader';
import { NormalPage } from '../Page';
import { Word } from '../otm/Word';
import BareOtmLoader from '../otm/OtmLoader';
import { OtmBookParameters } from './otmBookParameters';

function toWordCard(word: Word): NormalPage {
  return {
    id: word.entry.id.toString(),
    pageFormat: 'otm',
    data: { word },
  };
}

export const otmLoader: BookLoader = {
  properties: {
    name: 'OTM Loader',
    id: '@skytomo221/otm-loader',
    version: '1.0.0',
    type: 'book-loader',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  defaultConfiguration() {
    return { configuration: {}, configurationsSchema: {} };
  },
  async load(props: LoadProps): Promise<LoadReturns> {
    const { path } = props;
    const loader = new BareOtmLoader(path);
    try {
      const otm = await loader.asPromise();
      const { words, version, zpdic, zpdicOnline } = otm.toPlain();
      const bookParameters: OtmBookParameters = {
        specialPage: 'book-parameters',
        pageFormat: 'otm.book-parameters',
        data: {
          snoj: '',
          version: (version || 2).toString(),
          zpdic: {
            alphabetOrder: zpdic?.alphabetOrder || '',
            plainInformationTitles: zpdic?.plainInformationTitles || [],
            informationTitleOrder: zpdic?.informationTitleOrder || [],
            defaultWord: zpdic?.defaultWord || null,
          },
          zpdicOnline: {
            enableMarkdown: zpdicOnline?.enableMarkdown || false,
            explanation: zpdicOnline?.explanation || '',
          },
        },
      };
      return {
        book: {
          title: path,
          description: {
            specialPage: 'description',
            pageFormat: 'otm.description',
            data: { explanation: zpdicOnline?.explanation || '' },
          },
          bookParameters,
          pages: words.map(toWordCard),
        },
      };
    } catch (error) {
      throw error;
    }
  },
};
