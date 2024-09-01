import { Json } from './Json';

export type PageBase = {
  pageFormat: string;
  data: { [key: string]: Json };
};

export type NormalPage = PageBase & {
  id: string;
};

export type BookParametersPage = PageBase & {
  specialPage: 'book-parameters';
};

export type DescriptionPage = PageBase & {
  specialPage: 'description';
};

export type BookTemplatePage = PageBase & {
  specialPage: 'book-template';
};

export type PageTemplatePage = PageBase & {
  specialPage: 'page-template';
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
