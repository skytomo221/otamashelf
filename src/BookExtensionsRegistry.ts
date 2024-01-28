import { BookExtension } from './Extension';
import ExtensionsRegistry from './ExtensionsRegistry';

export default class BookExtensionsRegistry<
  T extends BookExtension,
> extends ExtensionsRegistry<T> {
  findByBookFormat(bookFormat: string) {
    return this.find(extension => {
      return RegExp(extension.properties.bookFormatPattern).test(bookFormat);
    });
  }

  findByBookFormatOrThrow(bookFormat: string): T {
    const extension = this.findByBookFormat(bookFormat);
    if (extension) return extension;
    throw new TypeError(
      `No extension found for book format: ${bookFormat} in ${this.constructor.name}`,
    );
  }
}
