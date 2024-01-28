import { Extension } from './Extension';

export default class ExtensionsRegistry<T extends Extension> extends Array<T> {
  register(extension: T) {
    this.push(extension);
  }

  findById(id: string) {
    return this.find(extension => extension.properties.id === id);
  }

  findByIdOrThrow(id: string): T {
    const extension = this.findById(id);
    if (extension) return extension;
    throw new TypeError(
      `No extension found for id: ${id} in ${this.constructor.name}`,
    );
  }
}
