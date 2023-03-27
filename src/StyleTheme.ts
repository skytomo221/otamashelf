import Extension from './Extension';
import { StyleThemeProperties } from './ExtensionProperties';
import StyleThemeParameters from './StyleThemeParameters';

export default abstract class StyleTheme extends Extension {
  static properties: StyleThemeProperties;

  abstract readonly style: () => Promise<StyleThemeParameters>;
}
