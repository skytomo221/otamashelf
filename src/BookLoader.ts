import Extension from './Extension';
import { BookLoaderProperties } from './ExtensionProperties';
import Book from './Book';

export type LoadProps = {
  name: 'load';
  path: string;
};

export type LoadResolveReturns = {
  name: 'load';
  status: 'resolve';
  returns: {
    book: Book;
  };
};

export type LoadRejectReturns = {
  name: 'load';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type LoadReturns = LoadResolveReturns | LoadRejectReturns;

export default abstract class BookLoader extends Extension {
  abstract readonly properties: BookLoaderProperties;

  abstract load(props: LoadProps): Promise<LoadReturns>;
}
