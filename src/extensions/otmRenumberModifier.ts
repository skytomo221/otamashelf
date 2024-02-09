import { BookModifier } from '../BookModifier';
import { ConfigurationReturns } from '../ExtensionBase';
import { ConfigurationPage } from '../Page';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const otmRenumberModifier: BookModifier = {
  properties: {
    name: 'OTM Renumber Modifier',
    id: '@skytomo221/otm-renumber-modifier',
    version: '0.1.0',
    type: 'book-modifier',
    author: 'skytomo221',
    bookFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  modify({ book }) {
    return Promise.resolve({
      book: {
        ...book,
        pages: book.pages.map((page, index) => {
          page.id = (index + 1).toString();
          return page;
        }),
      },
    });
  },
};
