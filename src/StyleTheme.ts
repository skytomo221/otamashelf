import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';

export type StyleThemeProperties = ExtensionBaseProperties & {
  type: 'style-theme';
};

export type StyleReturns = {
  style: { [key: string]: string };
};

export type StyleTheme = ExtensionBase & {
  properties: StyleThemeProperties;
  style(): Promise<StyleReturns>;
};
