import { ConfigurationPage } from '../src/Page';
import { ConvertProps, TextConverter } from '../src/TextConverter';

const configuration: ConfigurationPage = {
  specialPage: 'configuration',
  pageFormat: 'simple-configuration-format-v1',
  data: {},
};

const testTextConverter: TextConverter = {
  properties: {
    name: 'Test Text Converter',
    id: '@skytomo221/test-text-converter',
    version: '0.1.0',
    author: 'skytomo221',
    mime: 'text/html',
    type: 'text-converter',
  },
  configuration: () => {
    return { configuration };
  },
  convert: async ({ text }: ConvertProps) => {
    return { html: `<div>${text}</div>` };
  },
};

describe('otmCreator', () => {
  describe('template', () => {
    it('returns html', () => {
      const { configuration } = testTextConverter.configuration();
      testTextConverter
        .convert({ configuration, text: 'Hello, world!' })
        .then(({ html }) => {
          expect(html).toBe('<div>Hello, world!</div>');
        });
    });
  });
});
