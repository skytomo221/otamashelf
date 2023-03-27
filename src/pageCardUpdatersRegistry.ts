import PageCardUpdater from './PageCardUpdater';

export type PageCardUpdaterGenerator = () => PageCardUpdater;

export default class PageCardUpdatersRegistry {
  protected readonly pageCardUpdaters: Map<string, PageCardUpdaterGenerator> =
    new Map();

  public register(pageCardUpdater: PageCardUpdaterGenerator): void {
    const { id } = pageCardUpdater().constructor().properties;
    this.pageCardUpdaters.set(id, pageCardUpdater);
  }

  public get(id: string): PageCardUpdater | undefined {
    const pageCardUpdater = this.pageCardUpdaters.get(id);
    if (!pageCardUpdater) return undefined;
    return pageCardUpdater();
  }
}
