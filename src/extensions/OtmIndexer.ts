import { BookIndexerProperties } from '../ExtensionProperties';
import { PageCard } from '../PageCard';
import { SearchCard } from '../SearchCard';
import { Word } from '../otm/Word';
import BookIndexer, {
  SearchIndexesProps,
  SearchIndexesReturns,
  SearchModesReturns,
} from '../BookIndexer';

export default class OtmIndexer extends BookIndexer {
  public readonly properties: BookIndexerProperties = {
    name: 'OTM Indexer',
    id: 'otm-indexer',
    version: '0.1.0',
    type: 'book-indexer',
    author: 'skytomo221',
    bookFormat: ['otm'],
  };

  // eslint-disable-next-line class-methods-use-this
  public async readSearchModes(): Promise<SearchModesReturns> {
    return {
      action: 'search-modes',
      status: 'resolve',
      returns: {
        modes: ['form', 'translation', 'both', 'all'],
      },
    };
  }

  static searchCard(searchModeId: string, pageCards: PageCard[]): SearchCard[] {
    switch (searchModeId) {
      case 'form':
        return pageCards.map(word => ({
          id: word.id,
          targets: [(word as unknown as Word).entry.form],
        }));
      case 'translation':
        return pageCards.map(word => ({
          id: word.id,
          targets: (word as unknown as Word).translations
            .map(t => t.forms)
            .flat(),
        }));
      case 'both':
        return pageCards.map(word => ({
          id: word.id,
          targets: [
            (word as unknown as Word).entry.form,
            ...(word as unknown as Word).translations.map(t => t.forms).flat(),
          ],
        }));
      case 'all':
        return pageCards.map(word => ({
          id: word.id,
          targets: [
            (word as unknown as Word).entry.form,
            ...(word as unknown as Word).translations.map(t => t.forms).flat(),
            ...(word as unknown as Word).contents.map(c => c.text),
          ],
        }));
      default:
        return [];
    }
  }

  public async readSearchIndexes(
    props: SearchIndexesProps,
  ): Promise<SearchIndexesReturns> {
    const { searchModeId, pageCards } = props;
    return {
      action: 'search-indexes',
      status: 'resolve',
      returns: {
        searchCards: OtmIndexer.searchCard(searchModeId, pageCards),
      },
    };
  }
}
