import Extension from './Extension';
import { LayoutBuilderProperties } from './ExtensionProperties';
import { LayoutCard } from './LayoutCard';
import { PageCard } from './PageCard';

export default abstract class LayoutBuilder extends Extension {
  static properties: LayoutBuilderProperties;

  abstract readonly layout: (word: PageCard) => Promise<LayoutCard>;

  abstract readonly indexes: (words: PageCard[]) => Promise<LayoutCard[]>;
}
