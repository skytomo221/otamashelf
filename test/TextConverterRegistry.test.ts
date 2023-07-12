import { TextConverterProperties } from '../src/ExtensionProperties';
import TextConverter, {
  ConvertProps,
  ConvertReturns,
} from '../src/TextConverter';
import TextConvertersRegistry from '../src/TextConvertersRegistry';

class TestTextConverter extends TextConverter {
  properties: TextConverterProperties = {
    action: 'properties',
    name: 'Test Text Converter',
    id: 'test-text-converter',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'text-converter',
  };

  convert({ text }: ConvertProps): Promise<ConvertReturns> {
    return Promise.resolve({
      action: 'convert',
      status: 'resolve',
      returns: {
        html: `<div>${text}</div>`,
      },
    });
  }
}

test('TextConvertersRegistry instance of TextConverter', async () => {
  const textConvertersRegistry = new TextConvertersRegistry();
  textConvertersRegistry.register(new TestTextConverter());
  expect(textConvertersRegistry.get('test-text-converter')).toBeInstanceOf(
    TextConverter,
  );
});

test('TextConvertersRegistry return convert returns', async () => {
  const pageExplorersRegistry = new TextConvertersRegistry();
  pageExplorersRegistry.register(new TestTextConverter());
  expect(
    await pageExplorersRegistry.convert('test-text-converter', {
      action: 'convert',
      text: 'Hello, world!',
    }),
  ).toStrictEqual({
    action: 'convert',
    returns: { html: '<div>Hello, world!</div>' },
    status: 'resolve',
  });
});
