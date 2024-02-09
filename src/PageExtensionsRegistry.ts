import { PageExtension } from './Extension';
import ExtensionsRegistry from './ExtensionsRegistry';

function test(pageFormat: string) {
  return (extension: PageExtension) => {
    return RegExp(extension.properties.pageFormatPattern).test(pageFormat);
  };
}

export default class PageExtensionsRegistry<
  T extends PageExtension,
> extends ExtensionsRegistry<T> {
  findByPageFormat(pageFormat: string) {
    return this.find(test(pageFormat));
  }

  findByPageFormatOrThrow(pageFormat: string): T {
    const extension = this.findByPageFormat(pageFormat);
    if (extension) return extension;
    throw new TypeError(
      `No extension found for page format: ${pageFormat} in ${this.constructor.name}`,
    );
  }

  filterByPageFormat(pageFormat: string) {
    return this.filter(test(pageFormat));
  }
}
