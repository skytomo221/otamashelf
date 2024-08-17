import { Book } from './Book';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Json } from './Json';

export type BookModifierProperties = BookExtensionBaseProperties & {
  type: 'book-modifier';
};

export type ModifyProps = {
  configuration: Configuration;
  book: Pick<Book, 'bookFormat' | 'bookParameters' | 'pages' | 'title'>;
  script: Json;
};

export type ModifyReturns = {
  book: Pick<Book, 'bookFormat' | 'pages' | 'title'>;
};

export type BookModifier = ExtensionBase & {
  properties: BookModifierProperties;
  modify(props: ModifyProps): Promise<ModifyReturns>;
};
