import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { NameReturns, SearchProps, SearchReturns } from '../PageExplorer';

export default class EndsWithPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    action: 'properties',
    name: 'Ends With Page Explorer',
    id: 'ends-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  async name(): Promise<NameReturns> {
    return { action: 'name', name: '語末一致' };
  }

  async search({ cards, searchWord }: SearchProps): Promise<SearchReturns> {
    return {
      action: 'search',
      status: 'resolve',
      returns: {
        ids: cards
          .filter(card => card.targets.some(t => t.endsWith(searchWord)))
          .map(card => card.id),
      },
    };
  }
}
