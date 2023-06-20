import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { NameReturns, SearchProps, SearchReturns } from '../PageExplorer';

export default class StartsWithPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    action: 'properties',
    name: 'Starts With Page Explorer',
    id: 'starts-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  async name(): Promise<NameReturns> {
    return { action: 'name', name: '語頭一致' };
  }

  async search({ cards, searchWord }: SearchProps): Promise<SearchReturns> {
    return {
      action: 'search',
      status: 'resolve',
      returns: {
        ids: cards
          .filter(card => card.targets.some(t => t.startsWith(searchWord)))
          .map(card => card.id),
      },
    };
  }
}
