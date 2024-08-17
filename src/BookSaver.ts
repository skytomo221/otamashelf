import { ExtensionBase } from './ExtensionBase';
import { Book } from './Book';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Configuration } from './Configuration';

export type BookSaverProperties = BookExtensionBaseProperties & {
  type: 'book-saver';
};

export type SaveProps = {
  configuration: Configuration;
  book: Omit<Book, 'indexes'>;
};

export type SaveReturns = {
  savedTime: number;
};

export type BookSaver = ExtensionBase & {
  properties: BookSaverProperties;
  save(props: SaveProps): Promise<SaveReturns>;
};
