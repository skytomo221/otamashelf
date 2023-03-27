import { PageExplorerProperties } from '../ExtensionProperties';
import PageExplorer, { SearchProps, SearchReturns } from '../PageExplorer';

export default class StartsWithPageExplorer extends PageExplorer {
  public readonly properties: PageExplorerProperties = {
    name: 'Starts With Page Explorer',
    id: 'starts-with-page-explorer',
    version: '0.1.0',
    author: 'skytomo221',
    type: 'page-explorer',
  };

  public readonly name = async (): Promise<string> => '語頭一致';

  public readonly search = async ({
    cards,
    searchWord,
  }: SearchProps): Promise<SearchReturns> => ({
    name: 'search',
    status: 'resolve',
    returns: {
      ids: cards
        .filter(card => card.targets.some(t => t.startsWith(searchWord)))
        .map(card => card.id),
    },
  });
}
