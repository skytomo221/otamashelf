import { PageExplorerProperties } from './ExtensionProperties';
import PageExplorer, { SearchProps, SearchReturns } from './PageExplorer';
import Registry from './Registry';

export default class PageExplorersRegistry<
  K extends string,
  V extends PageExplorer,
> extends Registry<K, V> {
  properties(): IterableIterator<PageExplorerProperties> {
    return super.properties() as IterableIterator<PageExplorerProperties>;
  }

  public search(id: K, props: SearchProps): Promise<SearchReturns> {
    const v = this.get(id);
    if (!v) return Promise.reject(new Error('PageExplorer not found.'));
    return v.search(props);
  }
}
