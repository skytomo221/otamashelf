import { Json } from './Json';

export type PageBase = {
  pageFormat: string;
  data: { [key: string]: Json };
};

export type NormalPage = PageBase & {
  id: string;
};

export type ConfigurationPage = PageBase & {
  specialPage: 'configuration';
};

export type DescriptionPage = PageBase & {
  specialPage: 'description';
};

export type TemplatePage = PageBase & {
  specialPage: 'template';
};

export type SpecialPage = ConfigurationPage | DescriptionPage | TemplatePage;

export type Page = NormalPage | SpecialPage;
