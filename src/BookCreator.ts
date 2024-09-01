import { Book } from './Book';
import { BookTemplatePage, NormalPage } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Configuration } from './Configuration';

export type BookCreatorProperties = BookExtensionBaseProperties & {
  type: 'book-creator';
};

export type TemplateProps = {
  configuration: Configuration;
};

export type TemplateReturns = {
  template: BookTemplatePage;
};

export type CreateProps = {
  configuration: Configuration;
  template: BookTemplatePage;
};

export type CreateReturns = {
  book: Pick<
    Book,
    'description' | 'bookFormat' | 'bookParameters' | 'title'
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
