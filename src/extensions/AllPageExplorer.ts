import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { SearchProps, SearchReturns } from '../PageExplorer';

export default class AllPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    name: 'All Page Explorer',
    id: 'all-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  public readonly name = async (): Promise<string> => '部分一致';

  public readonly search = async ({
    cards,
  }: SearchProps): Promise<SearchReturns> => ({
    name: 'search',
    status: 'resolve',
    returns: {
      ids: cards.map(card => card.id),
    },
  });
}
