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

export const otmAllSearchIndexGenerator: SearchIndexGenerator = {
  properties: {
    name: 'OTM All Search Index Generator',
    id: '@skytomo221/otm-all-search-index-generator',
    version: '1.0.0',
    type: 'search-index-generator',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  name(): Promise<{ name: string }> {
    return Promise.resolve({ name: '全部' });
  },
  generate(props: GenerateProps): Promise<GenerateReturns> {
    const { pages } = props;
    return Promise.resolve({
      searchCards: pages.map(toOtmPage).map(
        ({
          id,
          data: {
            contents,
            entry: { form },
            translations,
          },
        }) => ({
          id,
          targets: [
            form,
            ...translations.map(t => t.forms).flat(),
            ...contents.map(c => c.text),
          ],
        }),
      ),
    });
  },
};
