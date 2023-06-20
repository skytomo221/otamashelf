import { PageProcessorProperties } from './ExtensionProperties';
import PageProcessor, {
  ProcessPageProps,
  ProcessPageReturns,
} from './PageProcessor';
import Registry from './Registry';

export default class PageProcessorsRegistry<
  K extends string,
  V extends PageProcessor,
> extends Registry<K, V> {
  properties(): IterableIterator<PageProcessorProperties> {
    return super.properties() as IterableIterator<PageProcessorProperties>;
  }

  public updatePage(
    id: K,
    props: ProcessPageProps,
  ): Promise<ProcessPageReturns> {
    const v = this.get(id);
    if (!v) {
      return Promise.resolve({
        action: 'update-page',
        status: 'reject',
        returns: {
          reason: `PageCardUpdater ${id} not found`,
        },
      });
    }
    return v.processPage(props);
  }
}
