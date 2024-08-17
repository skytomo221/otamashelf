import { ExtensionBase } from './ExtensionBase';
import { NormalPage, TemplatePage } from './Page';
import { Book } from './Book';
import {
  BookExtensionBaseProperties,
} from './ExtensionProperties';
import { Configuration } from './Configuration';

export type PageCreatorProperties = BookExtensionBaseProperties & {
  type: 'page-creator';
};

export type TemplateProps = {
  configuration: Configuration;
  book: Pick<Book, 'bookFormat' | 'bookParameters' | 'title'>;
};

export type TemplateReturns = {
  template: TemplatePage;
};

export type CreateProps = {
  configuration: Configuration;
  book: Pick<Book, 'bookFormat' | 'bookParameters' | 'title'>;
  template: TemplatePage;
};

export type CreateReturns = {
  page: Omit<NormalPage, 'id'>;
};

export type PageCreator = ExtensionBase & {
  properties: PageCreatorProperties;
  template(props: TemplateProps): Promise<TemplateReturns>;
  create(props: CreateProps): Promise<CreateReturns>;
};
