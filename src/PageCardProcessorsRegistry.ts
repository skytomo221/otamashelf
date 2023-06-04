import { PageCardProcessorProperties } from './ExtensionProperties';
import PageCardProcessor, {
  ProcessPageProps,
  ProcessPageReturns,
} from './PageCardProcessor';
import Registry from './Registry';

export default class PageCardProcessorsRegistry<
  K extends string,
  V extends PageCardProcessor,
> extends Registry<K, V> {
  properties(): IterableIterator<PageCardProcessorProperties> {
    return super.properties() as IterableIterator<PageCardProcessorProperties>;
  }

  public updatePage(
    id: K,
    props: ProcessPageProps,
  ): Promise<ProcessPageReturns> {
    const v = this.get(id);
    if (!v) {
      return Promise.resolve({
        name: 'update-page',
        status: 'reject',
        returns: {
          reason: `PageCardUpdater ${id} not found`,
        },
      });
    }
    return v.processPage(props);
  }
}
