import PageCardProcessor, { ProcessPageProps, ProcessPageReturns } from './PageCardProcessor';

export type PageCardUpdaterGenerator = () => PageCardProcessor;

export default class PageCardUpdatersRegistry {
  protected readonly pageCardUpdaters: Map<string, PageCardUpdaterGenerator> =
    new Map();

  public register(pageCardUpdater: PageCardUpdaterGenerator): void {
    const { id } = pageCardUpdater().constructor().properties;
    this.pageCardUpdaters.set(id, pageCardUpdater);
  }

  public get(id: string): PageCardProcessor | undefined {
    const pageCardUpdater = this.pageCardUpdaters.get(id);
    if (!pageCardUpdater) return undefined;
    return pageCardUpdater();
  }

  public updatePage(id: string, props: ProcessPageProps): Promise<ProcessPageReturns> {
    const pageCardUpdater = this.get(id);
    if (!pageCardUpdater) {
      return Promise.resolve({
        name: 'update-page',
        status: 'reject',
        returns: {
          reason: `PageCardUpdater ${id} not found`,
        },
      });
    }
    return pageCardUpdater.processPage(props);
  }
}
