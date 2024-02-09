import { Book } from './Book';
import { ConfigurationPage } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';

export type BookModifierProperties = BookExtensionBaseProperties & {
  type: 'book-modifier';
};

export type UpdateBookProps = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'pages' | 'title'>;
  script: Json;
};

export type UpdateBookReturns = {
  book: Pick<Book, 'bookFormat' | 'pages' | 'title'>;
};

export type BookModifier = ExtensionBase & {
  properties: BookModifierProperties;
  modify(props: UpdateBookProps): Promise<UpdateBookReturns>;
};
