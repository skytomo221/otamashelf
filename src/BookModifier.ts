import { Book } from './Book';
import { ConfigurationPage, Page } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';

export type BookModifierProperties = BookExtensionBaseProperties & {
  type: 'book-modifier';
};

export type ModifyProps = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'configuration' | 'pages' | 'title'>;
  script: Json;
};

export type ModifyReturns = {
  book: Pick<Book, 'bookFormat' | 'pages' | 'title'>;
};

export type BookModifier = ExtensionBase & {
  properties: BookModifierProperties;
  modify(props: ModifyProps): Promise<ModifyReturns>;
};
