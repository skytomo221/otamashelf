import { FileFormat } from './FileFormat';
import { ConfigurationPage, DescriptionPage, NormalPage, Page } from './Page';
import { PageProperties } from './PageProperties';

export type Book = {
  bookFormat: string;
  configuration: ConfigurationPage;
  description: DescriptionPage;
  fileFormat: FileFormat;
  indexes: PageProperties[];
  pages: NormalPage[];
  title: string;
};
