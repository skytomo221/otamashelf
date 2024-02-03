import { ConfigurationPage, NormalPage } from '../Page';
import {
  SearchIndexGenerator,
  GenerateProps,
  GenerateReturns,
} from '../SearchIndexGenerator';
import { Word } from '../otm/Word';
import { ConfigurationReturns } from '../ExtensionBase';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const OtmTranslationSearchIndexGenerator: SearchIndexGenerator = {
  properties: {
    name: 'OTM Both Search Index Generator',
    id: '@skytomo221/otm-both-search-index-generator',
    version: '1.0.0',
    type: 'search-index-generator',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  name(): Promise<{ name: string }> {
    return Promise.resolve({ name: '見出し+訳語' });
  },
  generate(props: GenerateProps): Promise<GenerateReturns> {
    const { pages } = props;
    const words = pages as (NormalPage & Word)[];
    return Promise.resolve({
      searchCards: words.map(({ id, entry: { form }, translations }) => ({
        id,
        targets: [form, ...translations.map(t => t.forms).flat()],
      })),
    });
  },
};
