import { FileFormat } from './FileFormat';
import { BookParametersPage, DescriptionPage, NormalPage, Page } from './Page';
import { PageDisplayInformation } from './PageDisplayInformation';

export type Book = {
  bookFormat: string;
  bookParameters: BookParametersPage;
  description: DescriptionPage;
  fileFormat: FileFormat;
  indexes: PageDisplayInformation[];
  pages: NormalPage[];
  title: string;
};
