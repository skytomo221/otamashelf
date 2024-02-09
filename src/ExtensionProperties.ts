import { BookCreatorProperties } from './BookCreator';
import { BookDiscriminatorProperties } from './BookDiscriminator';
import { BookLoaderProperties } from './BookLoader';
import { BookModifierProperties } from './BookModifier';
import { BookSaverProperties } from './BookSaver';
import { IndexGeneratorProperties } from './IndexGenerator';
import { LayoutBuilderProperties } from './LayoutBuilder';
import { LayoutDecoratorProperties } from './LayoutDecorator';
import { PageCreatorProperties } from './PageCreator';
import { PageDecoratorProperties } from './PageDecorator';
import { PageExplorerProperties } from './PageExplorer';
import { PageModifierProperties } from './PageModifier';
import { SearchIndexGeneratorProperties } from './SearchIndexGenerator';
import { StyleThemeProperties } from './StyleTheme';
import { TextConverterProperties } from './TextConverter';

export type ExtensionProperties =
  | BookCreatorProperties
  | BookDiscriminatorProperties
  | BookLoaderProperties
  | BookModifierProperties
  | BookSaverProperties
  | IndexGeneratorProperties
  | LayoutBuilderProperties
  | LayoutDecoratorProperties
  | PageCreatorProperties
  | PageExplorerProperties
  | PageModifierProperties
  | PageDecoratorProperties
  | SearchIndexGeneratorProperties
  | StyleThemeProperties
  | TextConverterProperties;

export type ExtensionBaseProperties = {
  name: string;
  id: string;
  version: string;
  author: string;
  type: string;
};

export type BookExtensionBaseProperties = ExtensionBaseProperties & {
  bookFormatPattern: string;
};

export type PageExtensionBaseProperties = ExtensionBaseProperties & {
  pageFormatPattern: string;
};
