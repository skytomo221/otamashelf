import { Api } from './Api';
import { Book } from './Book';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { NormalPage } from './Page';

export type BookLoaderProperties = BookExtensionBaseProperties & {
  type: 'book-loader';
};

export type LoadProps = {
  api: Api;
  configuration: Configuration;
  path: string;
};

export type LoadReturns = {
  book: Pick<Book, 'bookParameters' | 'description' | 'title'> & {
    pages: Omit<NormalPage, 'id' | 'bookPath'>[];
  };
};

export type BookLoader = ExtensionBase & {
  properties: BookLoaderProperties;
  load(props: LoadProps): Promise<LoadReturns>;
};
