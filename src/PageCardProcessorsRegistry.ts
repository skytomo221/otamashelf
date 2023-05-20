import { PageCardProcessorProperties } from './ExtensionProperties';
import PageCardProcessor, { ProcessPageProps, ProcessPageReturns } from './PageCardProcessor';
import Registry from './Registry';

export type PageCardUpdaterGenerator = () => PageCardProcessor;

export default class PageCardProcessorsRegistry extends Registry {
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

  keys(): string[] {
    return Array.from(this.pageCardUpdaters.keys());
  }

  filterKeys(predicate: (properties: PageCardProcessorProperties) => boolean): string[] {
    return this.keys().filter((id) => predicate(this.get(id)!.properties));
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
