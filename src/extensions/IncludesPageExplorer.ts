import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { SearchProps, SearchReturns } from '../PageExplorer';

export default class IncludesPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    name: 'Includes Page Explorer',
    id: 'includes-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  public readonly name = async (): Promise<string> => '部分一致';

  public readonly search = async ({
    cards,
    searchWord,
  }: SearchProps): Promise<SearchReturns> => ({
    action: 'search',
    status: 'resolve',
    returns: {
      ids: cards
        .filter(card => card.targets.some(t => t.includes(searchWord)))
        .map(card => card.id),
    },
  });
}
