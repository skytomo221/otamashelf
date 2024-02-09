import { ExtensionProperties } from './ExtensionProperties';

export function isExtensionType<T extends ExtensionProperties['type']>(
  extension: { properties: { type: string } },
  type: T,
): extension is { properties: { type: T } } {
  const { properties } = extension;
  return properties.type === type;
}
