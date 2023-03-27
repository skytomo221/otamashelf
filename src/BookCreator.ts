import Extension from './Extension';
import { File, Directory } from './File';
import Book from './Book';
import { BookCreatorProperties } from './ExtensionProperties';

export type TemplatesProps = {
  name: 'templates';
  data: File | Directory;
};

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
  static properties: BookCreatorProperties;

  abstract templates(props: TemplatesProps): Promise<TemplatesReturns>;
}
