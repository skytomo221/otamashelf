import { ExtensionProperties } from './ExtensionProperties';

export default abstract class Extension {
  abstract readonly properties: ExtensionProperties;
}
