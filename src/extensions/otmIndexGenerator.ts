import { IndexGenerator } from '../IndexGenerator';
import { Word } from '../otm/Word';
import { GenerateProps, GenerateReturns } from '../IndexGenerator';
import { ConfigurationReturns } from '../ExtensionBase';

export const otmIndexGenerator: IndexGenerator = {
  properties: {
    name: 'OTM Index Generator',
    id: '@skytomo221/otm-index-generator',
    version: '1.0.0',
    type: 'index-generator',
    author: 'skytomo221',
    pageFormatPattern: '^otm$',
  },
  defaultConfiguration(): ConfigurationReturns {
    return { configuration: {}, configurationsSchema: {} };
  },
  generate(props: GenerateProps): Promise<GenerateReturns> {
    const { pages } = props;
    return Promise.resolve({
      indexs: pages.map(page => {
        const { data, id } = page;
        const { word } = data as { word: Word };
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
