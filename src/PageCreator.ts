import Extension from './Extension';
import { PageCreatorProperties } from './ExtensionProperties';
import { PageCard } from './PageCard';
import Book from './Book';

export type TemplatesProps = {
  action: 'templates';
};

export type TemplatesResolveReturns = {
  action: 'templates';
  status: 'resolve';
  returns: {
    templates: string[];
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

export type CreateProps = {
  action: 'create';
  templateId: string;
  book: Book;
};

export type CreateResolveReturns = {
  action: 'create';
  status: 'resolve';
  returns: {
    pageCard: PageCard;
  };
};

export type CreateRejectReturns = {
  action: 'create';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type CreateReturns = CreateResolveReturns | CreateRejectReturns;

export default abstract class PageCreator extends Extension {
  abstract properties: PageCreatorProperties;

  abstract templates(props: TemplatesProps): Promise<TemplatesReturns>;

  abstract create(props: CreateProps): Promise<CreateReturns>;
}
