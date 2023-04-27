import Extension from './Extension';
import Book from './Book';
import { BookCreatorProperties } from './ExtensionProperties';

export type TemplatesResolveReturns = {
  name: 'templates';
  status: 'resolve';
  returns: {
    book: Omit<Book, 'path'>;
  };
};

export type TemplatesRejectReturns = {
  name: 'templates';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type TemplatesReturns = TemplatesResolveReturns | TemplatesRejectReturns;

export default abstract class BookCreator extends Extension {
  abstract readonly properties: BookCreatorProperties;

  abstract templates(): Promise<TemplatesReturns>;
}
