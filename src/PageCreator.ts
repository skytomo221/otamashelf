import { ExtensionBase } from './ExtensionBase';
import { ConfigurationPage, NormalPage, Page, TemplatePage } from './Page';
import { Book } from './Book';
import {
  BookExtensionBaseProperties,
} from './ExtensionProperties';

export type PageCreatorProperties = BookExtensionBaseProperties & {
  type: 'page-creator';
};

export type TemplateProps = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'configuration' | 'title'>;
};

export type TemplateReturns = {
  template: TemplatePage;
};

export type CreateProps = {
  configuration: ConfigurationPage;
  book: Pick<Book, 'bookFormat' | 'configuration' | 'title'>;
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
