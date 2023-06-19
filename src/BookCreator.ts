import Extension from './Extension';
import Book from './Book';
import { BookCreatorProperties } from './ExtensionProperties';

export type TemplatesProps = {
  action: 'templates';
}

export type TemplatesResolveReturns = {
  action: 'templates';
  status: 'resolve';
  returns: {
    book: Omit<Book, 'path'>;
  };
};

export type TemplatesRejectReturns = {
  action: 'templates';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type TemplatesReturns = TemplatesResolveReturns | TemplatesRejectReturns;

export default abstract class BookCreator extends Extension {
  abstract readonly properties: BookCreatorProperties;

  abstract templates(props: TemplatesProps): Promise<TemplatesReturns>;
}
