import { Word } from '../otm/Word';
import { ConfigurationReturns } from '../ExtensionBase';
import {
  IndexProps,
  IndexReturns,
  PagesIndexer,
} from '../PagesIndexer';

export const otmPagesIndexer: PagesIndexer =
  {
    properties: {
      name: 'OTM Pages Indexer',
      id: '@skytomo221/otm-pages-indexer',
      version: '1.0.0',
      type: 'pages-indexer',
      author: 'skytomo221',
      pageFormatPattern: '^otm$',
    },
    defaultConfiguration(): ConfigurationReturns {
      return { configuration: {}, configurationsSchema: {} };
    },
    index(props: IndexProps): Promise<IndexReturns> {
      const { pages } = props;
      return Promise.resolve({
        pageDisplayInformations: pages.map(page => {
          const { data, id } = page;
          const { word } = data as { word: Word };
          const { entry, translations } = word;
          const { form: title } = entry;
          const preview = translations
            .map(({ forms }) => forms.join(' '))
            .join(' ');
          return { pageId: id, title, preview };
        }),
      });
    },
  };
