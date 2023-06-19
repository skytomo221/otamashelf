import Extension from './Extension';
import { BookLoaderProperties } from './ExtensionProperties';
import Book from './Book';

export type LoadProps = {
  action: 'load';
  path: string;
};

export type LoadResolveReturns = {
  action: 'load';
  status: 'resolve';
  returns: {
    book: Book;
  };
};

export type LoadRejectReturns = {
  action: 'load';
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
