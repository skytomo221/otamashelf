import { Book } from './Book';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { SpecialPage } from './Page';

export type BookLoaderProperties = BookExtensionBaseProperties & {
  type: 'book-loader';
};

export type LoadProps = {
  configuration: SpecialPage;
  path: string;
};

export type LoadReturns = {
  book: Pick<Book, 'configuration' | 'description' | 'pages' | 'title'>;
};

export type BookLoader = ExtensionBase & {
  properties: BookLoaderProperties;
  load(props: LoadProps): Promise<LoadReturns>;
};
