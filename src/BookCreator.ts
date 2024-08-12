import { Book } from './Book';
import { ConfigurationPage, NormalPage, TemplatePage } from './Page';
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
    'configuration' | 'description' | 'bookFormat' | 'title'
  > & {
    pages: Omit<NormalPage, 'id'>[];
  };
  path: string;
};

export type BookCreator = ExtensionBase & {
  properties: BookCreatorProperties;
  template(props: TemplateProps): Promise<TemplateReturns>;
  create(props: CreateProps): Promise<CreateReturns>;
};
