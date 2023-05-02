import Book from './Book';
import Extension from './Extension';
import { BookUpdaterProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type UpdateBookProps = {
  name: 'update-book';
  book: Book;
  pageCard: PageCard;
};

export type UpdateBookResolveReturns = {
  name: 'update-book';
  status: 'resolve';
  returns: {
    book: Book;
  };
};

export type UpdateBookRejectReturns = {
  name: 'update-book';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type UpdateBookReturns =
  | UpdateBookResolveReturns
  | UpdateBookRejectReturns;

export default abstract class BookUpdater extends Extension {
  abstract readonly properties: BookUpdaterProperties;

  abstract updateBook(props: UpdateBookProps): Promise<UpdateBookReturns>;
}
