import Extension from './Extension';
import { PageExplorerProperties } from './ExtensionProperties';
import { SearchCard } from './SearchCard';

export type SearchProps = {
  name: 'search';
  cards: SearchCard[];
  searchWord: string;
};

export type SearchResolveReturns = {
  name: 'search';
  status: 'resolve';
  returns: {
    ids: string[];
  };
};

export type SearchRejectReturns = {
  name: 'search';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchReturns = SearchResolveReturns | SearchRejectReturns;

export default abstract class PageExplorer extends Extension {
  abstract readonly properties: PageExplorerProperties;

  abstract readonly name: () => Promise<string>;

  abstract readonly search: (props: SearchProps) => Promise<SearchReturns>;
}
