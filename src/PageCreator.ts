import { ExtensionBase } from './ExtensionBase';
import { ConfigurationPage, Page, TemplatePage } from './Page';
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
  book: Pick<Book, 'bookFormat' | 'configuration' | 'indexes' | 'title'>;
  template: TemplatePage;
};

export type CreateReturns = {
  page: Page;
};

export type PageCreator = ExtensionBase & {
  properties: PageCreatorProperties;
  template(props: TemplateProps): Promise<TemplateReturns>;
  create(props: CreateProps): Promise<CreateReturns>;
};
