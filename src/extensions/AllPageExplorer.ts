import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, {
  NameProps,
  NameReturns,
  SearchProps,
  SearchReturns,
} from '../PageExplorer';

export default class AllPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    action: 'properties',
    name: 'All Page Explorer',
    id: 'all-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  async name(): Promise<NameReturns> {
    return { action: 'name', name: '部分一致' };
  }

  async search({ cards }: SearchProps): Promise<SearchReturns> {
    return {
      action: 'search',
      status: 'resolve',
      returns: {
        ids: cards.map(card => card.id),
      },
    };
  }
}
