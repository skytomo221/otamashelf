import Extension from './Extension';
import { BookIndexerProperties, FileFilter } from './ExtensionProperties';
import { PageCard } from './PageCard';
import { SearchCard } from './SearchCard';

export type SearchModesResolveReturns = {
  name: 'search-modes';
  status: 'resolve';
  returns: {
    modes: string[];
  };
};

export type SearchModesRejectReturns = {
  name: 'search-modes';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchModesReturns =
  | SearchModesResolveReturns
  | SearchModesRejectReturns;

export type SearchIndexesResolveReturns = {
  name: 'search-indexes';
  status: 'resolve';
  returns: {
    searchCards: SearchCard[];
  };
};

export type SearchIndexesRejectReturns = {
  name: 'search-indexes';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchIndexesReturns =
  | SearchIndexesResolveReturns
  | SearchIndexesRejectReturns;

export type SearchIndexesProps = {
  name: 'search-indexes';
  searchModeId: string;
  pageCards: PageCard[];
};

export default abstract class BookIndexer extends Extension {
  abstract readonly properties: BookIndexerProperties;

  abstract readSearchModes(): Promise<SearchModesReturns>;

  abstract readSearchIndexes(
    props: SearchIndexesProps,
  ): Promise<SearchIndexesReturns>;
}
