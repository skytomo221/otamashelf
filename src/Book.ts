import { FileFormat } from './FileFormat';
import { BookParametersPage, DescriptionPage, NormalPage, Page } from './Page';
import { PageDisplayInformation } from './PageDisplayInformation';
import { NormalPageReference } from './PageReference';

export type Book = {
  bookFormat: string;
  bookParameters: BookParametersPage;
  description: DescriptionPage;
  fileFormat: FileFormat;
  indexes: (NormalPageReference & PageDisplayInformation)[];
  pages: NormalPage[];
  title: string;
};
