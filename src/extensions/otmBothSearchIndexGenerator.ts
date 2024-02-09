import { ConfigurationPage } from '../Page';
import {
  SearchIndexGenerator,
  GenerateProps,
  GenerateReturns,
} from '../SearchIndexGenerator';
import { ConfigurationReturns } from '../ExtensionBase';
import { toOtmPage } from './OtmPage';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const otmBothSearchIndexGenerator: SearchIndexGenerator = {
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
    return Promise.resolve({
      searchCards: pages.map(toOtmPage).map(
        ({
          id,
          data: {
            entry: { form },
            translations,
          },
        }) => ({
          id,
          targets: [form, ...translations.map(t => t.forms).flat()],
        }),
      ),
    });
  },
};
