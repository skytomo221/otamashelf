import { ConfigurationPage } from '../Page';
import { IndexGenerator } from '../IndexGenerator';
import { Word } from '../otm/Word';
import { GenerateProps, GenerateReturns } from '../IndexGenerator';
import { ConfigurationReturns } from '../ExtensionBase';
import { PageProperties } from '../PageProperties';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: '@skytomo221/otm-creator/configuration',
  data: {},
};

export const otmIndexGenerator: IndexGenerator = {
  properties: {
    name: 'OTM Index Generator',
    id: '@skytomo221/otm-index-generator',
    version: '1.0.0',
    type: 'index-generator',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  configuration(): ConfigurationReturns {
    return { configuration };
  },
  generate(props: GenerateProps): Promise<GenerateReturns> {
    const { pages } = props;
    return Promise.resolve({
      indexs: pages.map((page): Omit<PageProperties, 'path'> => {
        const { data, id } = page;
        const word = data as Word;
        const { entry, translations } = word;
        const { form: title } = entry;
        const preview = translations
          .map(({ forms }) => forms.join(' '))
          .join(' ');
        return { id, title, preview };
      }),
    });
  },
};
