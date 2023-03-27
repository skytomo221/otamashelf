import PageExplorer from './PageExplorer';

export type PageExplorerGenerator = () => PageExplorer;

export default class PageCardExploeresRegistry {
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
}
