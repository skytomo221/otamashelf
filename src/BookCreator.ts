import { Book } from './Book';
import { BookTemplatePage, NormalPage } from './Page';
import { ExtensionBase } from './ExtensionBase';
import { BookExtensionBaseProperties } from './ExtensionProperties';
import { Configuration } from './Configuration';
import { FileFormat } from './FileFormat';

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
    fileFormat: Pick<FileFormat, 'isDirectory'>;
  };
};

export type BookCreator = ExtensionBase & {
  properties: BookCreatorProperties;
  template(props: TemplateProps): Promise<TemplateReturns>;
  create(props: CreateProps): Promise<CreateReturns>;
};
