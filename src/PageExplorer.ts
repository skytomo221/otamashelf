import { Api } from './Api';
import { Configuration } from './Configuration';
import { ExtensionBase } from './ExtensionBase';
import { ExtensionBaseProperties } from './ExtensionProperties';
import { SearchCard } from './SearchCard';

export type PageExplorerProperties = ExtensionBaseProperties & {
  type: 'page-explorer';
};

export type NameProps = {
  api: Api;
  configuration: Configuration;
  language: string;
};

export type NameReturns = {
  name: string;
};

export type SearchProps = {
  api: Api;
  configuration: Configuration;
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
