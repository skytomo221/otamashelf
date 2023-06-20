import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { NameReturns, SearchProps, SearchReturns } from '../PageExplorer';

export default class IncludesPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    action: 'properties',
    name: 'Includes Page Explorer',
    id: 'includes-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  async name(): Promise<NameReturns> {
    return { action: 'name', name: '部分一致' };
  }

  async search({ cards, searchWord }: SearchProps): Promise<SearchReturns> {
    return {
      action: 'search',
      status: 'resolve',
      returns: {
        ids: cards
          .filter(card => card.targets.some(t => t.includes(searchWord)))
          .map(card => card.id),
      },
    };
  }
}
