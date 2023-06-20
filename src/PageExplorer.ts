import Extension from './Extension';
import { PageExplorerProperties } from './ExtensionProperties';
import { SearchCard } from './SearchCard';

export type NameProps = {
  action: 'name';
};

export type NameReturns = {
  action: 'name';
  name: string;
};

export type SearchProps = {
  action: 'search';
  cards: SearchCard[];
  searchWord: string;
};

export type SearchResolveReturns = {
  action: 'search';
  status: 'resolve';
  returns: {
    ids: string[];
  };
};

export type SearchRejectReturns = {
  action: 'search';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchReturns = SearchResolveReturns | SearchRejectReturns;

export default abstract class PageExplorer extends Extension {
  abstract properties: PageExplorerProperties;

  abstract name(props: NameProps): Promise<NameReturns>;

  abstract search(props: SearchProps): Promise<SearchReturns>;
}
