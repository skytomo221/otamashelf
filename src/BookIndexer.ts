import Extension from './Extension';
import { BookIndexerProperties, FileFilter } from './ExtensionProperties';
import { PageCard } from './PageCard';
import { SearchCard } from './SearchCard';

export type SearchModesProps = {
  action: 'search-modes';
};

export type SearchModesResolveReturns = {
  action: 'search-modes';
  status: 'resolve';
  returns: {
    modes: string[];
  };
};

export type SearchModesRejectReturns = {
  action: 'search-modes';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchModesReturns =
  | SearchModesResolveReturns
  | SearchModesRejectReturns;

export type SearchIndexesResolveReturns = {
  action: 'search-indexes';
  status: 'resolve';
  returns: {
    searchCards: SearchCard[];
  };
};

export type SearchIndexesRejectReturns = {
  action: 'search-indexes';
  status: 'reject';
  returns: {
    reason: string;
  };
};

export type SearchIndexesReturns =
  | SearchIndexesResolveReturns
  | SearchIndexesRejectReturns;

export type SearchIndexesProps = {
  action: 'search-indexes';
  searchModeId: string;
  pageCards: PageCard[];
};

export default abstract class BookIndexer extends Extension {
  abstract readonly properties: BookIndexerProperties;

  abstract readSearchModes(
    props: SearchModesProps,
  ): Promise<SearchModesReturns>;

  abstract readSearchIndexes(
    props: SearchIndexesProps,
  ): Promise<SearchIndexesReturns>;
}
