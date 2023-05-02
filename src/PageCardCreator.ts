import Extension from './Extension';
import { PageCardCreatorProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';
import Book from './Book';

export type TemplatesResolveReturns = {
  name: 'templates';
  status: 'resolve';
  returns: {
    templates: string[];
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

export type CreateProps = {
  name: 'create';
  templateId: string;
  book: Book;
};

export type CreateResolveReturns = {
  name: 'create';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type CreateRejectReturns = {
  name: 'create';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type CreateReturns = CreateResolveReturns | CreateRejectReturns;

export default abstract class PageCardCreator extends Extension {
  abstract properties: PageCardCreatorProperties;

  abstract templates(): Promise<TemplatesReturns>;

  abstract create(props: CreateProps): Promise<CreateReturns>;
}
