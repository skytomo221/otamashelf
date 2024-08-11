import { Book } from './Book';
import { ConfigurationPage, Page } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';

export type PagesModifierProperties = PageExtensionBaseProperties & {
  type: 'pages-modifier';
};

export type ModifyProps<P extends Page> = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'configuration' | 'pages'>;
  page: P;
  script: Json;
};

export type ModifyReturns<P extends Page> = {
  book: Pick<Book, 'bookFormat' | 'pages'>;
  page: P;
};

export type PagesModifier = ExtensionBase & {
  properties: PagesModifierProperties;
  modify<P extends Page>(props: ModifyProps<P>): Promise<ModifyReturns<P>>;
};
