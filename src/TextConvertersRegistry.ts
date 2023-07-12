import { TextConverterProperties } from './ExtensionProperties';
import Registry from './Registry';
import TextConverter, { ConvertProps, ConvertReturns } from './TextConverter';

export default class TextConvertersRegistry<
  K extends string,
  V extends TextConverter,
> extends Registry<K, V> {
  properties(): IterableIterator<TextConverterProperties> {
    return super.properties() as IterableIterator<TextConverterProperties>;
  }

  convert(id: K, props: ConvertProps): Promise<ConvertReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageCardCreator not found.'));
    return v.convert(props);
  }
}
