import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { ConfigurationPage } from './Page';
import { SearchCard } from './SearchCard';

export type PageExplorerProperties = ExtensionBaseProperties & {
  type: 'page-explorer';
};

export type NameProps = {
  configuration: ConfigurationPage;
  language: string;
};

export type NameReturns = {
  name: string;
};

export type SearchProps = {
  configuration: ConfigurationPage;
  searchCards: SearchCard[];
  searchWord: string;
};

export type SearchResult = {
  id: string;
  matches: { targetIndex: number; begin: number; end: number }[];
};

export type SearchReturns = {
  results: SearchResult[];
};

export type PageExplorer = ExtensionBase & {
  properties: PageExplorerProperties;
  name(props: NameProps): Promise<NameReturns>;
  search(props: SearchProps): Promise<SearchReturns>;
};
