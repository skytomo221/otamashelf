import { ExtensionBase } from './ExtensionBase';
import { Book } from './Book';
import { ConfigurationPage } from './Page';
import { BookExtensionBaseProperties } from './ExtensionProperties';

export type BookSaverProperties = BookExtensionBaseProperties & {
  type: 'book-saver';
};

export type SaveProps = {
  configuration: ConfigurationPage;
  book: Omit<Book, 'indexes'>;
};

export type SaveReturns = {
  savedTime: number;
};

export type BookSaver = ExtensionBase & {
  properties: BookSaverProperties;
  save(props: SaveProps): Promise<SaveReturns>;
};
