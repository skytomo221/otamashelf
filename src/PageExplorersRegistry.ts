import { PageExplorerProperties } from './ExtensionProperties';
import PageExplorer, { SearchProps, SearchReturns } from './PageExplorer';
import Registry from './Registry';

export type PageExplorerGenerator = () => PageExplorer;

export default class PageCardExploeresRegistry extends Registry {
  protected readonly pageExplorers: Map<string, PageExplorerGenerator> = new Map();

  public register(pageExplorer: PageExplorerGenerator): void {
    const { id } = pageExplorer().properties;
    this.pageExplorers.set(id, pageExplorer);
  }

  public get(id: string): PageExplorer | undefined {
    const pageExplorer = this.pageExplorers.get(id);
    if (!pageExplorer) return undefined;
    return pageExplorer();
  }

  keys(): string[] {
    return Array.from(this.pageExplorers.keys());
  }

  filterKeys(predicate: (properties: PageExplorerProperties) => boolean): string[] {
    return this.keys().filter((id) => predicate(this.get(id)!.properties));
  }

  public search(id: string, props: SearchProps): Promise<SearchReturns> {
    const pageExplorer = this.pageExplorers.get(id);
    if (!pageExplorer) return Promise.reject(new Error('PageExplorer not found.'));
    return pageExplorer().search(props);
  }
}
