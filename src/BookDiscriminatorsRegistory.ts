import { BookDiscriminator } from './BookDiscriminator';
import ExtensionsRegistry from './ExtensionsRegistry';

export default class BookDiscriminatorsRegistory<
  T extends BookDiscriminator,
> extends ExtensionsRegistry<T> {
  async discriminateBookFormat(
    path: string,
    type: 'file' | 'directory',
  ): Promise<string | null> {
    for (const extension of this) {
      const { properties } = extension;
      const { fileDiscriminatable, directoryDiscriminatable } = properties;
      if (type === 'file' && !fileDiscriminatable) continue;
      if (type === 'directory' && !directoryDiscriminatable) continue;
      const { configuration } = await extension.configuration();
      const { bookFormat } = await extension.discriminate({
        path,
        configuration,
      });
      if (bookFormat) return bookFormat;
    }
    return null;
  }
}
