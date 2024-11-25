import { Book } from './Book';
import { Page } from './Page';
import { ExtensionBase}  from './ExtensionBase';
import { PageExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';
import { Configuration } from './Configuration';
import { Api } from './Api';

export type PageModifierProperties = PageExtensionBaseProperties & {
  type: 'page-modifier';
};

export type ModifyProps<P extends Page> = {
  api: Api;
  configuration: Configuration;
  book?: Pick<Book, 'bookFormat' | 'bookParameters' | 'title'>;
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
