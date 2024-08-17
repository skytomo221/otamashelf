import {
  SearchIndexGenerator,
  GenerateProps,
  GenerateReturns,
} from '../SearchIndexGenerator';
import { ConfigurationReturns } from '../ExtensionBase';
import { toOtmPage } from './toOtmPage';

export const otmFormSearchIndexGenerator: SearchIndexGenerator = {
  properties: {
    name: 'OTM Form Search Index Generator',
    id: '@skytomo221/otm-form-search-index-generator',
    version: '1.0.0',
    type: 'search-index-generator',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  name(): Promise<{ name: string }> {
    return Promise.resolve({ name: '見出し' });
  },
  generate(props: GenerateProps): Promise<GenerateReturns> {
    const { pages } = props;
    return Promise.resolve({
      searchCards: pages.map(toOtmPage).map(
        ({
          id,
          data: {
            word: {
              entry: { form },
            },
          },
        }) => ({
          id,
          targets: [form],
        }),
      ),
    });
  },
};
