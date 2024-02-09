import { Book } from './Book';
import { ConfigurationPage, TemplatePage } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';

export type BookCreatorProperties = BookExtensionBaseProperties & {
  type: 'book-creator';
};

export type TemplateProps = {
  configuration: ConfigurationPage;
};

export type TemplateReturns = {
  template: TemplatePage;
};

export type CreateProps = {
  configuration: ConfigurationPage;
  template: TemplatePage;
};

export type CreateReturns = {
  book: Pick<
    Book,
    'configuration' | 'description' | 'bookFormat' | 'pages' | 'title'
  >;
  path: string;
};

export type BookCreator = ExtensionBase & {
  properties: BookCreatorProperties;
  template(props: TemplateProps): Promise<TemplateReturns>;
  create(props: CreateProps): Promise<CreateReturns>;
};
