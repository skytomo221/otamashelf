import Book from './Book';
import Extension from './Extension';
import { BookUpdaterProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';

export type UpdateBookProps = {
  action: 'update-book';
  book: Book;
  pageCard: PageCard;
};

export type UpdateBookResolveReturns = {
  action: 'update-book';
  status: 'resolve';
  returns: {
    book: Book;
  };
};

export type UpdateBookRejectReturns = {
  action: 'update-book';
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
