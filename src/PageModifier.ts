import { Book } from './Book';
import { ConfigurationPage, Page } from './Page';
import { ExtensionBase}  from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';

export type PageModifierProperties = PageExtensionBaseProperties & {
  type: 'page-modifier';
};

export type ModifyProps<P extends Page> = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'configuration' | 'title'>;
  page: P;
  script: Json;
};

export type ModifyReturns<P extends Page> = {
  page: P;
};

export type PageModifier = ExtensionBase & {
  properties: PageModifierProperties;
  modify<P extends Page>(props: ModifyProps<P>): Promise<ModifyReturns<P>>;
};
