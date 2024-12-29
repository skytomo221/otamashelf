import { Json } from './Json';

export type PageBase = {
  pageFormat: string;
  data: { [key: string]: Json };
};

export type NormalPage = PageBase & {
  id: string;
  bookPath: string;
};

export type BookParametersPage = PageBase & {
  specialPage: 'book-parameters';
  bookPath: string;
};

export type DescriptionPage = PageBase & {
  specialPage: 'description';
  bookPath: string;
};

export type BookTemplatePage = PageBase & {
  specialPage: 'book-template';
};

export type PageTemplatePage = PageBase & {
  specialPage: 'page-template';
  bookPath: string;
};

export type ViewPage = PageBase & {
  specialPage: 'view';
};

export type SpecialPage =
  | BookParametersPage
  | DescriptionPage
  | BookTemplatePage
  | PageTemplatePage
  | ViewPage;

export type Page = NormalPage | SpecialPage;
