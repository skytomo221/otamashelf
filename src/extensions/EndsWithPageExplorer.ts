import { ConfigurationPage } from '../Page';
import {
  PageExplorer,
  NameReturns,
  SearchProps,
  SearchReturns,
} from '../PageExplorer';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const endsWithPageExplorer: PageExplorer = {
  properties: {
    name: 'Ends With Page Explorer',
    id: '@skytomo221/ends-with-page-explorer',
    version: '1.0.0',
    type: 'page-explorer',
    author: 'skytomo221',
  },
  configuration() {
    return { configuration };
  },
  name(): Promise<NameReturns> {
    return Promise.resolve({ name: '語末一致' });
  },
  search({ searchCards, searchWord }: SearchProps): Promise<SearchReturns> {
    return Promise.resolve({
      results: searchCards
        .map(card => {
          const { id, targets } = card;
          const matches = targets
            .map((target, targetIndex) => ({ target, targetIndex }))
            .filter(({ target }) => target.endsWith(searchWord))
            .map(({ target, targetIndex }) => {
              const begin = target.lastIndexOf(searchWord);
              const end = begin + searchWord.length;
              return { targetIndex, begin, end };
            });
          return { id, matches };
        })
        .filter(({ matches }) => matches.length > 0),
    });
  },
};
