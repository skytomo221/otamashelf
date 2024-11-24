import Otamashelf from '../src/Otamashelf';
import { ConvertProps, TextConverter } from '../src/TextConverter';

const testTextConverter: TextConverter = {
  properties: {
    name: 'Test Text Converter',
    id: '@skytomo221/test-text-converter',
    version: '0.1.0',
    author: 'skytomo221',
    mime: 'text/html',
    type: 'text-converter',
  },
  defaultConfiguration: () => {
    return { configuration: {}, configurationsSchema: {} };
  },
  convert: async ({ text }: ConvertProps) => {
    return { html: `<div>${text}</div>` };
  },
};

describe('otmCreator', () => {
  describe('template', () => {
    it('returns html', () => {
      const api = new Otamashelf().api('read');
      const { configuration } = testTextConverter.defaultConfiguration();
      testTextConverter
        .convert({ api, configuration, text: 'Hello, world!' })
        .then(({ html }) => {
          expect(html).toBe('<div>Hello, world!</div>');
        });
    });
  });
});
